import { Router } from 'express';
import { AdminUserController } from '../../controllers/admin/admin-user.controller';

const router = Router();

router.get('/', AdminUserController.list);
router.get('/create', AdminUserController.create);
router.post('/create', AdminUserController.store);
router.get('/:id/edit', AdminUserController.edit);
router.post('/:id/update', AdminUserController.update);
router.post('/:id/delete', AdminUserController.remove);

export default router;
