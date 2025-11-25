import { BlogRepository, BlogCreateInput, BlogUpdateInput } from '../infrastructure/repositories/blog.repository';
import { Blog } from '../domain/entities/blog';

export class BlogService {
    private blogRepository = new BlogRepository();

    async getAll(): Promise<Blog[]> {
        return this.blogRepository.findAll();
    }

    async getById(id: number): Promise<Blog | undefined> {
        return this.blogRepository.findById(id);
    }

    async create(data: BlogCreateInput): Promise<Blog> {
        return this.blogRepository.create(data);
    }

    async update(id: number, data: BlogUpdateInput): Promise<Blog> {
        return this.blogRepository.update(id, data);
    }

    async delete(id: number): Promise<void> {
        await this.blogRepository.delete(id);
    }
}
