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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const auth_repository_1 = require("../infrastructure/repositories/auth.repository");
const crypto_1 = __importDefault(require("crypto"));
const repo = new auth_repository_1.AuthRepository();
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const derived = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return `${salt}:${derived}`;
}
function verifyPassword(stored, password) {
    const [salt, key] = stored.split(':');
    if (!salt || !key)
        return false;
    const derived = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return crypto_1.default.timingSafeEqual(Buffer.from(derived, 'hex'), Buffer.from(key, 'hex'));
}
class AuthService {
    register(email, password, full_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield repo.findByEmail(email);
            if (existing) {
                throw new Error('Email already registered');
            }
            const hashed = hashPassword(password);
            const user = yield repo.createUser({ email, password: hashed, full_name });
            // hide password
            if (user)
                delete user.password;
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield repo.findByEmail(email);
            if (!user)
                return null;
            const stored = user.password;
            if (!stored)
                return null;
            const ok = verifyPassword(stored, password);
            if (!ok)
                return null;
            delete user.password;
            return user;
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map