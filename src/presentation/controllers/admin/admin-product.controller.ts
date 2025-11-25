import { Request, Response } from "express";
import { ProductService } from "../../../application/product.service";
import pool from "../../../infrastructure/database/db";

const productService = new ProductService();

export class AdminProductController {
    static async getAll(req: Request, res: Response) {
        try {
            const products = await productService.getProducts();
            res.render("areas/admin/product/list", {
                layout: "admin-layout",
                title: "Manage Products",
                products,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async createForm(req: Request, res: Response) {
        try {
            const categories = await pool.query("SELECT * FROM categories ORDER BY name ASC");
            res.render("areas/admin/product/create", {
                layout: "admin-layout",
                title: "Create Product",
                categories: categories.rows,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { name, price, description, category_id, stock_quantity, image_url } = req.body;
            
            // Validate required fields
            if (!name || !price || stock_quantity === undefined) {
                return res.status(400).send("Name, price, and stock quantity are required");
            }

            // Parse numeric values
            const parsedPrice = parseFloat(price);
            const parsedStockQuantity = parseInt(stock_quantity, 10);
            const parsedCategoryId = category_id ? parseInt(category_id, 10) : null;

            if (isNaN(parsedPrice) || parsedPrice <= 0) {
                return res.status(400).send("Invalid price");
            }

            if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
                return res.status(400).send("Invalid stock quantity");
            }

            const product = await productService.createProduct({
                name: name.trim(),
                price: parsedPrice,
                description: description?.trim() || null,
                category_id: parsedCategoryId,
                stock_quantity: parsedStockQuantity,
                image_url: image_url?.trim() || null,
            });

            console.log("Product created successfully:", product);
            res.redirect("/admin/products");
        } catch (error: any) {
            console.error("Error creating product:", error);
            res.status(500).send(`Error creating product: ${error.message || "Internal server error"}`);
        }
    }

    static async editForm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(Number(id));
            if (!product) return res.status(404).send("Product not found");

            const categories = await pool.query("SELECT * FROM categories ORDER BY name ASC");

            res.render("areas/admin/product/edit", {
                layout: "admin-layout",
                title: "Edit Product",
                product,
                categories: categories.rows,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, price, description, category_id, stock_quantity, image_url } = req.body;

            // Validate required fields
            if (!name || !price || stock_quantity === undefined) {
                return res.status(400).send("Name, price, and stock quantity are required");
            }

            // Parse numeric values
            const parsedPrice = parseFloat(price);
            const parsedStockQuantity = parseInt(stock_quantity, 10);
            const parsedCategoryId = category_id ? parseInt(category_id, 10) : null;

            if (isNaN(parsedPrice) || parsedPrice <= 0) {
                return res.status(400).send("Invalid price");
            }

            if (isNaN(parsedStockQuantity) || parsedStockQuantity < 0) {
                return res.status(400).send("Invalid stock quantity");
            }

            const product = await productService.updateProduct(Number(id), {
                name: name.trim(),
                price: parsedPrice,
                description: description?.trim() || null,
                category_id: parsedCategoryId,
                stock_quantity: parsedStockQuantity,
                image_url: image_url?.trim() || null,
            });

            if (!product) {
                return res.status(404).send("Product not found");
            }

            console.log("Product updated successfully:", product);
            res.redirect("/admin/products");
        } catch (error: any) {
            console.error("Error updating product:", error);
            res.status(500).send(`Error updating product: ${error.message || "Internal server error"}`);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await productService.deleteProduct(Number(id));
            res.redirect("/admin/products");
        } catch (error) {
            res.status(500).send(error);
        }
    }
}