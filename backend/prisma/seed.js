import { prisma } from '../src/utils/prismaClient.js';
import bcrypt from 'bcryptjs';

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@senatelaw.test' },
    update: {},
    create: {
      email: 'admin@senatelaw.test',
      password,
      role: 'ADMIN',
      fullName: 'Admin User'
    }
  });

  const advocateUser = await prisma.user.upsert({
    where: { email: 'advocate@senatelaw.test' },
    update: {},
    create: {
      email: 'advocate@senatelaw.test',
      password,
      role: 'ADVOCATE',
      fullName: 'Advocate Ayesha'
    }
  });

  const advocate = await prisma.advocate.upsert({
    where: { userId: advocateUser.id },
    update: {},
    create: {
      userId: advocateUser.id,
      barNumber: 'BR-2024-001',
      phone: '+1-202-555-0101',
      specialization: 'Corporate Litigation'
    }
  });

  await prisma.user.upsert({
    where: { email: 'paralegal@senatelaw.test' },
    update: {},
    create: {
      email: 'paralegal@senatelaw.test',
      password,
      role: 'PARALEGAL',
      fullName: 'Paralegal Patel'
    }
  });

  const client = await prisma.client.upsert({
    where: { id: 1 },
    update: {},
    create: {
      fullName: 'Client Chambers',
      email: 'client@business.com',
      phone: '+1-202-555-0199',
      address: '123 Business Ave, Suite 400'
    }
  });

  const caseFile = await prisma.caseFile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Chambers v. City',
      description: 'Dispute regarding zoning permissions',
      status: 'ACTIVE',
      court: 'District Court',
      nextHearing: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      advocateId: advocate.id,
      clientId: client.id
    }
  });

  const schedule = await prisma.schedule.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Pre-hearing conference',
      description: 'Review evidence and prepare strategy',
      start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60),
      caseId: caseFile.id,
      advocateId: advocate.id,
      reminders: {
        create: [
          {
            sendAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
            channel: 'EMAIL',
            message: 'Email reminder for pre-hearing conference'
          },
          {
            sendAt: new Date(Date.now() + 1000 * 60 * 60 * 22),
            channel: 'IN_APP',
            message: 'In-app nudge to review evidence'
          }
        ]
      }
    }
  });

  await prisma.diaryEntry.upsert({
    where: { id: 1 },
    update: {},
    create: {
      caseId: caseFile.id,
      date: new Date(),
      notes: 'Consulted with client to review documents and outline next steps.',
      createdById: admin.id
    }
  });

  console.log('Seed data created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
