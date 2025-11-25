"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminSession = exports.isAuthenticatedSession = exports.authenticateToken = void 0;
const response_type_util_1 = __importDefault(require("../utils/response-type.util"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Existing JWT-based authentication (kept for API uses)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json(new response_type_util_1.default("Token is required").error());
        return;
    }
    jsonwebtoken_1.default.verify(token, 'secretkey123', (err, user) => {
        if (err) {
            return res.status(403).json(new response_type_util_1.default("Invalid token").error());
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Session-based authentication for rendered pages
const isAuthenticatedSession = (req, res, next) => {
    const session = req.session;
    if (session && session.user) {
        return next();
    }
    return res.redirect('/auth/login');
};
exports.isAuthenticatedSession = isAuthenticatedSession;
const isAdminSession = (req, res, next) => {
    const session = req.session;
    if (session && session.user && session.user.role === 'admin') {
        return next();
    }
    // nếu không phải admin, chuyển hướng về trang chủ
    return res.redirect('/');
};
exports.isAdminSession = isAdminSession;
//# sourceMappingURL=auth.middleware.js.map