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
exports.SearchController = void 0;
const category_service_1 = require("../../application/category.service");
const product_service_1 = require("../../application/product.service");
const productService = new product_service_1.ProductService();
const categoryService = new category_service_1.CategoryService();
class SearchController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getProducts();
                const categories = yield categoryService.getAllCategories();
                res.render("areas/client/search", {
                    layout: "default-layout",
                    title: "Search - Luka Store",
                    products,
                    categories,
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    static getAllProductsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.params;
                const products = yield productService.getProductsByCategorySlug(category);
                const categories = yield categoryService.getAllCategories();
                res.render("areas/client/search", {
                    layout: "default-layout",
                    title: `${category.toUpperCase()} - Luka Store`,
                    products,
                    categories,
                    activeCategory: category,
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map