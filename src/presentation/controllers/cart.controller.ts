import { Request, Response } from "express";
import { CartService } from "../../application/cart.service";
import pool from "../../infrastructure/database/db";

const cartService = new CartService();

export class CartController {
    // static async add(req: Request, res: Response) {
    //     try {
    //         const { slug } = req.params;
    //         const userId = req.body.session.userId || 1; // giả lập login user #1
    //         const product = await pool.query("SELECT * FROM products WHERE slug = $1", [slug]);

    //         if (product.rows.length === 0) {
    //             return res.status(404).send("Product not found");
    //         }

    //         await cartService.addToCart(userId, product.rows[0].id, 1);
    //         res.redirect("/cart");
    //     } catch (error: any) {
    //         res.status(500).send(error.message);
    //     }
    // }

    static async add(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            const session = req.session as any;
            const user = session.user;

            if (!user || !user.id) {
                // If user is not logged in, redirect to login
                return res.redirect("/auth/login");
            }

            // Get product from database
            const product = await pool.query("SELECT * FROM products WHERE slug = $1", [slug]);

            if (!product || product.rows.length === 0) {
                return res.redirect('/');
            }

            // Add to cart using database
            await cartService.addToCart(user.id, product.rows[0].id, 1);

            return res.redirect(`/product/${slug}`);
        } catch (error: any) {
            console.error("Error adding to cart:", error);
            return res.status(500).redirect('/');
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const slug = req.params.slug;
            const session = req.session as any;
            const user = session.user;

            if (!user || !user.id) {
                return res.redirect("/auth/login");
            }

            // Remove from cart using database
            await cartService.removeFromCart(user.id, slug);

            return res.redirect("/cart");
        } catch (error: any) {
            console.error("Error removing from cart:", error);
            res.status(500).send(error.message);
        }
    }

    static async index(req: Request, res: Response) {
        try {
            const session = req.session as any;
            const user = session.user;

            if (!user || !user.id) {
                // If user is not logged in, show empty cart or redirect to login
                return res.render("areas/client/cart", {
                    layout: "default-layout",
                    title: "Your Cart",
                    items: [],
                });
            }

            const items = await cartService.getCart(user.id);

            res.render("areas/client/cart", {
                layout: "default-layout",
                title: "Your Cart",
                items,
            });
        } catch (error: any) {
            console.error("Error loading cart:", error);
            res.status(500).send(error.message);
        }
    }
}