import { Router } from 'express';
import { prisma } from '../utils/prismaClient.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (_req, res, next) => {
  try {
    const cases = await prisma.caseFile.findMany({
      include: {
        advocate: true,
        client: true,
        diaryEntries: {
          include: { createdBy: true }
        },
        schedules: {
          include: { reminders: true }
        }
      }
    });
    res.json(cases);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const caseFile = await prisma.caseFile.create({ data: req.body });
    res.status(201).json(caseFile);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const caseFile = await prisma.caseFile.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(caseFile);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize(['ADMIN']), async (req, res, next) => {
  try {
    await prisma.caseFile.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
