import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const manager = await prisma.users.upsert({
    where: { email: "m@spm.com" },
    update: {},
    create: {
      name: "Manager",
      address: "Montreal",
      email: "m@spm.com",
      date_of_birth: new Date("1986-02-20 00:00:00.00"),
      phone_number: "514-304-3434",
      password: "123456",
      role: "manager",
    },
  });

  const p1 = await prisma.users.upsert({
    where: { email: "p1@spm.com" },
    update: {},
    create: {
      name: "Patient 1",
      address: "Montreal",
      email: "p1@spm.com",
      date_of_birth: new Date("1991-08-20 00:00:00.00"),
      phone_number: "514-304-3434",
      password: "123456",
      role: "patient",
    },
  });

  const p2 = await prisma.users.upsert({
    where: { email: "p2@spm.com" },
    update: {},
    create: {
      name: "Patient 2",
      address: "Montreal",
      email: "p2@spm.com",
      date_of_birth: new Date("1990-10-10 00:00:00.00"),
      phone_number: "514-304-3434",
      password: "123456",
      role: "patient",
    },
  });

  const c1 = await prisma.users.upsert({
    where: { email: "c1@spm.com" },
    update: {},
    create: {
      name: "Counselor 1",
      address: "Montreal",
      email: "c1@spm.com",
      date_of_birth: new Date("1980-10-12 00:00:00.00"),
      phone_number: "514-304-3434",
      password: "123456",
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199254740991",
          type: "c",
        },
      },
    },
  });

  const d1 = await prisma.users.upsert({
    where: { email: "d1@spm.com" },
    update: {},
    create: {
      name: "Doctor 1",
      address: "Montreal",
      email: "d1@spm.com",
      date_of_birth: new Date("1970-10-12 00:00:00.00"),
      phone_number: "514-304-3434",
      password: "123456",
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199254740991",
          type: "d",
        },
      },
    },
  });

  console.log({ manager, p1, p2, c1, d1 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
