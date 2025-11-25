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
exports.CategoryRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class CategoryRepository {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("SELECT * FROM categories ORDER BY id ASC");
            return result.rows;
        });
    }
    findTopCategories() {
        return __awaiter(this, arguments, void 0, function* (limit = 2) {
            const result = yield db_1.default.query("SELECT * FROM categories ORDER BY name ASC LIMIT $1", [limit]);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("SELECT * FROM categories WHERE id = $1", [id]);
            return result.rows[0];
        });
    }
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("INSERT INTO categories (name) VALUES ($1) RETURNING *", [name]);
            return result.rows[0];
        });
    }
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("UPDATE categories SET name = $1 WHERE id = $2 RETURNING *", [name, id]);
            return result.rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query("DELETE FROM categories WHERE id = $1", [id]);
        });
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map