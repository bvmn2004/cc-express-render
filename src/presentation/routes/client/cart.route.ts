import { Router } from "express";
import { CartController } from "../../controllers/cart.controller";

const router = Router();

router.get("/", CartController.index);
router.post("/add/:slug", CartController.add);
router.post("/remove/:slug", CartController.remove);

export default router;