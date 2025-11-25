import { Request, Response } from "express";
import { CategoryService } from "../../../application/category.service";

const categoryService = new CategoryService();

export class AdminCategoryController {
    // List categories
    static async getAll(req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories();
            res.render("areas/admin/category/list", {
                layout: "admin-layout",
                title: "Manage Categories",
                categories,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Render form create
    static async createForm(req: Request, res: Response) {
        try {
            res.render("areas/admin/category/create", {
                layout: "admin-layout",
                title: "Create Category",
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Create category
    static async create(req: Request, res: Response) {
        try {
            const { name } = req.body;
            await categoryService.createCategory(name);
            res.redirect("/admin/categories");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Render form edit
    static async editForm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(Number(id));
            if (!category) return res.status(404).send("Category not found");

            res.render("areas/admin/category/edit", {
                layout: "admin-layout",
                title: "Edit Category",
                category,
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Update category
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await categoryService.updateCategory(Number(id), name);
            res.redirect("/admin/categories");
        } catch (error) {
            res.status(500).send(error);
        }
    }

    // Delete category
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(Number(id));
            res.redirect("/admin/categories");
        } catch (error) {
            res.status(500).send(error);
        }
    }
}