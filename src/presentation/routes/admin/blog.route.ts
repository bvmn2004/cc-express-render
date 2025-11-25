import { Router } from "express";
import { AdminBlogController } from "../../controllers/admin/admin-blog.controller";

const router = Router();

router.get("/", AdminBlogController.getAll);

router.get("/create", AdminBlogController.createForm);
router.post("/", AdminBlogController.create);

router.get("/:id/edit", AdminBlogController.editForm);
router.put("/:id", AdminBlogController.update);

router.delete("/:id", AdminBlogController.delete);

export default router;
