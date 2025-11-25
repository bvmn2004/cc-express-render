import { Request, Response } from "express";
import { OrderService } from "../../../application/order.service";

const orderService = new OrderService();

export class AdminOrderController {
    static async list(req: Request, res: Response) {
        try {
            const orders = await orderService.getAllOrders();
            res.render("areas/admin/order/list", {
                layout: "admin-layout",
                title: "Manage Orders",
                orders,
            });
        } catch (error: any) {
            console.error("Error loading orders:", error);
            res.status(500).send(error.message || "Error loading orders");
        }
    }

    static async detail(req: Request, res: Response) {
        try {
            const orderId = Number(req.params.id);
            const order = await orderService.getOrderById(orderId);

            if (!order) {
                return res.status(404).send("Order not found");
            }

            res.render("areas/admin/order/detail", {
                layout: "admin-layout",
                title: `Order #${order.id}`,
                order,
            });
        } catch (error: any) {
            console.error("Error loading order:", error);
            res.status(500).send(error.message || "Error loading order");
        }
    }

    static async updateStatus(req: Request, res: Response) {
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

            await orderService.updateOrderStatus(orderId, status);
            res.redirect(`/admin/orders/${orderId}`);
        } catch (error: any) {
            console.error("Error updating order status:", error);
            res.status(500).send(error.message || "Error updating order status");
        }
    }
}

