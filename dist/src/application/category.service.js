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
exports.CategoryService = void 0;
const category_repository_1 = require("../infrastructure/repositories/category.repository");
class CategoryService {
    constructor() {
        this.categoryRepository = new category_repository_1.CategoryRepository();
    }
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.findAll();
        });
    }
    getCategoryForNavbar() {
        return __awaiter(this, arguments, void 0, function* (limit = 2) {
            return this.categoryRepository.findTopCategories(limit);
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.findById(id);
        });
    }
    createCategory(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || name.trim() === "") {
                throw new Error("Category name cannot be empty");
            }
            return this.categoryRepository.create(name);
        });
    }
    updateCategory(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.update(id, name);
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.delete(id);
        });
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map