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
exports.StatisticsRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class StatisticsRepository {
    getTotalRevenue() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
            SELECT COALESCE(SUM(total_amount), 0)::numeric AS total
            FROM orders
        `);
            return Number(result.rows[0].total);
        });
    }
    getNewOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
            SELECT COUNT(*)::int AS total
            FROM orders
            WHERE created_at >= NOW() - INTERVAL '30 days'
        `);
            return result.rows[0].total;
        });
    }
    getActiveProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
            SELECT COUNT(*)::int AS total
            FROM products
            WHERE stock_quantity > 0
        `);
            return result.rows[0].total;
        });
    }
    getCategoriesCount() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
            SELECT COUNT(*)::int AS total
            FROM categories
        `);
            return result.rows[0].total;
        });
    }
}
exports.StatisticsRepository = StatisticsRepository;
//# sourceMappingURL=statistics.repository.js.map