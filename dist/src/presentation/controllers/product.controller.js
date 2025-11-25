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
exports.ProductController = void 0;
const product_service_1 = require("../../application/product.service");
const productService = new product_service_1.ProductService();
class ProductController {
    static getBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { slug } = req.params;
                const products = yield productService.getProducts();
                const product = yield productService.getProductBySlug(slug);
                if (!product) {
                    return res.status(404).render("errors/404", {
                        layout: "default-layout",
                        title: "Product Not Found",
                    });
                }
                res.render("areas/client/product", {
                    layout: "default-layout",
                    title: `${product.name} - Luka Store`,
                    products,
                    product
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map