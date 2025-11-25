import { Router } from "express";
import { AdminProductController } from "../../controllers/admin/admin-product.controller";

const router = Router();

router.get("/", AdminProductController.getAll);

router.get("/create", AdminProductController.createForm);
router.post("/", AdminProductController.create);

router.get("/:id/edit", AdminProductController.editForm);
router.put("/:id", AdminProductController.update);

router.delete("/:id", AdminProductController.delete);

export default router;