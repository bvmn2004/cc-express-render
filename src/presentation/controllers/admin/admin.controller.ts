import { Request, Response } from "express";

export class AdminController {
    static async index(req: Request, res: Response) {
        res.render('areas/admin/index', {
            layout: "admin-layout",
            title: "Luka Store Dashboard",
        })
    }
}