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
exports.AdminCategoryController = void 0;
const category_service_1 = require("../../../application/category.service");
const categoryService = new category_service_1.CategoryService();
class AdminCategoryController {
    // List categories
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryService.getAllCategories();
                res.render("areas/admin/category/list", {
                    layout: "admin-layout",
                    title: "Manage Categories",
                    categories,
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    // Render form create
    static createForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("areas/admin/category/create", {
                    layout: "admin-layout",
                    title: "Create Category",
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    // Create category
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                yield categoryService.createCategory(name);
                res.redirect("/admin/categories");
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    // Render form edit
    static editForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const category = yield categoryService.getCategoryById(Number(id));
                if (!category)
                    return res.status(404).send("Category not found");
                res.render("areas/admin/category/edit", {
                    layout: "admin-layout",
                    title: "Edit Category",
                    category,
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    // Update category
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name } = req.body;
                yield categoryService.updateCategory(Number(id), name);
                res.redirect("/admin/categories");
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    // Delete category
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield categoryService.deleteCategory(Number(id));
                res.redirect("/admin/categories");
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.AdminCategoryController = AdminCategoryController;
//# sourceMappingURL=admin-category.controller.js.map