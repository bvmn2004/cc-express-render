import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.get('/register', AuthController.showRegister);
authRouter.post('/register', AuthController.register);

authRouter.get('/login', AuthController.showLogin);
authRouter.post('/login', AuthController.login);

authRouter.get('/logout', AuthController.logout);

export default authRouter;