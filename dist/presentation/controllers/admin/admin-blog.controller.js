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
exports.AdminBlogController = void 0;
const blog_service_1 = require("../../../application/blog.service");
const product_service_1 = require("../../../application/product.service");
const blogService = new blog_service_1.BlogService();
const productService = new product_service_1.ProductService();
class AdminBlogController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield blogService.getAll();
                res.render("areas/admin/blog/list", {
                    layout: "admin-layout",
                    title: "Manage Blogs",
                    blogs,
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static createForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getProducts();
                res.render("areas/admin/blog/create", {
                    layout: "admin-layout",
                    title: "Create Blog",
                    products,
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, product_id } = req.body;
                if (!title || !content) {
                    return res.status(400).send("Title and content are required");
                }
                const productId = Number(product_id);
                if (!productId || isNaN(productId)) {
                    return res.status(400).send("Please select a valid product");
                }
                const blog = yield blogService.create({ title, content, product_id: productId });
                console.log("Blog created successfully:", blog);
                res.redirect("/admin/blogs");
            }
            catch (error) {
                console.error("Error creating blog:", error);
                res.status(500).send(`Error: ${error.message || "Internal server error"}`);
            }
        });
    }
    static editForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blog = yield blogService.getById(Number(id));
                if (!blog)
                    return res.status(404).send("Blog not found");
                const products = yield productService.getProducts();
                res.render("areas/admin/blog/edit", {
                    layout: "admin-layout",
                    title: "Edit Blog",
                    blog,
                    products,
                });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, content, product_id } = req.body;
                if (!title || !content) {
                    return res.status(400).send("Title and content are required");
                }
                const productId = Number(product_id);
                if (!productId || isNaN(productId)) {
                    return res.status(400).send("Please select a valid product");
                }
                const blog = yield blogService.update(Number(id), { title, content, product_id: productId });
                console.log("Blog updated successfully:", blog);
                res.redirect("/admin/blogs");
            }
            catch (error) {
                console.error("Error updating blog:", error);
                res.status(500).send(`Error: ${error.message || "Internal server error"}`);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const blogId = Number(id);
                if (!blogId || isNaN(blogId)) {
                    return res.status(400).send("Invalid blog ID");
                }
                yield blogService.delete(blogId);
                res.redirect("/admin/blogs");
            }
            catch (error) {
                console.error("Error deleting blog:", error);
                res.status(500).send(`Error: ${error.message || "Internal server error"}`);
            }
        });
    }
}
exports.AdminBlogController = AdminBlogController;
//# sourceMappingURL=admin-blog.controller.js.map