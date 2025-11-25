"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_order_controller_1 = require("../../controllers/admin/admin-order.controller");
const router = (0, express_1.Router)();
router.get("/", admin_order_controller_1.AdminOrderController.list);
router.get("/:id", admin_order_controller_1.AdminOrderController.detail);
router.post("/:id/update-status", admin_order_controller_1.AdminOrderController.updateStatus);
exports.default = router;
//# sourceMappingURL=order.route.js.map