"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_blog_controller_1 = require("../../controllers/admin/admin-blog.controller");
const router = (0, express_1.Router)();
router.get("/", admin_blog_controller_1.AdminBlogController.getAll);
router.get("/create", admin_blog_controller_1.AdminBlogController.createForm);
router.post("/", admin_blog_controller_1.AdminBlogController.create);
router.get("/:id/edit", admin_blog_controller_1.AdminBlogController.editForm);
router.put("/:id", admin_blog_controller_1.AdminBlogController.update);
router.delete("/:id", admin_blog_controller_1.AdminBlogController.delete);
exports.default = router;
//# sourceMappingURL=blog.route.js.map