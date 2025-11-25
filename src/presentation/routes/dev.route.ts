import { Router } from 'express';
import { AuthRepository } from '../../infrastructure/repositories/auth.repository';

const router = Router();
const repo = new AuthRepository();

// Dev: return current session user
router.get('/session', (req, res) => {
    if (process.env.NODE_ENV === 'production') return res.status(404).send('Not found');
    const session = req.session as any;
    return res.json({ sessionUser: session?.user || null });
});

// Dev: refresh session data from DB (useful after manual DB edits)
router.post('/refresh-session', async (req, res) => {
    if (process.env.NODE_ENV === 'production') return res.status(404).send('Not found');
    const session = req.session as any;
    if (!session || !session.user || !session.user.email) return res.status(400).json({ error: 'No session user' });
    try {
        const user = await repo.findByEmail(session.user.email);
        if (!user) return res.status(404).json({ error: 'User not found' });
        delete user.password;
        session.user = { id: user.id, email: user.email, role: user.role, full_name: user.full_name };
        return res.json({ updatedSession: session.user });
    } catch (err: any) {
        return res.status(500).json({ error: err.message || String(err) });
    }
});

export default router;
