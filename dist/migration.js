"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isProduction = process.env.NODE_ENV === "production";
const { Client } = pg_1.default;
const migrationsDir = path_1.default.join(process.cwd(), "src", "infrastructure", "migrations");
function runMigrations() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: isProduction
                ? { rejectUnauthorized: false }
                : false,
        });
        console.log("Connecting to database for migration...");
        try {
            yield client.connect();
            if (!fs_1.default.existsSync(migrationsDir)) {
                console.log("Migration directory not found.");
                return;
            }
            const files = fs_1.default.readdirSync(migrationsDir)
                .filter(file => file.endsWith(".sql"))
                .sort((a, b) => a.localeCompare(b));
            if (files.length === 0) {
                console.log("No migration files found.");
                return;
            }
            console.log(`Found ${files.length} migration files.`);
            for (const file of files) {
                const filePath = path_1.default.join(migrationsDir, file);
                const sql = fs_1.default.readFileSync(filePath, "utf8");
                console.log(`\nRunning migration ${file}...`);
                try {
                    yield client.query(sql);
                    console.log(`Completed: ${file}`);
                }
                catch (err) {
                    console.error(`Error in migration ${file}:`);
                    throw err;
                }
            }
            console.log("\n✅ All migrations completed successfully!");
        }
        catch (err) {
            console.error("❌ Migration failed!");
            if (err instanceof Error) {
                console.error(err.message);
            }
            else {
                console.error(String(err));
            }
            process.exit(1);
        }
        finally {
            yield client.end();
            console.log("Database connection closed.");
        }
    });
}
//# sourceMappingURL=migration.js.map