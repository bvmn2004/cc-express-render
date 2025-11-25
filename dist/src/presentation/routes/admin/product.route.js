"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_product_controller_1 = require("../../controllers/admin/admin-product.controller");
const router = (0, express_1.Router)();
router.get("/", admin_product_controller_1.AdminProductController.getAll);
router.get("/create", admin_product_controller_1.AdminProductController.createForm);
router.post("/", admin_product_controller_1.AdminProductController.create);
router.get("/:id/edit", admin_product_controller_1.AdminProductController.editForm);
router.put("/:id", admin_product_controller_1.AdminProductController.update);
router.delete("/:id", admin_product_controller_1.AdminProductController.delete);
exports.default = router;
//# sourceMappingURL=product.route.js.map