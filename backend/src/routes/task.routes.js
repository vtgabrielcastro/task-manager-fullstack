import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import taskController from '../controllers/task.controller.js';

const router = Router();

// Todas as rotas de tasks são protegidas
router.use(authMiddleware);

router.post('/', taskController.create);
router.get('/', taskController.list);
router.patch('/:id', taskController.update);
router.delete('/:id', taskController.delete);

export default router;