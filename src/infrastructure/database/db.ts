import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production" || !!process.env.RENDER;

const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
    
    ...(process.env.DATABASE_URL ? {} : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    }),

    // QUAN TRỌNG: Cấu hình SSL cho Render
    ssl: isProduction || process.env.DATABASE_URL?.includes("render.com")
        ? { rejectUnauthorized: false } 
        : false,
};

const pool = new Pool(connectionConfig);

console.log("--- DB INIT ---");
console.log("Using Connection String:", !!process.env.DATABASE_URL);
console.log("SSL Mode:", connectionConfig.ssl ? "ENABLED" : "DISABLED");
console.log("---------------");

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

export default pool;
