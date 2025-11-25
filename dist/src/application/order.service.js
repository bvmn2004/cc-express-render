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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const order_repository_1 = require("../infrastructure/repositories/order.repository");
const orderRepo = new order_repository_1.OrderRepository();
class OrderService {
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Calculate total amount
            const subtotal = orderData.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
            const totalAmount = subtotal + orderData.shippingCost;
            // Create order
            const order = yield orderRepo.createOrder({
                userId: orderData.userId,
                totalAmount,
                shippingAddress: orderData.shippingAddress,
                status: "pending",
            });
            // Create order items
            for (const item of orderData.cart) {
                // Get product ID from slug
                const product = yield orderRepo.getProductBySlug(item.slug);
                if (!product) {
                    throw new Error(`Product with slug ${item.slug} not found`);
                }
                yield orderRepo.createOrderItem({
                    orderId: order.id,
                    productId: product.id,
                    quantity: item.qty,
                    unitPrice: item.price,
                });
            }
            return order;
        });
    }
    getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return orderRepo.getOrderById(orderId);
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return orderRepo.getAllOrders();
        });
    }
    updateOrderStatus(orderId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return orderRepo.updateOrderStatus(orderId, status);
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map