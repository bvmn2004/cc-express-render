import { Router } from "express";
import { StatisticsController } from "../../controllers/admin/statistics.controller";
import { AdminController } from "../../controllers/admin/admin.controller";
import userRoutes from './user.route';

const router = Router();
const controller = new StatisticsController();
router.get("/", controller.index.bind(controller));
// Admin -> /admin/users
router.use('/users', userRoutes);
export default router;
