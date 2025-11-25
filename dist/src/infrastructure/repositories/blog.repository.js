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
exports.BlogRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class BlogRepository {
    constructor() {
        this.baseSelect = `
        SELECT 
            b.*,
            p.name AS product_name,
            p.image_url AS product_image_url,
            p.slug AS product_slug
        FROM blogs b
        LEFT JOIN products p ON b.product_id = p.id
    `;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`${this.baseSelect} ORDER BY b.id ASC`);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`${this.baseSelect} WHERE b.id = $1`, [id]);
            return result.rows[0];
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const existingIdsResult = yield db_1.default.query("SELECT id FROM blogs ORDER BY id");
            const existingIds = existingIdsResult.rows.map((row) => parseInt(row.id, 10));
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
            const result = yield db_1.default.query(`INSERT INTO blogs (id, title, content, product_id, created_at, updated_at)
             VALUES ($1, $2, $3, $4, NOW(), NOW())
             RETURNING *`, [nextId, data.title, data.content, (_a = data.product_id) !== null && _a !== void 0 ? _a : null]);
            // Update sequence để đồng bộ với ID vừa insert
            const maxId = existingIds.length > 0 ? Math.max(nextId, ...existingIds) : nextId;
            yield db_1.default.query(`SELECT setval('blogs_id_seq', $1, true)`, [maxId]);
            console.log(`Blog - Sequence updated to: ${maxId}`);
            return result.rows[0];
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield db_1.default.query(`UPDATE blogs 
             SET 
                title = COALESCE($1, title),
                content = COALESCE($2, content),
                product_id = COALESCE($3, product_id),
                updated_at = NOW()
             WHERE id = $4
             RETURNING *`, [data.title, data.content, (_a = data.product_id) !== null && _a !== void 0 ? _a : null, id]);
            return result.rows[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('DELETE FROM blogs WHERE id = $1', [id]);
            const maxIdResult = yield db_1.default.query("SELECT COALESCE(MAX(id), 0) as max_id FROM blogs");
            const maxId = parseInt(maxIdResult.rows[0].max_id, 10);
            yield db_1.default.query(`SELECT setval('blogs_id_seq', $1, false)`, [maxId]);
            console.log(`Blog deleted. Sequence reset to ${maxId}`);
        });
    }
}
exports.BlogRepository = BlogRepository;
//# sourceMappingURL=blog.repository.js.map