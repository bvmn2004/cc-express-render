import { Router } from "express";
import { AdminCategoryController } from "../../controllers/admin/admin-category.controller";

const router = Router();

router.get("/", AdminCategoryController.getAll);
router.get("/create", AdminCategoryController.createForm);
router.post("/create", AdminCategoryController.create);
router.get("/:id/edit", AdminCategoryController.editForm);
router.post("/:id/update", AdminCategoryController.update);
router.post("/:id/delete", AdminCategoryController.delete);

export default router;