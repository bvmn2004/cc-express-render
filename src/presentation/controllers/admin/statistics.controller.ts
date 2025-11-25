import { Request, Response } from "express";
import { StatisticsService } from "../../../application/statistics.service";

const service = new StatisticsService();

export class StatisticsController {

    async index(req: Request, res: Response) {
        const stats = await service.getDashboardStatistics();

        res.render("areas/admin/statistics/index", {
            layout: "admin-layout",
            stats
        });
    }
}
