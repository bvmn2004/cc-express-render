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
exports.ProductRepository = void 0;
const db_1 = __importDefault(require("../database/db"));
class ProductRepository {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Attempting to create product with data:", {
                    name: product.name,
                    price: product.price,
                    stock_quantity: product.stock_quantity,
                    category_id: product.category_id,
                });
                // Tìm ID nhỏ nhất chưa được sử dụng (từ 1 trở lên)
                const existingIdsResult = yield db_1.default.query("SELECT id FROM products ORDER BY id");
                const existingIds = existingIdsResult.rows.map((row) => parseInt(row.id, 10));
                let nextId = 1;
                // Tìm ID đầu tiên chưa được sử dụng
                for (let i = 1; i <= 1000; i++) { // Giới hạn tìm đến 1000
                    if (!existingIds.includes(i)) {
                        nextId = i;
                        break;
                    }
                }
                console.log(`Existing IDs: [${existingIds.join(', ')}]`);
                console.log(`Next available ID: ${nextId}`);
                // Insert với ID cụ thể - phải chỉ định rõ ràng ID
                const result = yield db_1.default.query(`INSERT INTO products 
                (id, name, price, description, category_id, stock_quantity, image_url, created_at, updated_at) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
                RETURNING *`, [
                    nextId,
                    product.name,
                    product.price,
                    product.description || null,
                    product.category_id || null,
                    product.stock_quantity,
                    product.image_url || null,
                ]);
                // Update sequence để đồng bộ với ID vừa insert
                const maxId = existingIds.length > 0 ? Math.max(nextId, ...existingIds) : nextId;
                yield db_1.default.query(`SELECT setval('products_id_seq', $1, true)`, [maxId]);
                console.log(`Sequence updated to: ${maxId}`);
                if (!result.rows || result.rows.length === 0) {
                    throw new Error("Failed to create product: No data returned");
                }
                const createdProduct = result.rows[0];
                console.log("✅ Product successfully inserted into database with ID:", createdProduct.id);
                console.log("Product details:", createdProduct);
                // Verify the product was saved by querying it back
                const verifyResult = yield db_1.default.query("SELECT * FROM products WHERE id = $1", [createdProduct.id]);
                if (verifyResult.rows.length === 0) {
                    console.error("⚠️ WARNING: Product was inserted but cannot be found on verification query!");
                }
                else {
                    console.log("✅ Verification: Product found in database");
                }
                return createdProduct;
            }
            catch (error) {
                console.error("❌ Database error in create product:", error.message);
                console.error("Error code:", error.code);
                console.error("Error detail:", error.detail);
                console.error("Full error:", error);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
            SELECT p.*, c.name AS category_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            ORDER BY p.id ASC
        `);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("SELECT * FROM products WHERE id = $1", [id]);
            return result.rows[0] || null;
        });
    }
    findBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query("SELECT * FROM products WHERE slug = $1", [slug]);
            return result.rows[0] || null;
        });
    }
    findByCategorySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
            SELECT p.*
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.slug) = LOWER($1)
            ORDER BY p.created_at DESC
        `;
            const result = yield db_1.default.query(query, [slug]);
            return result.rows;
        });
    }
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`UPDATE products 
                SET name=$1, price=$2, description=$3, category_id=$4, stock_quantity=$5, 
                    image_url=$6, updated_at=NOW()
                WHERE id=$7 RETURNING *`, [
                product.name,
                product.price,
                product.description,
                product.category_id || null,
                product.stock_quantity,
                product.image_url,
                id,
            ]);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield db_1.default.query("DELETE FROM products WHERE id=$1", [id]);
            const deleted = ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
            if (deleted) {
                // Reset sequence để ID tiếp theo sẽ tuần tự theo số thứ tự
                // Tìm max ID hiện tại và set sequence về đó
                const maxIdResult = yield db_1.default.query("SELECT COALESCE(MAX(id), 0) as max_id FROM products");
                const maxId = parseInt(maxIdResult.rows[0].max_id, 10);
                // Set sequence về max_id + 1 để ID tiếp theo sẽ là max_id + 1
                yield db_1.default.query(`SELECT setval('products_id_seq', $1, false)`, [maxId]);
                console.log(`Product deleted. Sequence reset to ${maxId}`);
            }
            return deleted;
        });
    }
}
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map