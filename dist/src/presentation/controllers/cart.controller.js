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
exports.CartController = void 0;
const cart_service_1 = require("../../application/cart.service");
const db_1 = __importDefault(require("../../infrastructure/database/db"));
const cartService = new cart_service_1.CartService();
class CartController {
    // static async add(req: Request, res: Response) {
    //     try {
    //         const { slug } = req.params;
    //         const userId = req.body.session.userId || 1; // giả lập login user #1
    //         const product = await pool.query("SELECT * FROM products WHERE slug = $1", [slug]);
    //         if (product.rows.length === 0) {
    //             return res.status(404).send("Product not found");
    //         }
    //         await cartService.addToCart(userId, product.rows[0].id, 1);
    //         res.redirect("/cart");
    //     } catch (error: any) {
    //         res.status(500).send(error.message);
    //     }
    // }
    static add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const slug = req.params.slug;
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    // If user is not logged in, redirect to login
                    return res.redirect("/auth/login");
                }
                // Get product from database
                const product = yield db_1.default.query("SELECT * FROM products WHERE slug = $1", [slug]);
                if (!product || product.rows.length === 0) {
                    return res.redirect('/');
                }
                // Add to cart using database
                yield cartService.addToCart(user.id, product.rows[0].id, 1);
                return res.redirect(`/product/${slug}`);
            }
            catch (error) {
                console.error("Error adding to cart:", error);
                return res.status(500).redirect('/');
            }
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const slug = req.params.slug;
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    return res.redirect("/auth/login");
                }
                // Remove from cart using database
                yield cartService.removeFromCart(user.id, slug);
                return res.redirect("/cart");
            }
            catch (error) {
                console.error("Error removing from cart:", error);
                res.status(500).send(error.message);
            }
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const session = req.session;
                const user = session.user;
                if (!user || !user.id) {
                    // If user is not logged in, show empty cart or redirect to login
                    return res.render("areas/client/cart", {
                        layout: "default-layout",
                        title: "Your Cart",
                        items: [],
                    });
                }
                const items = yield cartService.getCart(user.id);
                res.render("areas/client/cart", {
                    layout: "default-layout",
                    title: "Your Cart",
                    items,
                });
            }
            catch (error) {
                console.error("Error loading cart:", error);
                res.status(500).send(error.message);
            }
        });
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map