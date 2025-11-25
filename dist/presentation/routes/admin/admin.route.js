"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const statistics_controller_1 = require("../../controllers/admin/statistics.controller");
const user_route_1 = __importDefault(require("./user.route"));
const router = (0, express_1.Router)();
const controller = new statistics_controller_1.StatisticsController();
router.get("/", controller.index.bind(controller));
// Admin -> /admin/users
router.use('/users', user_route_1.default);
exports.default = router;
//# sourceMappingURL=admin.route.js.map