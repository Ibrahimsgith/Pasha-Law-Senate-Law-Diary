import { Router } from 'express';
import { prisma } from '../utils/prismaClient.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (_req, res, next) => {
  try {
    const advocates = await prisma.advocate.findMany({ include: { cases: true } });
    res.json(advocates);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['ADMIN']), async (req, res, next) => {
  try {
    const advocate = await prisma.advocate.create({ data: req.body });
    res.status(201).json(advocate);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize(['ADMIN']), async (req, res, next) => {
  try {
    const advocate = await prisma.advocate.update({ where: { id: Number(req.params.id) }, data: req.body });
    res.json(advocate);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize(['ADMIN']), async (req, res, next) => {
  try {
    await prisma.advocate.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
