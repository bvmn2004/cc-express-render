"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../../controllers/search.controller");
const router = (0, express_1.Router)();
router.get("/", search_controller_1.SearchController.index);
router.get("/:category", search_controller_1.SearchController.getAllProductsByCategory);
exports.default = router;
//# sourceMappingURL=search.route.js.map