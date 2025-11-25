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
exports.BlogController = void 0;
const blog_service_1 = require("../../application/blog.service");
const product_service_1 = require("../../application/product.service");
const blogService = new blog_service_1.BlogService();
const productService = new product_service_1.ProductService();
exports.BlogController = {
    // PUBLIC
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogService.getAll();
            // Strip HTML tags and limit preview length
            const blogsWithPreview = blogs.map((blog) => {
                const plainText = blog.content ? blog.content.replace(/<[^>]*>/g, '') : '';
                return Object.assign(Object.assign({}, blog), { content_preview: plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText });
            });
            res.render('areas/client/blogs', { blogs: blogsWithPreview });
        });
    },
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const blog = yield blogService.getById(id);
            if (!blog)
                return res.status(404).render('404');
            res.render('areas/client/blog-detail', { blog });
        });
    },
    // ADMIN
    adminList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogService.getAll();
            res.render('areas/admin/blog/list', { blogs });
        });
    },
    adminCreateGET(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productService.getProducts();
            res.render('areas/admin/blog/create', { products });
        });
    },
    adminCreatePOST(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, content, product_id } = req.body;
            const productId = Number(product_id);
            if (!productId)
                return res.status(400).send('Vui lòng chọn sản phẩm liên quan');
            yield blogService.create({ title, content, product_id: productId });
            res.redirect('/admin/blogs');
        });
    },
    adminEditGET(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const blog = yield blogService.getById(id);
            if (!blog)
                return res.status(404).send('Not found');
            const products = yield productService.getProducts();
            res.render('areas/admin/blog/edit', { blog, products });
        });
    },
    adminEditPOST(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { title, content, product_id } = req.body;
            const productId = Number(product_id);
            if (!productId)
                return res.status(400).send('Vui lòng chọn sản phẩm liên quan');
            yield blogService.update(id, { title, content, product_id: productId });
            res.redirect('/admin/blogs');
        });
    },
    adminDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            yield blogService.delete(id);
            res.redirect('/admin/blogs');
        });
    },
};
//# sourceMappingURL=blog.controller.js.map