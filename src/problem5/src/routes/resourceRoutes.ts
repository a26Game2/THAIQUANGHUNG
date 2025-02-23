import { Router } from 'express';
import { ResourceController } from '../controllers/resourceController';

export function createResourceRoutes(controller: ResourceController): Router {
  const router = Router();

  router.post('/', controller.create.bind(controller));
  router.get('/', controller.list.bind(controller));
  router.get('/:id', controller.get.bind(controller));
  router.put('/:id', controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
