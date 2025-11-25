import fs from "fs";
import path from "path";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Client } = pkg;

// Render luôn cần SSL, không phụ thuộc NODE_ENV
const isRender = !!process.env.DATABASE_URL;

const migrationsDir = path.join(
    process.cwd(),
    "src",
    "infrastructure",
    "migrations"
);

export async function runMigrations() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: isRender
            ? { rejectUnauthorized: false } 
            : false,
    });

    console.log("Connecting to database for migration...");

    try {
        await client.connect();

        if (!fs.existsSync(migrationsDir)) {
            console.log("Migration directory not found.");
            return;
        }

        const files = fs.readdirSync(migrationsDir)
            .filter(file => file.endsWith(".sql"))
            .sort((a, b) => a.localeCompare(b));

        if (files.length === 0) {
            console.log("No migration files found.");
            return;
        }

        console.log(`Found ${files.length} migration files.`);

        for (const file of files) {
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, "utf8");

            console.log(`\nRunning migration ${file}...`);

            try {
                await client.query(sql);
                console.log(`Completed: ${file}`);
            } catch (err) {
                console.error(`Error in migration ${file}:`);
                throw err;
            }
        }

        console.log("\n✅ All migrations completed successfully!");

    } catch (err) {
        console.error("❌ Migration failed!");
        console.error(err instanceof Error ? err.message : String(err));
        process.exit(1);
    } finally {
        await client.end();
        console.log("Database connection closed.");
    }
}
