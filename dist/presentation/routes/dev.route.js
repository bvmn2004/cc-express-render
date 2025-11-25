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
const express_1 = require("express");
const auth_repository_1 = require("../../infrastructure/repositories/auth.repository");
const router = (0, express_1.Router)();
const repo = new auth_repository_1.AuthRepository();
// Dev: return current session user
router.get('/session', (req, res) => {
    if (process.env.NODE_ENV === 'production')
        return res.status(404).send('Not found');
    const session = req.session;
    return res.json({ sessionUser: (session === null || session === void 0 ? void 0 : session.user) || null });
});
// Dev: refresh session data from DB (useful after manual DB edits)
router.post('/refresh-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV === 'production')
        return res.status(404).send('Not found');
    const session = req.session;
    if (!session || !session.user || !session.user.email)
        return res.status(400).json({ error: 'No session user' });
    try {
        const user = yield repo.findByEmail(session.user.email);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        delete user.password;
        session.user = { id: user.id, email: user.email, role: user.role, full_name: user.full_name };
        return res.json({ updatedSession: session.user });
    }
    catch (err) {
        return res.status(500).json({ error: err.message || String(err) });
    }
}));
exports.default = router;
//# sourceMappingURL=dev.route.js.map