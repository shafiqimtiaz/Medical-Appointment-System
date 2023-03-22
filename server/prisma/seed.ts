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
      date_of_birth: new Date("1996-02-20 19:36:12.928"),
      phone_number: "514-304-3434",
      password: "123456",
      role: "manager",
    },
  });

  console.log({ manager });
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
