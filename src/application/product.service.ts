import { Product, ProductRepository } from "../infrastructure/repositories/product.repository";

export class ProductService {
    private repo: ProductRepository;

    constructor() {
        this.repo = new ProductRepository();
    }

    async createProduct(product: Product) {
        return this.repo.create(product);
    }

    async getProducts() {
        return this.repo.findAll();
    }

    async getProductsByCategorySlug(slug: string) {
        return this.repo.findByCategorySlug(slug);
    }

    async getProductById(id: number) {
        return this.repo.findById(id);
    }

    async getProductBySlug(slug: string) {
        return this.repo.findBySlug(slug);
    }

    async updateProduct(id: number, product: Product) {
        return this.repo.update(id, product);
    }

    async deleteProduct(id: number) {
        return this.repo.delete(id);
    }
}