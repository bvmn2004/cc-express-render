import pool from "../database/db";

export class StatisticsRepository {
    async getTotalRevenue() {
        const result = await pool.query(`
            SELECT COALESCE(SUM(total_amount), 0)::numeric AS total
            FROM orders
        `);
        return Number(result.rows[0].total);
    }

    async getNewOrders() {
        const result = await pool.query(`
            SELECT COUNT(*)::int AS total
            FROM orders
            WHERE created_at >= NOW() - INTERVAL '30 days'
        `);
        return result.rows[0].total;
    }

    async getActiveProducts() {
        const result = await pool.query(`
            SELECT COUNT(*)::int AS total
            FROM products
            WHERE stock_quantity > 0
        `);
        return result.rows[0].total;
    }

    async getCategoriesCount() {
        const result = await pool.query(`
            SELECT COUNT(*)::int AS total
            FROM categories
        `);
        return result.rows[0].total;
    }
}
