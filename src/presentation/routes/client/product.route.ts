import { Router } from "express";
import { ProductController } from "../../controllers/product.controller";

const router = Router();

router.get("/:slug", ProductController.getBySlug);

export default router;