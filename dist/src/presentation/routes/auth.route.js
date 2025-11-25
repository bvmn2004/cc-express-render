"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = (0, express_1.Router)();
authRouter.get('/register', auth_controller_1.default.showRegister);
authRouter.post('/register', auth_controller_1.default.register);
authRouter.get('/login', auth_controller_1.default.showLogin);
authRouter.post('/login', auth_controller_1.default.login);
authRouter.get('/logout', auth_controller_1.default.logout);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map