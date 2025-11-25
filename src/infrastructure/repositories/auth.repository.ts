import pool from "../database/db";

export interface IAuthRepository {
	findByEmail(email: string): Promise<any | null>;
	createUser(data: { email: string; password: string; full_name?: string; role?: string }): Promise<any>;
}

export class AuthRepository implements IAuthRepository {
	async findByEmail(email: string) {
		const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
		const { rows } = await pool.query(query, [email]);
		return rows[0] || null;
	}

	async createUser(data: { email: string; password: string; full_name?: string; role?: string }) {
		const { email, password, full_name = null, role = 'customer' } = data;
		const query = `INSERT INTO users (email, password, full_name, role) VALUES ($1, $2, $3, $4) RETURNING *`;
		const { rows } = await pool.query(query, [email, password, full_name, role]);
		return rows[0];
	}

	async getAllUsers() {
		const query = `SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC`;
		const { rows } = await pool.query(query);
		return rows;
	}

	async getById(id: number) {
		const query = `SELECT id, email, full_name, phone, address, role, created_at FROM users WHERE id = $1 LIMIT 1`;
		const { rows } = await pool.query(query, [id]);
		return rows[0] || null;
	}

	async updateUser(id: number, data: { email?: string; full_name?: string | null; role?: string; password?: string }) {
		// Build dynamic SET clause
		const sets: string[] = [];
		const values: any[] = [];
		let idx = 1;
		if (data.email !== undefined) { sets.push(`email = $${idx++}`); values.push(data.email); }
		if (data.full_name !== undefined) { sets.push(`full_name = $${idx++}`); values.push(data.full_name); }
		if (data.role !== undefined) { sets.push(`role = $${idx++}`); values.push(data.role); }
		if (data.password !== undefined) { sets.push(`password = $${idx++}`); values.push(data.password); }
		if (sets.length === 0) return null;
		const query = `UPDATE users SET ${sets.join(', ')} WHERE id = $${idx} RETURNING id, email, full_name, role, created_at`;
		values.push(id);
		const { rows } = await pool.query(query, values);
		return rows[0] || null;
	}

	async deleteUser(id: number) {
		const query = `DELETE FROM users WHERE id = $1`;
		await pool.query(query, [id]);
		return true;
	}
}