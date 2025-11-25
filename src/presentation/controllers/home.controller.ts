import { Request, Response } from "express";
import { ProductService } from "../../application/product.service";

const productService = new ProductService();

export class HomeController {
    static async index(req: Request, res: Response) {
        try {
            const products = await productService.getProducts();
            res.render("areas/client/home", {
                layout: "default-layout",
                title: "Luka Store",
                products,
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}