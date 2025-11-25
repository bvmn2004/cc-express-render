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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repository_1 = require("../infrastructure/repositories/product.repository");
class ProductService {
    constructor() {
        this.repo = new product_repository_1.ProductRepository();
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.create(product);
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findAll();
        });
    }
    getProductsByCategorySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findByCategorySlug(slug);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findById(id);
        });
    }
    getProductBySlug(slug) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.findBySlug(slug);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.update(id, product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repo.delete(id);
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map