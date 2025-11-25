import { OrderRepository } from "../infrastructure/repositories/order.repository";

const orderRepo = new OrderRepository();

export class OrderService {
    async createOrder(orderData: {
        userId: number | null;
        cart: Array<{
            slug: string;
            name: string;
            price: number;
            image_url: string;
            qty: number;
        }>;
        shippingAddress: string;
        shippingCost: number;
    }) {
        // Calculate total amount
        const subtotal = orderData.cart.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );
        const totalAmount = subtotal + orderData.shippingCost;

        // Create order
        const order = await orderRepo.createOrder({
            userId: orderData.userId,
            totalAmount,
            shippingAddress: orderData.shippingAddress,
            status: "pending",
        });

        // Create order items
        for (const item of orderData.cart) {
            // Get product ID from slug
            const product = await orderRepo.getProductBySlug(item.slug);
            if (!product) {
                throw new Error(`Product with slug ${item.slug} not found`);
            }

            await orderRepo.createOrderItem({
                orderId: order.id,
                productId: product.id,
                quantity: item.qty,
                unitPrice: item.price,
            });
        }

        return order;
    }

    async getOrderById(orderId: number) {
        return orderRepo.getOrderById(orderId);
    }

    async getAllOrders() {
        return orderRepo.getAllOrders();
    }

    async updateOrderStatus(orderId: number, status: string) {
        return orderRepo.updateOrderStatus(orderId, status);
    }
}

