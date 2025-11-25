import express from "express";
import { engine } from "express-handlebars";
import adminRoutes from "./presentation/routes/admin/admin.route";
import adminProductRoutes from "./presentation/routes/admin/product.route";
import adminCategoryRoutes from "./presentation/routes/admin/category.route";

import homeRoutes from "./presentation/routes/client/home.route";
import searchRoutes from "./presentation/routes/client/search.route";
import productRoutes from "./presentation/routes/client/product.route";
import cartRoutes from "./presentation/routes/client/cart.route";
import checkoutRoutes from "./presentation/routes/client/checkout.route";

import authRoutes from "./presentation/routes/auth.route";
import userRoutes from "./presentation/routes/client/user.route";
import devRoutes from "./presentation/routes/dev.route";

import methodOverride from "method-override";
import pool from "./infrastructure/database/db";
import dotenv from "dotenv";
import path from "path";

import { CategoryService } from "./application/category.service";
import { CartService } from "./application/cart.service";

import session from "express-session";

import blogClientRoutes from "./presentation/routes/client/blog.route";
import adminBlogRoutes from "./presentation/routes/admin/blog.route";
import adminOrderRoutes from "./presentation/routes/admin/order.route";

import {
    isAuthenticatedSession,
    isAdminSession
} from "./shared/middleware/auth.middleware";

import { runMigrations } from "./migration";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ----------------------------------------------------
   FIX RENDER: CORRECT PATH FOR VIEWS & STATIC FILES
---------------------------------------------------- */

const ROOT_DIR = path.resolve(__dirname, "../src");

// STATIC
app.use(express.static(path.join(ROOT_DIR, "public")));

// VIEW ENGINE
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        layoutsDir: path.join(ROOT_DIR, "presentation/views/layouts"),
        partialsDir: path.join(ROOT_DIR, "presentation/views/partials"),
        defaultLayout: "default-layout",
        helpers: {
            eq: (a: any, b: any) => a === b,
            ne: (a: any, b: any) => a !== b,
            lt: (a: any, b: any) => a < b,
            gt: (a: any, b: any) => a > b,
            lte: (a: any, b: any) => a <= b,
            gte: (a: any, b: any) => a >= b,
            slice: (array: any[], start: number, end?: number) =>
                Array.isArray(array) ? array.slice(start, end) : [],
            multiply: (a: number, b: number) => a * b,
            formatCurrency: (value: number) => Number(value).toFixed(2),
            stripTags: (value: string) =>
                typeof value === "string"
                    ? value.replace(/<[^>]*>/g, "").substring(0, 100)
                    : value,
            inc: (value: number) => Number(value) + 1,
        },
    })
);

app.set("view engine", "hbs");
app.set("views", path.join(ROOT_DIR, "presentation/views"));

/* -------------------- BASE MIDDLEWARE -------------------- */
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "luka-store-secret",
        resave: false,
        saveUninitialized: true,
    })
);

/* -------------------- GLOBAL MIDDLEWARE -------------------- */
const categoryService = new CategoryService();

app.use(async (req, res, next) => {
    try {
        const navbarCategories = await categoryService.getCategoryForNavbar();
        res.locals.navbarCategories = navbarCategories;
        next();
    } catch (error) {
        next(error);
    }
});

app.use(async (req, res, next) => {
    try {
        const sessionUser = (req.session as any)?.user;

        if (sessionUser?.id) {
            const cartService = new CartService();
            const cartItems = await cartService.getCart(sessionUser.id);
            res.locals.cart = cartItems || [];
        } else {
            res.locals.cart = [];
        }

        res.locals.cartCount = res.locals.cart.reduce(
            (sum: number, i: any) => sum + Number(i.qty || i.quantity || 0),
            0
        );

        res.locals.cartTotal = res.locals.cart.reduce(
            (sum: number, i: any) =>
                sum +
                Number(i.qty || i.quantity || 0) * (parseFloat(i.price) || 0),
            0
        );

        next();
    } catch (error) {
        res.locals.cart = [];
        res.locals.cartCount = 0;
        res.locals.cartTotal = 0;
        next();
    }
});

app.use((req, res, next) => {
    res.locals.currentUser = (req.session as any)?.user || null;
    next();
});

/* -------------------- ROUTES -------------------- */
app.use("/", homeRoutes);
app.use("/search", searchRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);

app.use("/blogs", blogClientRoutes);
app.use("/admin/blogs", adminBlogRoutes);

app.use("/auth", authRoutes);
app.use("/user", isAuthenticatedSession, userRoutes);

app.use("/dev", devRoutes);

app.get("/login", (req, res) => res.redirect("/auth/login"));
app.get("/register", (req, res) => res.redirect("/auth/register"));
app.get("/logout", (req, res) => res.redirect("/auth/logout"));

app.use("/admin", isAdminSession, adminRoutes);
app.use("/admin/products", isAdminSession, adminProductRoutes);
app.use("/admin/categories", isAdminSession, adminCategoryRoutes);
app.use("/admin/orders", isAdminSession, adminOrderRoutes);

/* -------------------- SERVER + MIGRATIONS -------------------- */
async function bootstrap() {
    try {
        await runMigrations();
        console.log("Migrations completed.");

        app.listen(PORT, () =>
            console.log(`Server running at http://localhost:${PORT}`)
        );
    } catch (error) {
        console.error("Startup failed:", error);
        process.exit(1);
    }
}

bootstrap();

/* -------------------- GRACEFUL SHUTDOWN -------------------- */
const shutdown = async () => {
    console.log("\nShutting down gracefully...");
    await pool.end();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
