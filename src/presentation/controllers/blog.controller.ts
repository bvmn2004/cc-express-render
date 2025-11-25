import { Request, Response } from 'express';
import { BlogService } from '../../application/blog.service';
import { ProductService } from '../../application/product.service';

const blogService = new BlogService();
const productService = new ProductService();

export const BlogController = {
  // PUBLIC
  async list(req: Request, res: Response) {
    const blogs = await blogService.getAll();
    // Strip HTML tags and limit preview length
    const blogsWithPreview = blogs.map((blog: any) => {
      const plainText = blog.content ? blog.content.replace(/<[^>]*>/g, '') : '';
      return {
        ...blog,
        content_preview: plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText
      };
    });
    res.render('areas/client/blogs', { blogs: blogsWithPreview });
  },

  async detail(req: Request, res: Response) {
    const id = Number(req.params.id);
    const blog = await blogService.getById(id);
    if (!blog) return res.status(404).render('404');
    res.render('areas/client/blog-detail', { blog });
  },

  // ADMIN
  async adminList(req: Request, res: Response) {
    const blogs = await blogService.getAll();
    res.render('areas/admin/blog/list', { blogs });
  },

  async adminCreateGET(req: Request, res: Response) {
    const products = await productService.getProducts();
    res.render('areas/admin/blog/create', { products });
  },

  async adminCreatePOST(req: Request, res: Response) {
    const { title, content, product_id } = req.body;
    const productId = Number(product_id);
    if (!productId) return res.status(400).send('Vui lòng chọn sản phẩm liên quan');
    await blogService.create({ title, content, product_id: productId });
    res.redirect('/admin/blogs');
  },

  async adminEditGET(req: Request, res: Response) {
    const id = Number(req.params.id);
    const blog = await blogService.getById(id);
    if (!blog) return res.status(404).send('Not found');
    const products = await productService.getProducts();
    res.render('areas/admin/blog/edit', { blog, products });
  },

  async adminEditPOST(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, content, product_id } = req.body;
    const productId = Number(product_id);
    if (!productId) return res.status(400).send('Vui lòng chọn sản phẩm liên quan');
    await blogService.update(id, { title, content, product_id: productId });
    res.redirect('/admin/blogs');
  },

  async adminDelete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await blogService.delete(id);
    res.redirect('/admin/blogs');
  },
};
