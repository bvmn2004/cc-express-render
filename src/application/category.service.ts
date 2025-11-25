import { CategoryRepository } from "../infrastructure/repositories/category.repository";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAllCategories() {
        return this.categoryRepository.findAll();
    }

    async getCategoryForNavbar(limit: number = 2) {
        return this.categoryRepository.findTopCategories(limit);
    }

    async getCategoryById(id: number) {
        return this.categoryRepository.findById(id);
    }

    async createCategory(name: string) {
        if (!name || name.trim() === "") {
            throw new Error("Category name cannot be empty");
        }
        return this.categoryRepository.create(name);
    }

    async updateCategory(id: number, name: string) {
        return this.categoryRepository.update(id, name);
    }

    async deleteCategory(id: number) {
        return this.categoryRepository.delete(id);
    }
}