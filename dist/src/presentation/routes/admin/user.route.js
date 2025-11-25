"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_user_controller_1 = require("../../controllers/admin/admin-user.controller");
const router = (0, express_1.Router)();
router.get('/', admin_user_controller_1.AdminUserController.list);
router.get('/create', admin_user_controller_1.AdminUserController.create);
router.post('/create', admin_user_controller_1.AdminUserController.store);
router.get('/:id/edit', admin_user_controller_1.AdminUserController.edit);
router.post('/:id/update', admin_user_controller_1.AdminUserController.update);
router.post('/:id/delete', admin_user_controller_1.AdminUserController.remove);
exports.default = router;
//# sourceMappingURL=user.route.js.map