import pool from "../database/db";

export class OrderRepository {
    async createOrder(orderData: {
        userId: number | null;
        totalAmount: number;
        shippingAddress: string;
        status?: string;
    }) {
        const result = await pool.query(
            `INSERT INTO orders (user_id, total_amount, shipping_address, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                orderData.userId,
                orderData.totalAmount,
                orderData.shippingAddress,
                orderData.status || "pending",
            ]
        );
        return result.rows[0];
    }

    async createOrderItem(orderItemData: {
        orderId: number;
        productId: number;
        quantity: number;
        unitPrice: number;
    }) {
        const result = await pool.query(
            `INSERT INTO order_items (order_id, product_id, quantity, unit_price)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [
                orderItemData.orderId,
                orderItemData.productId,
                orderItemData.quantity,
                orderItemData.unitPrice,
            ]
        );
        return result.rows[0];
    }

    async getOrderById(orderId: number) {
        const orderResult = await pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [orderId]
        );

        if (orderResult.rows.length === 0) {
            return null;
        }

        const order = orderResult.rows[0];

        const itemsResult = await pool.query(
            `SELECT oi.*, p.name as product_name, p.image_url as product_image
             FROM order_items oi
             JOIN products p ON oi.product_id = p.id
             WHERE oi.order_id = $1`,
            [orderId]
        );

        order.items = itemsResult.rows;

        return order;
    }

    async getProductBySlug(slug: string) {
        const result = await pool.query(
            "SELECT * FROM products WHERE slug = $1",
            [slug]
        );
        return result.rows[0];
    }

    async getAllOrders() {
        const result = await pool.query(
            `SELECT o.*, 
                    u.email as user_email, 
                    u.full_name as user_name,
                    COUNT(oi.id) as item_count
             FROM orders o
             LEFT JOIN users u ON o.user_id = u.id
             LEFT JOIN order_items oi ON o.id = oi.order_id
             GROUP BY o.id, u.email, u.full_name
             ORDER BY o.created_at DESC`
        );
        return result.rows;
    }

    async updateOrderStatus(orderId: number, status: string) {
        const result = await pool.query(
            "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
            [status, orderId]
        );
        return result.rows[0];
    }
}

