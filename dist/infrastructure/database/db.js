"use strict";
// import { Pool } from "pg";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: Number(process.env.DB_PORT),
// });
// pool.on("error", (err) => {
//     console.error("Unexpected error on idle client", err);
//     process.exit(-1);
// });
// export default pool;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production" || !!process.env.RENDER;
const connectionConfig = Object.assign(Object.assign({ connectionString: process.env.DATABASE_URL }, (process.env.DATABASE_URL ? {} : {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
})), { 
    // QUAN TRỌNG: Cấu hình SSL cho Render
    ssl: isProduction || ((_a = process.env.DATABASE_URL) === null || _a === void 0 ? void 0 : _a.includes("render.com"))
        ? { rejectUnauthorized: false }
        : false });
const pool = new pg_1.Pool(connectionConfig);
console.log("--- DB INIT ---");
console.log("Using Connection String:", !!process.env.DATABASE_URL);
console.log("SSL Mode:", connectionConfig.ssl ? "ENABLED" : "DISABLED");
console.log("---------------");
pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});
exports.default = pool;
//# sourceMappingURL=db.js.map