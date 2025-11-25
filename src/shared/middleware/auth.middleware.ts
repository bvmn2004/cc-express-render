import { NextFunction, Request, Response } from "express";
import ResponseType from "../utils/response-type.util";
import jwt from 'jsonwebtoken';

// Existing JWT-based authentication (kept for API uses)
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json(new ResponseType("Token is required").error());
        return;
    }

    jwt.verify(token, 'secretkey123', (err: any, user: any) => {
        if (err) {
            return res.status(403).json(new ResponseType("Invalid token").error());
        }

        (req as any).user = user;
        next();
    });
};

// Session-based authentication for rendered pages
export const isAuthenticatedSession = (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as any;
    if (session && session.user) {
        return next();
    }
    return res.redirect('/auth/login');
};

export const isAdminSession = (req: Request, res: Response, next: NextFunction) => {
    const session = req.session as any;
    if (session && session.user && session.user.role === 'admin') {
        return next();
    }
    // nếu không phải admin, chuyển hướng về trang chủ
    return res.redirect('/');
};