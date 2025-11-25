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
exports.CartRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class CartRepository {
    getOrCreateCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Kiểm tra cart đã tồn tại chưa
            let result = yield db_1.default.query("SELECT * FROM carts WHERE user_id = $1 LIMIT 1", [userId]);
            if (result.rows.length === 0) {
                result = yield db_1.default.query("INSERT INTO carts (user_id) VALUES ($1) RETURNING *", [userId]);
            }
            return result.rows[0];
        });
    }
    addItem(cartId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield db_1.default.query("SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cartId, productId]);
            if (existing.rows.length > 0) {
                // Update số lượng nếu đã có
                return db_1.default.query("UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *", [quantity, cartId, productId]);
            }
            return db_1.default.query("INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *", [cartId, productId, quantity]);
        });
    }
    getCartItems(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`SELECT ci.*, p.name, p.price, p.image_url, p.slug
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1`, [cartId]);
            // Transform to match view expectations: quantity -> qty, add slug
            return result.rows.map((row) => (Object.assign(Object.assign({}, row), { qty: row.quantity, slug: row.slug })));
        });
    }
    getCartItemsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getOrCreateCart(userId);
            return this.getCartItems(cart.id);
        });
    }
    removeItemByProductSlug(userId, productSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the cart first
            const cart = yield this.getOrCreateCart(userId);
            // Get product by slug
            const productResult = yield db_1.default.query("SELECT id FROM products WHERE slug = $1", [productSlug]);
            if (productResult.rows.length === 0) {
                throw new Error("Product not found");
            }
            const productId = productResult.rows[0].id;
            // Remove the item
            yield db_1.default.query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cart.id, productId]);
            return true;
        });
    }
    removeItem(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query("DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2", [cartId, productId]);
            return true;
        });
    }
    clearCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.getOrCreateCart(userId);
            yield db_1.default.query("DELETE FROM cart_items WHERE cart_id = $1", [cart.id]);
            return true;
        });
    }
}
exports.CartRepository = CartRepository;
//# sourceMappingURL=cart.repository.js.map