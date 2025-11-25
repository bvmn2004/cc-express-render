import { Request, Response } from "express";
import { AuthService } from "../../application/auth.service";

const authService = new AuthService();

class AuthController {
	static async showRegister(req: Request, res: Response) {
		res.render('areas/client/auth/register', { layout: 'auth-layout', title: 'Register' });
	}

	static async register(req: Request, res: Response) {
		try {
			const { email, password, confirm_password, full_name } = req.body;
			if (!email || !password || !confirm_password) {
				throw new Error('Vui lòng điền đầy đủ thông tin');
			}
			if (password !== confirm_password) {
				throw new Error('Mật khẩu xác nhận không khớp');
			}
			const user = await authService.register(email, password, full_name);
			// create session
			(req.session as any).user = { id: user.id, email: user.email, role: user.role, full_name: user.full_name };
			// redirect based on role: admin -> /admin, normal user -> /
			if (user.role === 'admin') return res.redirect('/admin');
			return res.redirect('/');
		} catch (error: any) {
			res.status(400).render('areas/client/auth/register', { layout: 'auth-layout', error: error.message });
		}
	}

	static async showLogin(req: Request, res: Response) {
		res.render('areas/client/auth/login', { layout: 'auth-layout', title: 'Login' });
	}

	static async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;
			const user = await authService.login(email, password);
			if (!user) {
				return res.status(401).render('areas/client/auth/login', { layout: 'auth-layout', error: 'Invalid credentials' });
			}
			(req.session as any).user = { id: user.id, email: user.email, role: user.role, full_name: user.full_name };
			// redirect based on role: admin -> /admin, normal user -> /
			if (user.role === 'admin') return res.redirect('/admin');
			return res.redirect('/');
		} catch (error: any) {
			res.status(500).render('areas/client/auth/login', { layout: 'auth-layout', error: error.message });
		}
	}

	static async logout(req: Request, res: Response) {
		req.session.destroy((err: any) => {
			// Clear session cookie to ensure complete logout
			res.clearCookie('connect.sid');
			res.redirect('/');
		});
	}
}

export default AuthController;