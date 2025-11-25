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
exports.AdminOrderController = void 0;
const order_service_1 = require("../../../application/order.service");
const orderService = new order_service_1.OrderService();
class AdminOrderController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderService.getAllOrders();
                res.render("areas/admin/order/list", {
                    layout: "admin-layout",
                    title: "Manage Orders",
                    orders,
                });
            }
            catch (error) {
                console.error("Error loading orders:", error);
                res.status(500).send(error.message || "Error loading orders");
            }
        });
    }
    static detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = Number(req.params.id);
                const order = yield orderService.getOrderById(orderId);
                if (!order) {
                    return res.status(404).send("Order not found");
                }
                res.render("areas/admin/order/detail", {
                    layout: "admin-layout",
                    title: `Order #${order.id}`,
                    order,
                });
            }
            catch (error) {
                console.error("Error loading order:", error);
                res.status(500).send(error.message || "Error loading order");
            }
        });
    }
    static updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = Number(req.params.id);
                const { status } = req.body;
                if (!status) {
                    return res.status(400).send("Status is required");
                }
                // Validate status
                const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
                if (!validStatuses.includes(status)) {
                    return res.status(400).send("Invalid status");
                }
                yield orderService.updateOrderStatus(orderId, status);
                res.redirect(`/admin/orders/${orderId}`);
            }
            catch (error) {
                console.error("Error updating order status:", error);
                res.status(500).send(error.message || "Error updating order status");
            }
        });
    }
}
exports.AdminOrderController = AdminOrderController;
//# sourceMappingURL=admin-order.controller.js.map