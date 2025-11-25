import { Router } from 'express';
import { BlogController } from '../../controllers/blog.controller';

const router = Router();

router.get('/', BlogController.list);
router.get('/:id', BlogController.detail);

export default router;
