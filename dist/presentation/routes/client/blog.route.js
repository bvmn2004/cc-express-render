"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../../controllers/blog.controller");
const router = (0, express_1.Router)();
router.get('/', blog_controller_1.BlogController.list);
router.get('/:id', blog_controller_1.BlogController.detail);
exports.default = router;
//# sourceMappingURL=blog.route.js.map