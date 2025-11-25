import { Request, Response } from "express";
import { ProductService } from "../../application/product.service";

const productService = new ProductService();

export class ProductController {
    static async getBySlug(req: Request, res: Response) {
        try {
            const { slug } = req.params;
            const products = await productService.getProducts();
            const product = await productService.getProductBySlug(slug);

            if (!product) {
                return res.status(404).render("errors/404", {
                    layout: "default-layout",
                    title: "Product Not Found",
                });
            }

            res.render("areas/client/product", {
                layout: "default-layout",
                title: `${product.name} - Luka Store`,
                products,
                product
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}