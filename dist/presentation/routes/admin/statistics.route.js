"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/presentation/routes/admin/statistics.route.ts
const express_1 = require("express");
const statistics_controller_1 = require("../../controllers/admin/statistics.controller");
const router = (0, express_1.Router)();
const controller = new statistics_controller_1.StatisticsController();
router.get("/", controller.index.bind(controller));
exports.default = router;
//# sourceMappingURL=statistics.route.js.map