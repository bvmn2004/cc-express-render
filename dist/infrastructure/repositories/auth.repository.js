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
exports.AuthRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class AuthRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
            const { rows } = yield db_1.default.query(query, [email]);
            return rows[0] || null;
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, full_name = null, role = 'customer' } = data;
            const query = `INSERT INTO users (email, password, full_name, role) VALUES ($1, $2, $3, $4) RETURNING *`;
            const { rows } = yield db_1.default.query(query, [email, password, full_name, role]);
            return rows[0];
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC`;
            const { rows } = yield db_1.default.query(query);
            return rows;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id, email, full_name, phone, address, role, created_at FROM users WHERE id = $1 LIMIT 1`;
            const { rows } = yield db_1.default.query(query, [id]);
            return rows[0] || null;
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Build dynamic SET clause
            const sets = [];
            const values = [];
            let idx = 1;
            if (data.email !== undefined) {
                sets.push(`email = $${idx++}`);
                values.push(data.email);
            }
            if (data.full_name !== undefined) {
                sets.push(`full_name = $${idx++}`);
                values.push(data.full_name);
            }
            if (data.role !== undefined) {
                sets.push(`role = $${idx++}`);
                values.push(data.role);
            }
            if (data.password !== undefined) {
                sets.push(`password = $${idx++}`);
                values.push(data.password);
            }
            if (sets.length === 0)
                return null;
            const query = `UPDATE users SET ${sets.join(', ')} WHERE id = $${idx} RETURNING id, email, full_name, role, created_at`;
            values.push(id);
            const { rows } = yield db_1.default.query(query, values);
            return rows[0] || null;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM users WHERE id = $1`;
            yield db_1.default.query(query, [id]);
            return true;
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map