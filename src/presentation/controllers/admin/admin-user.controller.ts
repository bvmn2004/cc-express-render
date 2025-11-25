import { Request, Response } from 'express';
import { AuthRepository } from '../../../infrastructure/repositories/auth.repository';

import { AuthService } from '../../../application/auth.service';

const repo = new AuthRepository();
const authService = new AuthService();

export class AdminUserController {
    static async list(req: Request, res: Response) {
        try {
            const users = await repo.getAllUsers();
            res.render('areas/admin/user/list', { layout: 'admin-layout', title: 'Users', users });
        } catch (err: any) {
            res.status(500).send(err.message || 'Error');
        }
    }

    static async create(req: Request, res: Response) {
        res.render('areas/admin/user/create', { layout: 'admin-layout', title: 'Create User' });
    }

    static async store(req: Request, res: Response) {
        try {
            const { email, full_name, role, password } = req.body;
            if (!email || !password) return res.status(400).send('Email and password required');
            // hash password using auth service
            const hashed = (authService as any).register ? undefined : undefined;
            // reuse auth service register to create user with hashed password
            // AuthService.register already checks existing email, so call repository directly here with hashed password
            const hashedPassword = (authService as any).constructor ? (authService as any)._hashPassword ? (authService as any)._hashPassword(password) : undefined : undefined;
            // The AuthService does not expose hash helper; use AuthService.register instead to create and get user without exposing password logic
            try {
                const user = await authService.register(email, password, full_name);
                // After register, update role if provided and not 'customer'
                if (role && role !== 'customer') {
                    await repo.updateUser(user.id, { role });
                }
                return res.redirect('/admin/users');
            } catch (e: any) {
                return res.status(400).render('areas/admin/user/create', { layout: 'admin-layout', title: 'Create User', error: e.message });
            }
        } catch (err: any) {
            return res.status(500).send(err.message || 'Error');
        }
    }

    static async edit(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const user = await repo.getById(id);
            if (!user) return res.status(404).send('User not found');
            res.render('areas/admin/user/edit', { layout: 'admin-layout', title: 'Edit User', user });
        } catch (err: any) {
            res.status(500).send(err.message || 'Error');
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { email, full_name, role, password } = req.body;
            const updateData: any = { email, full_name, role };
            if (password && password.length > 0) {
                // hash password via register logic: reuse AuthService.register hash function by calling internal code
                // Simpler: create temporary user via AuthService.register isn't appropriate. Implement hashing here.
                const crypto = await import('crypto');
                const salt = crypto.randomBytes(16).toString('hex');
                const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
                updateData.password = `${salt}:${derived}`;
            }
            await repo.updateUser(id, updateData);
            return res.redirect('/admin/users');
        } catch (err: any) {
            return res.status(500).send(err.message || 'Error');
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await repo.deleteUser(id);
            return res.redirect('/admin/users');
        } catch (err: any) {
            return res.status(500).send(err.message || 'Error');
        }
    }
}
