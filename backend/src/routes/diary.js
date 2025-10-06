import { Router } from 'express';
import { prisma } from '../utils/prismaClient.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const { date } = req.query;
    let where = {};
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      where = {
        date: {
          gte: start,
          lt: end
        }
      };
    }
    const entries = await prisma.diaryEntry.findMany({
      where,
      include: {
        caseFile: {
          include: { client: true, advocate: true }
        },
        createdBy: true
      },
      orderBy: { date: 'asc' }
    });
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const { createdById, ...payload } = req.body;
    const entry = await prisma.diaryEntry.create({
      data: {
        ...payload,
        createdById: req.user.userId
      }
    });
    res.status(201).json(entry);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize(['ADMIN', 'ADVOCATE']), async (req, res, next) => {
  try {
    const { createdById, ...payload } = req.body;
    const entry = await prisma.diaryEntry.update({
      where: { id: Number(req.params.id) },
      data: payload
    });
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize(['ADMIN']), async (req, res, next) => {
  try {
    await prisma.diaryEntry.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

export default router;
