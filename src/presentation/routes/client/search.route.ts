import { Router } from "express";
import { SearchController } from "../../controllers/search.controller";

const router = Router();
router.get("/", SearchController.index);
router.get("/:category", SearchController.getAllProductsByCategory);

export default router;