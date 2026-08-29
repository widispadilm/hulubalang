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
  const driver2 = await upsertInternalUser('driver2@pss.co.id', 'Slamet (Driver)', 'DRIVER');
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

  const customer = await prisma.customer.upsert({
    where: { email: 'customer@abc.co.id' },
    update: {},
    create: {
      companyName: 'PT ABC Contoh',
      pic: 'Andi Wijaya',
      email: 'customer@abc.co.id',
      phone: '081234567890',
    },
  });

  // --- Seed Data Skenario ---
  // 1. Order PENDING (Untuk skenario Marketing validasi order)
  await prisma.order.upsert({
    where: { orderNumber: 'ORD-PENDING-001' },
    update: {},
    create: {
      orderNumber: 'ORD-PENDING-001',
      customerId: customer.id,
      pic: 'Bapak Budi (Skenario Marketing)',
      originCity: 'Jakarta',
      destinationCity: 'Bandung',
      requestPickupDate: new Date(),
      status: 'PENDING',
      trips: {
        create: [
          {
            tripNumber: 'TRP-PENDING-001-A',
            shipmentType: 'TOWING',
            vehicleBrand: 'Toyota',
            vehicleModel: 'Avanza',
            plateNumber: 'B 1234 ABC',
            chassisNumber: 'MHF1234567',
            engineNumber: '1NR123456',
            status: 'REQUESTED'
          }
        ]
      }
    }
  });

  // 2. Order CONFIRMED (Untuk skenario Operation assign driver)
  await prisma.order.upsert({
    where: { orderNumber: 'ORD-CONFIRMED-002' },
    update: {},
    create: {
      orderNumber: 'ORD-CONFIRMED-002',
      customerId: customer.id,
      pic: 'Bapak Joko (Skenario Operation)',
      originCity: 'Surabaya',
      destinationCity: 'Semarang',
      requestPickupDate: new Date(),
      status: 'CONFIRMED',
      trips: {
        create: [
          {
            tripNumber: 'TRP-CONFIRMED-002-A',
            shipmentType: 'SELF_DRIVE',
            vehicleBrand: 'Honda',
            vehicleModel: 'Civic',
            plateNumber: 'L 9999 XYZ',
            chassisNumber: 'MHF9999999',
            engineNumber: 'R18999999',
            status: 'REQUESTED'
          }
        ]
      }
    }
  });

  // 3. Trip ASSIGNED (Untuk skenario Driver 1 eksekusi pickup)
  await prisma.order.upsert({
    where: { orderNumber: 'ORD-ASSIGNED-003' },
    update: {},
    create: {
      orderNumber: 'ORD-ASSIGNED-003',
      customerId: customer.id,
      pic: 'Ibu Siti (Skenario Driver)',
      originCity: 'Bekasi',
      destinationCity: 'Cirebon',
      requestPickupDate: new Date(),
      status: 'CONFIRMED',
      trips: {
        create: [
          {
            tripNumber: 'TRP-ASSIGNED-003-A',
            shipmentType: 'TOWING',
            vehicleBrand: 'Mitsubishi',
            vehicleModel: 'Pajero',
            plateNumber: 'B 8888 XX',
            chassisNumber: 'MHF888888',
            engineNumber: '4N1588888',
            status: 'ASSIGNED',
            driverId: driver1.id,
            assignedById: operation.id
          }
        ]
      }
    }
  });

  // 4. Trip REPORTED di Pool Bekasi (Untuk skenario Penjaga Pool verifikasi)
  await prisma.order.upsert({
    where: { orderNumber: 'ORD-REPORTED-004' },
    update: {},
    create: {
      orderNumber: 'ORD-REPORTED-004',
      customerId: customer.id,
      pic: 'Bapak Agus (Skenario Pool Keeper)',
      originCity: 'Jakarta',
      destinationCity: 'Surabaya',
      requestPickupDate: new Date(),
      status: 'CONFIRMED',
      trips: {
        create: [
          {
            tripNumber: 'TRP-REPORTED-004-A',
            shipmentType: 'TOWING',
            vehicleBrand: 'Suzuki',
            vehicleModel: 'Ertiga',
            plateNumber: 'B 7777 YY',
            chassisNumber: 'MHF777777',
            engineNumber: 'K15B77777',
            status: 'REPORTED_AT_POOL',
            driverId: driver2.id,
            assignedById: operation.id
          }
        ]
      }
    }
  });

  const tripReported = await prisma.trip.findUnique({ where: { tripNumber: 'TRP-REPORTED-004-A' } });
  if (tripReported) {
    const existingCp = await prisma.tripCheckpoint.findFirst({ where: { tripId: tripReported.id } });
    if (!existingCp) {
      await prisma.tripCheckpoint.create({
        data: {
          tripId: tripReported.id,
          poolId: poolBekasi.id,
          status: 'REPORTED',
          reportedById: driver2.id,
          reportNote: 'Mobil tiba dengan aman, lecet sedikit di bumper depan.'
        }
      });
    }
  }

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
