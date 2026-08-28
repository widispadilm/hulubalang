import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function upsertInternalUser(email: string, name: string, role: any, password = 'password123') {
  const passwordHash = await bcrypt.hash(password, 10);
  return prisma.internalUser.upsert({
    where: { email },
    update: {},
    create: { email, name, role, passwordHash },
  });
}

async function main() {
  const poolBekasi = await prisma.pool.upsert({
    where: { id: 'seed-pool-bekasi' },
    update: {},
    create: { id: 'seed-pool-bekasi', name: 'Pool Bekasi (Pusat)', address: 'Jl. Raya Kalimalang No.40, Bekasi Timur' },
  });
  const poolSurabaya = await prisma.pool.upsert({
    where: { id: 'seed-pool-surabaya' },
    update: {},
    create: { id: 'seed-pool-surabaya', name: 'Pool Surabaya', address: 'Kawasan Industri Rungkut, Surabaya' },
  });

  const admin = await upsertInternalUser('admin@pss.co.id', 'Admin PSS', 'ADMIN');
  await upsertInternalUser('marketing@pss.co.id', 'Marketing PSS', 'MARKETING');
  const operation = await upsertInternalUser('operation@pss.co.id', 'Operation PSS', 'OPERATION');
  await upsertInternalUser('finance@pss.co.id', 'Finance PSS', 'FINANCE');
  await upsertInternalUser('management@pss.co.id', 'Management PSS', 'MANAGEMENT');
  const driver1 = await upsertInternalUser('driver1@pss.co.id', 'Budi (Driver)', 'DRIVER');
  await upsertInternalUser('driver2@pss.co.id', 'Slamet (Driver)', 'DRIVER');
  const keeper1 = await upsertInternalUser('keeper.bekasi@pss.co.id', 'Joko (Penjaga Pool Bekasi)', 'POOL_KEEPER');
  await upsertInternalUser('keeper.surabaya@pss.co.id', 'Wati (Penjaga Pool Surabaya)', 'POOL_KEEPER');

  await prisma.pool.update({
    where: { id: poolBekasi.id },
    data: { keepers: { connect: [{ id: keeper1.id }] } },
  });
  await prisma.pool.update({
    where: { id: poolSurabaya.id },
    data: { keepers: { connect: [{ id: (await prisma.internalUser.findUniqueOrThrow({ where: { email: 'keeper.surabaya@pss.co.id' } })).id }] } },
  });

  await prisma.customer.upsert({
    where: { email: 'customer@abc.co.id' },
    update: {},
    create: {
      companyName: 'PT ABC Contoh',
      pic: 'Andi Wijaya',
      email: 'customer@abc.co.id',
      phone: '081234567890',
    },
  });

  console.log('Seed selesai.');
  console.log('Internal users (password default: password123):');
  console.log('  admin@pss.co.id, marketing@pss.co.id, operation@pss.co.id, finance@pss.co.id, management@pss.co.id');
  console.log('  driver1@pss.co.id, driver2@pss.co.id, keeper.bekasi@pss.co.id, keeper.surabaya@pss.co.id');
  console.log('Customer (login via OTP): customer@abc.co.id');
  void admin;
  void operation;
  void driver1;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
