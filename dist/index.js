"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const admin_route_1 = __importDefault(require("./presentation/routes/admin/admin.route"));
const product_route_1 = __importDefault(require("./presentation/routes/admin/product.route"));
const category_route_1 = __importDefault(require("./presentation/routes/admin/category.route"));
const home_route_1 = __importDefault(require("./presentation/routes/client/home.route"));
const search_route_1 = __importDefault(require("./presentation/routes/client/search.route"));
const product_route_2 = __importDefault(require("./presentation/routes/client/product.route"));
const cart_route_1 = __importDefault(require("./presentation/routes/client/cart.route"));
const checkout_route_1 = __importDefault(require("./presentation/routes/client/checkout.route"));
const auth_route_1 = __importDefault(require("./presentation/routes/auth.route"));
const user_route_1 = __importDefault(require("./presentation/routes/client/user.route"));
const dev_route_1 = __importDefault(require("./presentation/routes/dev.route"));
const method_override_1 = __importDefault(require("method-override"));
const db_1 = __importDefault(require("./infrastructure/database/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const category_service_1 = require("./application/category.service");
const cart_service_1 = require("./application/cart.service");
const express_session_1 = __importDefault(require("express-session"));
const blog_route_1 = __importDefault(require("./presentation/routes/client/blog.route"));
const blog_route_2 = __importDefault(require("./presentation/routes/admin/blog.route"));
const order_route_1 = __importDefault(require("./presentation/routes/admin/order.route"));
const auth_middleware_1 = require("./shared/middleware/auth.middleware");
const migration_1 = require("./migration");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
/* -------------------- HANDLEBARS FIXED PATH -------------------- */
app.engine("hbs", (0, express_handlebars_1.engine)({
    extname: ".hbs",
    layoutsDir: path_1.default.join(__dirname, "presentation/views/layouts"),
    partialsDir: path_1.default.join(__dirname, "presentation/views/partials"),
    defaultLayout: "default-layout",
    helpers: {
        eq: (a, b) => a === b,
        ne: (a, b) => a !== b,
        lt: (a, b) => a < b,
        gt: (a, b) => a > b,
        lte: (a, b) => a <= b,
        gte: (a, b) => a >= b,
        slice: (array, start, end) => Array.isArray(array) ? array.slice(start, end) : [],
        multiply: (a, b) => a * b,
        formatCurrency: (value) => Number(value).toFixed(2),
        stripTags: (value) => typeof value === "string"
            ? value.replace(/<[^>]*>/g, "").substring(0, 100)
            : value,
        inc: (value) => Number(value) + 1,
    },
}));
/* -------------------- STATIC & VIEW FIXED PATH -------------------- */
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "presentation/views"));
/* -------------------- BASE MIDDLEWARE -------------------- */
app.use((0, method_override_1.default)("_method"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: "luka-store-secret",
    resave: false,
    saveUninitialized: true,
}));
/* -------------------- GLOBAL MIDDLEWARE -------------------- */
const categoryService = new category_service_1.CategoryService();
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const navbarCategories = yield categoryService.getCategoryForNavbar();
        res.locals.navbarCategories = navbarCategories;
        next();
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const sessionUser = (_a = req.session) === null || _a === void 0 ? void 0 : _a.user;
        if (sessionUser === null || sessionUser === void 0 ? void 0 : sessionUser.id) {
            const cartService = new cart_service_1.CartService();
            const cartItems = yield cartService.getCart(sessionUser.id);
            res.locals.cart = cartItems || [];
        }
        else {
            res.locals.cart = [];
        }
        res.locals.cartCount = res.locals.cart.reduce((sum, i) => sum + Number(i.qty || i.quantity || 0), 0);
        res.locals.cartTotal = res.locals.cart.reduce((sum, i) => sum +
            Number(i.qty || i.quantity || 0) * (parseFloat(i.price) || 0), 0);
        next();
    }
    catch (error) {
        res.locals.cart = [];
        res.locals.cartCount = 0;
        res.locals.cartTotal = 0;
        next();
    }
}));
app.use((req, res, next) => {
    var _a;
    res.locals.currentUser = ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) || null;
    next();
});
/* -------------------- ROUTES -------------------- */
app.use("/", home_route_1.default);
app.use("/search", search_route_1.default);
app.use("/product", product_route_2.default);
app.use("/cart", cart_route_1.default);
app.use("/checkout", checkout_route_1.default);
app.use("/blogs", blog_route_1.default);
app.use("/admin/blogs", blog_route_2.default);
app.use("/auth", auth_route_1.default);
app.use("/user", auth_middleware_1.isAuthenticatedSession, user_route_1.default);
app.use("/dev", dev_route_1.default);
app.get("/login", (req, res) => res.redirect("/auth/login"));
app.get("/register", (req, res) => res.redirect("/auth/register"));
app.get("/logout", (req, res) => res.redirect("/auth/logout"));
app.use("/admin", auth_middleware_1.isAdminSession, admin_route_1.default);
app.use("/admin/products", auth_middleware_1.isAdminSession, product_route_1.default);
app.use("/admin/categories", auth_middleware_1.isAdminSession, category_route_1.default);
app.use("/admin/orders", auth_middleware_1.isAdminSession, order_route_1.default);
/* -------------------- SERVER START WITH MIGRATIONS -------------------- */
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, migration_1.runMigrations)();
            console.log("Migrations completed.");
            app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
        }
        catch (error) {
            console.error("Startup failed:", error);
            process.exit(1);
        }
    });
}
bootstrap();
/* -------------------- GRACEFUL SHUTDOWN -------------------- */
const shutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("\nShutting down gracefully...");
    yield db_1.default.end();
    process.exit(0);
});
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
//# sourceMappingURL=index.js.map