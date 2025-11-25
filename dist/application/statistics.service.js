"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const statistics_repository_1 = require("../infrastructure/repositories/statistics.repository");
class StatisticsService {
    constructor() {
        this.repo = new statistics_repository_1.StatisticsRepository();
    }
    getDashboardStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                totalRevenue: yield this.repo.getTotalRevenue(),
                newOrders: yield this.repo.getNewOrders(),
                activeProducts: yield this.repo.getActiveProducts(),
                categories: yield this.repo.getCategoriesCount()
            };
        });
    }
}
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map