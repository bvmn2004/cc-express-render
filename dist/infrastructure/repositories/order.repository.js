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
exports.OrderRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class OrderRepository {
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`INSERT INTO orders (user_id, total_amount, shipping_address, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`, [
                orderData.userId,
                orderData.totalAmount,
                orderData.shippingAddress,
                orderData.status || "pending",
            ]);
            return result.rows[0];
        });
    }
    createOrderItem(orderItemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`INSERT INTO order_items (order_id, product_id, quantity, unit_price)
             VALUES ($1, $2, $3, $4)
             RETURNING *`, [
                orderItemData.orderId,
                orderItemData.productId,
                orderItemData.quantity,
                orderItemData.unitPrice,
            ]);
            return result.rows[0];
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderResult = yield db_1.default.query("SELECT * FROM orders WHERE id = $1", [orderId]);
            if (orderResult.rows.length === 0) {
                return null;
            }
            const order = orderResult.rows[0];
            const itemsResult = yield db_1.default.query(`SELECT oi.*, p.name as product_name, p.image_url as product_image
             FROM order_items oi
             JOIN products p ON oi.product_id = p.id
             WHERE oi.order_id = $1`, [orderId]);
            order.items = itemsResult.rows;
            return order;
        });
    }
    getProductBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("SELECT * FROM products WHERE slug = $1", [slug]);
            return result.rows[0];
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`SELECT o.*, 
                    u.email as user_email, 
                    u.full_name as user_name,
                    COUNT(oi.id) as item_count
             FROM orders o
             LEFT JOIN users u ON o.user_id = u.id
             LEFT JOIN order_items oi ON o.id = oi.order_id
             GROUP BY o.id, u.email, u.full_name
             ORDER BY o.created_at DESC`);
            return result.rows;
        });
    }
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("UPDATE orders SET status = $1 WHERE id = $2 RETURNING *", [status, orderId]);
            return result.rows[0];
        });
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=order.repository.js.map