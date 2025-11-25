import { AuthRepository } from "../infrastructure/repositories/auth.repository";
import crypto from "crypto";

const repo = new AuthRepository();

function hashPassword(password: string) {
	const salt = crypto.randomBytes(16).toString('hex');
	const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
	return `${salt}:${derived}`;
}

function verifyPassword(stored: string, password: string) {
	const [salt, key] = stored.split(':');
	if (!salt || !key) return false;
	const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
	return crypto.timingSafeEqual(Buffer.from(derived, 'hex'), Buffer.from(key, 'hex'));
}

export class AuthService {
	async register(email: string, password: string, full_name?: string) {
		const existing = await repo.findByEmail(email);
		if (existing) {
			throw new Error('Email already registered');
		}

		const hashed = hashPassword(password);
		const user = await repo.createUser({ email, password: hashed, full_name });
		// hide password
		if (user) delete user.password;
		return user;
	}

	async login(email: string, password: string) {
		const user = await repo.findByEmail(email);
		if (!user) return null;
		const stored = user.password;
		if (!stored) return null;
		const ok = verifyPassword(stored, password);
		if (!ok) return null;
		delete user.password;
		return user;
	}
}