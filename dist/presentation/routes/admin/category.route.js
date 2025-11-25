"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_category_controller_1 = require("../../controllers/admin/admin-category.controller");
const router = (0, express_1.Router)();
router.get("/", admin_category_controller_1.AdminCategoryController.getAll);
router.get("/create", admin_category_controller_1.AdminCategoryController.createForm);
router.post("/create", admin_category_controller_1.AdminCategoryController.create);
router.get("/:id/edit", admin_category_controller_1.AdminCategoryController.editForm);
router.post("/:id/update", admin_category_controller_1.AdminCategoryController.update);
router.post("/:id/delete", admin_category_controller_1.AdminCategoryController.delete);
exports.default = router;
//# sourceMappingURL=category.route.js.map