"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../../application/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    static showRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('areas/client/auth/register', { layout: 'auth-layout', title: 'Register' });
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, confirm_password, full_name } = req.body;
                if (!email || !password || !confirm_password) {
                    throw new Error('Vui lòng điền đầy đủ thông tin');
                }
                if (password !== confirm_password) {
                    throw new Error('Mật khẩu xác nhận không khớp');
                }
                const user = yield authService.register(email, password, full_name);
                // create session
                req.session.user = { id: user.id, email: user.email, role: user.role, full_name: user.full_name };
                // redirect based on role: admin -> /admin, normal user -> /
                if (user.role === 'admin')
                    return res.redirect('/admin');
                return res.redirect('/');
            }
            catch (error) {
                res.status(400).render('areas/client/auth/register', { layout: 'auth-layout', error: error.message });
            }
        });
    }
    static showLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('areas/client/auth/login', { layout: 'auth-layout', title: 'Login' });
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield authService.login(email, password);
                if (!user) {
                    return res.status(401).render('areas/client/auth/login', { layout: 'auth-layout', error: 'Invalid credentials' });
                }
                req.session.user = { id: user.id, email: user.email, role: user.role, full_name: user.full_name };
                // redirect based on role: admin -> /admin, normal user -> /
                if (user.role === 'admin')
                    return res.redirect('/admin');
                return res.redirect('/');
            }
            catch (error) {
                res.status(500).render('areas/client/auth/login', { layout: 'auth-layout', error: error.message });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.destroy((err) => {
                // Clear session cookie to ensure complete logout
                res.clearCookie('connect.sid');
                res.redirect('/');
            });
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map