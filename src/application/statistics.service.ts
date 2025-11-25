import { StatisticsRepository } from "../infrastructure/repositories/statistics.repository";

export class StatisticsService {
    private repo: StatisticsRepository;

    constructor() {
        this.repo = new StatisticsRepository();
    }

    async getDashboardStatistics() {
        return {
            totalRevenue: await this.repo.getTotalRevenue(),
            newOrders: await this.repo.getNewOrders(),
            activeProducts: await this.repo.getActiveProducts(),
            categories: await this.repo.getCategoriesCount()
        };
    }
}
