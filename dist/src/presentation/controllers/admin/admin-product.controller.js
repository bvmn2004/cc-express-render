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
exports.AdminProductController = void 0;
const product_service_1 = require("../../../application/product.service");
const db_1 = __importDefault(require("../../../infrastructure/database/db"));
const productService = new product_service_1.ProductService();
class AdminProductController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getProducts();
                res.render("areas/admin/product/list", {
                    layout: "admin-layout",
                    title: "Manage Products",
                    products,
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
                const categories = yield db_1.default.query("SELECT * FROM categories ORDER BY name ASC");
                res.render("areas/admin/product/create", {
                    layout: "admin-layout",
                    title: "Create Product",
                    categories: categories.rows,
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
                const { name, price, description, category_id, stock_quantity, image_url } = req.body;
                // Validate required fields
                if (!name || !price || stock_quantity === undefined) {
                    return res.status(400).send("Name, price, and stock quantity are required");
                }
                // Parse numeric values
                const parsedPrice = parseFloat(price);
                const parsedStockQuantity = parseInt(stock_quantity, 10);
                const parsedCategoryId = category_id ? parseInt(category_id, 10) : null;
                if (isNaN(parsedPrice) || parsedPrice <= 0) {
                    return res.status(400).send("Invalid price");
                }
                if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
                    return res.status(400).send("Invalid stock quantity");
                }
                const product = yield productService.createProduct({
                    name: name.trim(),
                    price: parsedPrice,
                    description: (description === null || description === void 0 ? void 0 : description.trim()) || null,
                    category_id: parsedCategoryId,
                    stock_quantity: parsedStockQuantity,
                    image_url: (image_url === null || image_url === void 0 ? void 0 : image_url.trim()) || null,
                });
                console.log("Product created successfully:", product);
                res.redirect("/admin/products");
            }
            catch (error) {
                console.error("Error creating product:", error);
                res.status(500).send(`Error creating product: ${error.message || "Internal server error"}`);
            }
        });
    }
    static editForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield productService.getProductById(Number(id));
                if (!product)
                    return res.status(404).send("Product not found");
                const categories = yield db_1.default.query("SELECT * FROM categories ORDER BY name ASC");
                res.render("areas/admin/product/edit", {
                    layout: "admin-layout",
                    title: "Edit Product",
                    product,
                    categories: categories.rows,
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
                const { name, price, description, category_id, stock_quantity, image_url } = req.body;
                // Validate required fields
                if (!name || !price || stock_quantity === undefined) {
                    return res.status(400).send("Name, price, and stock quantity are required");
                }
                // Parse numeric values
                const parsedPrice = parseFloat(price);
                const parsedStockQuantity = parseInt(stock_quantity, 10);
                const parsedCategoryId = category_id ? parseInt(category_id, 10) : null;
                if (isNaN(parsedPrice) || parsedPrice <= 0) {
                    return res.status(400).send("Invalid price");
                }
                if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
                    return res.status(400).send("Invalid stock quantity");
                }
                const product = yield productService.updateProduct(Number(id), {
                    name: name.trim(),
                    price: parsedPrice,
                    description: (description === null || description === void 0 ? void 0 : description.trim()) || null,
                    category_id: parsedCategoryId,
                    stock_quantity: parsedStockQuantity,
                    image_url: (image_url === null || image_url === void 0 ? void 0 : image_url.trim()) || null,
                });
                if (!product) {
                    return res.status(404).send("Product not found");
                }
                console.log("Product updated successfully:", product);
                res.redirect("/admin/products");
            }
            catch (error) {
                console.error("Error updating product:", error);
                res.status(500).send(`Error updating product: ${error.message || "Internal server error"}`);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield productService.deleteProduct(Number(id));
                res.redirect("/admin/products");
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.AdminProductController = AdminProductController;
//# sourceMappingURL=admin-product.controller.js.map