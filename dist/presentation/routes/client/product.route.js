"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controllers/product.controller");
const router = (0, express_1.Router)();
router.get("/:slug", product_controller_1.ProductController.getBySlug);
exports.default = router;
//# sourceMappingURL=product.route.js.map