import { Router } from 'express';
import { prisma } from '../utils/prismaClient.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (_req, res, next) => {
  try {
    const clients = await prisma.client.findMany({ include: { cases: true } });
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const client = await prisma.client.create({ data: req.body });
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const client = await prisma.client.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(client);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize(['ADMIN']), async (req, res, next) => {
  try {
    await prisma.client.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
