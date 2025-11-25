import { Blog } from '../../domain/entities/blog';
import pool from '../database/db';

export type BlogCreateInput = Pick<Blog, 'title' | 'content'> & { product_id: number };
export type BlogUpdateInput = Partial<Pick<Blog, 'title' | 'content'>> & { product_id?: number };

export class BlogRepository {
    private baseSelect = `
        SELECT 
            b.*,
            p.name AS product_name,
            p.image_url AS product_image_url,
            p.slug AS product_slug
        FROM blogs b
        LEFT JOIN products p ON b.product_id = p.id
    `;

    async findAll(): Promise<Blog[]> {
        const result = await pool.query(`${this.baseSelect} ORDER BY b.id ASC`);
        return result.rows;
    }

    async findById(id: number): Promise<Blog | undefined> {
        const result = await pool.query(`${this.baseSelect} WHERE b.id = $1`, [id]);
        return result.rows[0];
    }

    async create(data: BlogCreateInput): Promise<Blog> {
        const existingIdsResult = await pool.query("SELECT id FROM blogs ORDER BY id");
        const existingIds = existingIdsResult.rows.map((row: any) => parseInt(row.id, 10));
        
        let nextId = 1;
        for (let i = 1; i <= 1000; i++) { 
            if (!existingIds.includes(i)) {
                nextId = i;
                break;
            }
        }
        
        console.log(`Blog - Existing IDs: [${existingIds.join(', ')}]`);
        console.log(`Blog - Next available ID: ${nextId}`);

        // Insert với ID cụ thể
        const result = await pool.query(
            `INSERT INTO blogs (id, title, content, product_id, created_at, updated_at)
             VALUES ($1, $2, $3, $4, NOW(), NOW())
             RETURNING *`,
            [nextId, data.title, data.content, data.product_id ?? null]
        );

        // Update sequence để đồng bộ với ID vừa insert
        const maxId = existingIds.length > 0 ? Math.max(nextId, ...existingIds) : nextId;
        await pool.query(`SELECT setval('blogs_id_seq', $1, true)`, [maxId]);
        console.log(`Blog - Sequence updated to: ${maxId}`);

        return result.rows[0];
    }

    async update(id: number, data: BlogUpdateInput): Promise<Blog> {
        const result = await pool.query(
            `UPDATE blogs 
             SET 
                title = COALESCE($1, title),
                content = COALESCE($2, content),
                product_id = COALESCE($3, product_id),
                updated_at = NOW()
             WHERE id = $4
             RETURNING *`,
            [data.title, data.content, data.product_id ?? null, id]
        );
        return result.rows[0];
    }

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
        
        const maxIdResult = await pool.query("SELECT COALESCE(MAX(id), 0) as max_id FROM blogs");
        const maxId = parseInt(maxIdResult.rows[0].max_id, 10);

        await pool.query(`SELECT setval('blogs_id_seq', $1, false)`, [maxId]);
        console.log(`Blog deleted. Sequence reset to ${maxId}`);
    }
}
