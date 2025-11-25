// src/presentation/routes/admin/statistics.route.ts
import { Router } from "express";
import { StatisticsController } from "../../controllers/admin/statistics.controller";

const router = Router();
const controller = new StatisticsController();

router.get("/", controller.index.bind(controller));

export default router;
