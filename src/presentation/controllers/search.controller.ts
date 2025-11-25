import { Request, Response } from "express";
import { CategoryService } from "../../application/category.service";
import { ProductService } from "../../application/product.service";

const productService = new ProductService();
const categoryService = new CategoryService();

export class SearchController {
    static async index(req: Request, res: Response) {
        try {
            const products = await productService.getProducts();
            const categories = await categoryService.getAllCategories();

            res.render("areas/client/search", {
                layout: "default-layout",
                title: "Search - Luka Store",
                products,
                categories,
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    static async getAllProductsByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params;

            const products = await productService.getProductsByCategorySlug(category);
            const categories = await categoryService.getAllCategories();

            res.render("areas/client/search", {
                layout: "default-layout",
                title: `${category.toUpperCase()} - Luka Store`,
                products,
                categories,
                activeCategory: category,
            });
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }
}