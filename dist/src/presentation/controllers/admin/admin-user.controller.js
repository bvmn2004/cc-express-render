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
exports.AdminUserController = void 0;
const auth_repository_1 = require("../../../infrastructure/repositories/auth.repository");
const auth_service_1 = require("../../../application/auth.service");
const repo = new auth_repository_1.AuthRepository();
const authService = new auth_service_1.AuthService();
class AdminUserController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield repo.getAllUsers();
                res.render('areas/admin/user/list', { layout: 'admin-layout', title: 'Users', users });
            }
            catch (err) {
                res.status(500).send(err.message || 'Error');
            }
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('areas/admin/user/create', { layout: 'admin-layout', title: 'Create User' });
        });
    }
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, full_name, role, password } = req.body;
                if (!email || !password)
                    return res.status(400).send('Email and password required');
                // hash password using auth service
                const hashed = authService.register ? undefined : undefined;
                // reuse auth service register to create user with hashed password
                // AuthService.register already checks existing email, so call repository directly here with hashed password
                const hashedPassword = authService.constructor ? authService._hashPassword ? authService._hashPassword(password) : undefined : undefined;
                // The AuthService does not expose hash helper; use AuthService.register instead to create and get user without exposing password logic
                try {
                    const user = yield authService.register(email, password, full_name);
                    // After register, update role if provided and not 'customer'
                    if (role && role !== 'customer') {
                        yield repo.updateUser(user.id, { role });
                    }
                    return res.redirect('/admin/users');
                }
                catch (e) {
                    return res.status(400).render('areas/admin/user/create', { layout: 'admin-layout', title: 'Create User', error: e.message });
                }
            }
            catch (err) {
                return res.status(500).send(err.message || 'Error');
            }
        });
    }
    static edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const user = yield repo.getById(id);
                if (!user)
                    return res.status(404).send('User not found');
                res.render('areas/admin/user/edit', { layout: 'admin-layout', title: 'Edit User', user });
            }
            catch (err) {
                res.status(500).send(err.message || 'Error');
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const { email, full_name, role, password } = req.body;
                const updateData = { email, full_name, role };
                if (password && password.length > 0) {
                    // hash password via register logic: reuse AuthService.register hash function by calling internal code
                    // Simpler: create temporary user via AuthService.register isn't appropriate. Implement hashing here.
                    const crypto = yield import('crypto');
                    const salt = crypto.randomBytes(16).toString('hex');
                    const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
                    updateData.password = `${salt}:${derived}`;
                }
                yield repo.updateUser(id, updateData);
                return res.redirect('/admin/users');
            }
            catch (err) {
                return res.status(500).send(err.message || 'Error');
            }
        });
    }
    static remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                yield repo.deleteUser(id);
                return res.redirect('/admin/users');
            }
            catch (err) {
                return res.status(500).send(err.message || 'Error');
            }
        });
    }
}
exports.AdminUserController = AdminUserController;
//# sourceMappingURL=admin-user.controller.js.map