import fs from "fs";
import path from "path";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

const migrationsDir = path.join(
    process.cwd(),
    "src",
    "infrastructure",
    "migrations"
);

export async function runMigrations() {

    console.log("Connecting to database for migration...");

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        if (!fs.existsSync(migrationsDir)) {
            console.log("Migration directory not found.");
            return;
        }

        const files = fs.readdirSync(migrationsDir)
            .filter(f => f.endsWith(".sql"))
            .sort();

        console.log(`Found ${files.length} migration files.`);

        for (const file of files) {
            console.log(`Running migration ${file}...`);
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, "utf8");
            await client.query(sql);
            console.log(`Completed: ${file}`);
        }

        console.log("✅ All migrations completed successfully!");

    } catch (err) {
        console.error("❌ Migration failed:");
        if (err instanceof Error) console.error(err.message);
        else console.error(String(err));
        process.exit(1);
    } finally {
        await client.end();
        console.log("Database connection closed.");
    }
}
