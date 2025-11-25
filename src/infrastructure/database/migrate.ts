import pool from "./db";

export async function runMigrations() {
    try {
        // Tạo bảng users
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(255),
                phone VARCHAR(20),
                address TEXT,
                role VARCHAR(50) DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Tạo bảng categories
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Tạo bảng products
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                category_id INTEGER REFERENCES categories(id),
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                stock_quantity INTEGER NOT NULL,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Tạo bảng blogs (thêm mới)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                product_id INTEGER REFERENCES products(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        await pool.query(`
            ALTER TABLE blogs
            ADD COLUMN IF NOT EXISTS product_id INTEGER REFERENCES products(id)
        `);

        // Chèn dữ liệu mẫu vào bảng blogs (chỉ khi bảng rỗng)
        const checkBlogs = await pool.query("SELECT COUNT(*) FROM blogs");
        if (parseInt(checkBlogs.rows[0].count, 10) === 0) {
            // Lấy sản phẩm iPhone 16 Pro (128GB) từ SQL - ID 6, slug: iphone-16-pro-128gb-
            const productRes = await pool.query(`
                SELECT id, name, price, description, image_url, slug
                FROM products
                WHERE id = 6 OR slug = 'iphone-16-pro-128gb-'
                LIMIT 1
            `);

            if ((productRes.rowCount ?? 0) > 0) {
                const product = productRes.rows[0];
                
                const blogTitle = `Hands-on Review: ${product.name}`;
                const blogContent = `
                    <p>${product.description || product.name}</p>
                    <p><strong>Key specs we love:</strong></p>
                    <ul>
                        <li>Price at Luka Store: $${Number(product.price).toFixed(2)} USD.</li>
                        <li>Premium build paired with the latest Apple silicon for smooth editing and gaming.</li>
                        <li>MagSafe ecosystem keeps all your existing accessories compatible.</li>
                    </ul>
                    <p>After a week of daily shooting, the camera system delivers sharper portraits and the new vapor chamber helps the phone stay cool when recording 4K60. If you are upgrading from the iPhone 15 series, this is the most balanced flagship you can get in 2025.</p>
                `;

                await pool.query(
                    `INSERT INTO blogs (title, content, product_id)
                     VALUES ($1, $2, $3)`,
                    [blogTitle, blogContent, product.id]
                );
                console.log(`Seed blog inserted: "${blogTitle}" linked to product ID ${product.id} (${product.name})`);
            } else {
                console.log("Warning: Product not found, skipping blog seed");
            }
        }

        // Tạo bảng promotions
        await pool.query(`
            CREATE TABLE IF NOT EXISTS promotions (
                id SERIAL PRIMARY KEY,
                code VARCHAR(50) UNIQUE NOT NULL,
                discount_percentage DECIMAL(5, 2),
                start_date TIMESTAMP,
                end_date TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Tạo bảng order_promotions
        await pool.query(`
            CREATE TABLE IF NOT EXISTS order_promotions (
                id SERIAL PRIMARY KEY,
                order_id INTEGER REFERENCES orders(id),
                promotion_id INTEGER REFERENCES promotions(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Chèn dữ liệu mẫu vào bảng categories (trước khi chèn products vì có khóa ngoại)
        const checkCategories = await pool.query("SELECT COUNT(*) FROM categories");
        if (parseInt(checkCategories.rows[0].count, 10) === 0) {
            await pool.query(`
                INSERT INTO categories (name, description) VALUES
                ('Electronics', 'Electronic devices and gadgets'),
                ('Laptops', 'Laptops and notebooks'),
                ('Headphones', 'Audio devices and headphones');
            `);
            console.log("Seed data inserted into categories table");
        }

        // Chèn dữ liệu mẫu vào bảng users
        const checkUsers = await pool.query("SELECT COUNT(*) FROM users");
        if (parseInt(checkUsers.rows[0].count, 10) === 0) {
            await pool.query(`
                INSERT INTO users (email, password, full_name, phone, address, role) VALUES
                ('user1@example.com', '$2b$10$examplehashedpassword1', 'Nguyen Van A', '0123456789', '123 Hanoi', 'customer'),
                ('admin@example.com', '$2b$10$examplehashedpassword2', 'Admin User', '0987654321', '456 Hanoi', 'admin');
            `);
            console.log("Seed data inserted into users table");
        }

        // Chèn dữ liệu mẫu vào bảng products
        const checkProducts = await pool.query("SELECT COUNT(*) FROM products");
        if (parseInt(checkProducts.rows[0].count, 10) === 0) {
            await pool.query(`
                INSERT INTO products (category_id, name, price, description, stock_quantity, image_url) VALUES
                (1, 'iPhone 15 Pro', 1200.00, 'Latest Apple iPhone', 50, '/images/iphone15pro.jpg'),
                (1, 'Samsung Galaxy S24', 999.00, 'Newest Samsung flagship', 30, '/images/samsungs24.jpg'),
                (2, 'MacBook Air M3', 1500.00, 'Lightweight Apple laptop', 20, '/images/macbookairm3.jpg'),
                (3, 'Sony WH-1000XM5', 399.00, 'Noise cancelling headphones', 100, '/images/sonywh1000xm5.jpg'),
                (2, 'Dell XPS 13', 1100.00, 'Ultrabook with sleek design', 25, '/images/dellxps13.jpg');
            `);
            console.log("Seed data inserted into products table");
        }

        // Chèn dữ liệu mẫu vào bảng promotions
        const checkPromotions = await pool.query("SELECT COUNT(*) FROM promotions");
        if (parseInt(checkPromotions.rows[0].count, 10) === 0) {
            await pool.query(`
                INSERT INTO promotions (code, discount_percentage, start_date, end_date) VALUES
                ('DISCOUNT10', 10.00, '2025-09-01', '2025-12-31'),
                ('SALE20', 20.00, '2025-10-01', '2025-11-30');
            `);
            console.log("Seed data inserted into promotions table");
        }

        console.log("Migrations completed successfully");
    } catch (error) {
        console.error("Migration failed:", error);
    }
}