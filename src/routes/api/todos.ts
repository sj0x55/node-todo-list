import { Router } from 'express';
import { todosController } from '../../controllers/api/todos';
import { catchAsync } from '../../middlewares/app';

export default (): Router => {
  const router = Router();

  router.get('/', catchAsync(todosController.findAll));
  router.get('/:id', catchAsync(todosController.findOne));
  router.post('/', catchAsync(todosController.create));
  router.put('/:id', catchAsync(todosController.update));
  router.delete('/:id', catchAsync(todosController.remove));

  return router;
};
