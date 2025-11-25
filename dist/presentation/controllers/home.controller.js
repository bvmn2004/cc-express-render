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
exports.HomeController = void 0;
const product_service_1 = require("../../application/product.service");
const productService = new product_service_1.ProductService();
class HomeController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getProducts();
                res.render("areas/client/home", {
                    layout: "default-layout",
                    title: "Luka Store",
                    products,
                });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map