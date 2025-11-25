import { Request, Response } from "express";
import { BlogService } from "../../../application/blog.service";
import { ProductService } from "../../../application/product.service";

const blogService = new BlogService();
const productService = new ProductService();

export class AdminBlogController {
    static async getAll(req: Request, res: Response) {
        try {
            const blogs = await blogService.getAll();
            res.render("areas/admin/blog/list", {
                layout: "admin-layout",
                title: "Manage Blogs",
                blogs,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async createForm(req: Request, res: Response) {
        try {
            const products = await productService.getProducts();
            res.render("areas/admin/blog/create", {
                layout: "admin-layout",
                title: "Create Blog",
                products,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const { title, content, product_id } = req.body;
            if (!title || !content) {
                return res.status(400).send("Title and content are required");
            }
            const productId = Number(product_id);
            if (!productId || isNaN(productId)) {
                return res.status(400).send("Please select a valid product");
            }
            const blog = await blogService.create({ title, content, product_id: productId });
            console.log("Blog created successfully:", blog);
            res.redirect("/admin/blogs");
        } catch (error: any) {
            console.error("Error creating blog:", error);
            res.status(500).send(`Error: ${error.message || "Internal server error"}`);
        }
    }

    static async editForm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const blog = await blogService.getById(Number(id));
            if (!blog) return res.status(404).send("Blog not found");

            const products = await productService.getProducts();

            res.render("areas/admin/blog/edit", {
                layout: "admin-layout",
                title: "Edit Blog",
                blog,
                products,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, content, product_id } = req.body;
            if (!title || !content) {
                return res.status(400).send("Title and content are required");
            }
            const productId = Number(product_id);
            if (!productId || isNaN(productId)) {
                return res.status(400).send("Please select a valid product");
            }

            const blog = await blogService.update(Number(id), { title, content, product_id: productId });
            console.log("Blog updated successfully:", blog);
            res.redirect("/admin/blogs");
        } catch (error: any) {
            console.error("Error updating blog:", error);
            res.status(500).send(`Error: ${error.message || "Internal server error"}`);
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const blogId = Number(id);
            if (!blogId || isNaN(blogId)) {
                return res.status(400).send("Invalid blog ID");
            }
            await blogService.delete(blogId);
            res.redirect("/admin/blogs");
        } catch (error: any) {
            console.error("Error deleting blog:", error);
            res.status(500).send(`Error: ${error.message || "Internal server error"}`);
        }
    }
}

