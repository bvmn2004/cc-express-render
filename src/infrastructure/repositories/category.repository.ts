import pool from "../database/db";

export class CategoryRepository {
    async findAll() {
        const result = await pool.query("SELECT * FROM categories ORDER BY id ASC");
        return result.rows;
    }

    async findTopCategories(limit: number = 2) {
        const result = await pool.query(
            "SELECT * FROM categories ORDER BY name ASC LIMIT $1",
            [limit]
        );
        return result.rows;
    }

    async findById(id: number) {
        const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
        return result.rows[0];
    }

    async create(name: string) {
        const result = await pool.query(
            "INSERT INTO categories (name) VALUES ($1) RETURNING *",
            [name]
        );
        return result.rows[0];
    }

    async update(id: number, name: string) {
        const result = await pool.query(
            "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
            [name, id]
        );
        return result.rows[0];
    }

    async delete(id: number) {
        await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    }
}