import { Router } from 'express';
import UserController from './controllers/user';
import TaskController from './controllers/task';
import authMiddleware from './middleware/auth';

const router = Router();

router.post('/users', UserController.create_user);
router.post('/sign-in', UserController.sign_in);

router.use(authMiddleware);

router.post('/tasks', TaskController.create_task);
router.patch('/tasks/:id', TaskController.edit_task);
router.delete('/tasks/:id', TaskController.delete_task);
router.get('/tasks', TaskController.list_task);

export default router;
