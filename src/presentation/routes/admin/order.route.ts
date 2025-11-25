import { Router } from "express";
import { AdminOrderController } from "../../controllers/admin/admin-order.controller";

const router = Router();

router.get("/", AdminOrderController.list);
router.get("/:id", AdminOrderController.detail);
router.post("/:id/update-status", AdminOrderController.updateStatus);

export default router;

