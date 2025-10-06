import { Router } from 'express';
import { prisma } from '../utils/prismaClient.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (_req, res, next) => {
  try {
    const schedules = await prisma.schedule.findMany({ include: { caseFile: true, reminders: true } });
    res.json(schedules);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const schedule = await prisma.schedule.create({ data: req.body });
    res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const schedule = await prisma.schedule.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(schedule);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize(['ADMIN']), async (req, res, next) => {
  try {
    await prisma.schedule.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
