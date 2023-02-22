import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UsersCreateInput[] = [
  {
    name: "Ron",
    address: "123 Hogwarts St",
    email: "ron@mail.com",
    password: "123456",
    role: "patient",
    created_at: new Date("1990-01-01"),
  },
  {
    name: "Hermione",
    address: "456 Grimmauld Pl",
    email: "hermione@mail.com",
    password: "abcdef",
    role: "patient",
    created_at: new Date("1991-04-05"),
  },

  {
    name: "Harry",
    address: "789 Godric's Hollow",
    email: "harry@mail.com",
    password: "ghijkl",
    role: "patient",
    created_at: new Date("1992-07-31"),
  },

  {
    name: "Ginny",
    address: "23 Ottery St Catchpole",
    email: "ginny@mail.com",
    password: "mnopqr",
    role: "patient",
    created_at: new Date("1993-08-11"),
  },
  {
    name: "Draco",
    address: "13 Malfoy Manor",
    email: "draco@mail.com",
    password: "stuvwx",
    role: "patient",
    created_at: new Date("1994-06-05"),
  },
  {
    name: "Albus",
    address: "222 Hogsmeade",
    email: "albus@mail.com",
    password: "yz1234",
    role: "counselor",
    created_at: new Date("1995-03-01"),
  },
  {
    name: "Severus",
    address: "55 Spinner's End",
    email: "severus@mail.com",
    password: "567890",
    role: "manager",
    created_at: new Date("1996-01-09"),
  },
  {
    name: "Minerva",
    address: "10 Wimbourne Pl",
    email: "minerva@mail.com",
    password: "ab2345",
    role: "doctor",
    created_at: new Date("1997-03-04"),
  },
  {
    name: "Remus",
    address: "12 Grimmauld Pl",
    email: "remus@mail.com",
    password: "cd3456",
    role: "doctor",
    created_at: new Date("1998-08-10"),
  },
  {
    name: "Sirius",
    address: "1 Padfoot Lane",
    email: "sirius@mail.com",
    password: "ef4567",
    role: "counselor",
    created_at: new Date("1999-06-16"),
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    });
    console.log(`Created user with id: ${user.user_id}`);
  }
  console.log(`Seeding finished.`);
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
