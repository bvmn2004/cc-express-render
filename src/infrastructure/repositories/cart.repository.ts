import pool from "../database/db";

export class CartRepository {
    async getOrCreateCart(userId: number) {
        // Kiểm tra cart đã tồn tại chưa
        let result = await pool.query(
            "SELECT * FROM carts WHERE user_id = $1 LIMIT 1",
            [userId]
        );

        if (result.rows.length === 0) {
            result = await pool.query(
                "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
                [userId]
            );
        }

        return result.rows[0];
    }

    async addItem(cartId: number, productId: number, quantity: number) {
        const existing = await pool.query(
            "SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cartId, productId]
        );

        if (existing.rows.length > 0) {
            // Update số lượng nếu đã có
            return pool.query(
                "UPDATE cart_items SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *",
                [quantity, cartId, productId]
            );
        }

        return pool.query(
            "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
            [cartId, productId, quantity]
        );
    }

    async getCartItems(cartId: number) {
        const result = await pool.query(
            `SELECT ci.*, p.name, p.price, p.image_url, p.slug
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = $1`,
            [cartId]
        );
        // Transform to match view expectations: quantity -> qty, add slug
        return result.rows.map((row: any) => ({
            ...row,
            qty: row.quantity,
            slug: row.slug,
        }));
    }

    async getCartItemsByUserId(userId: number) {
        const cart = await this.getOrCreateCart(userId);
        return this.getCartItems(cart.id);
    }

    async removeItemByProductSlug(userId: number, productSlug: string) {
        // Get the cart first
        const cart = await this.getOrCreateCart(userId);
        
        // Get product by slug
        const productResult = await pool.query(
            "SELECT id FROM products WHERE slug = $1",
            [productSlug]
        );

        if (productResult.rows.length === 0) {
            throw new Error("Product not found");
        }

        const productId = productResult.rows[0].id;

        // Remove the item
        await pool.query(
            "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cart.id, productId]
        );

        return true;
    }

    async removeItem(cartId: number, productId: number) {
        await pool.query(
            "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2",
            [cartId, productId]
        );
        return true;
    }

    async clearCart(userId: number) {
        const cart = await this.getOrCreateCart(userId);
        await pool.query(
            "DELETE FROM cart_items WHERE cart_id = $1",
            [cart.id]
        );
        return true;
    }
}