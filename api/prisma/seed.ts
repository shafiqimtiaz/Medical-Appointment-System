import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UsersCreateInput[] = [
  {
    email: 'ron@mail.com',
    hashed_pass: '123456',
    name: 'Rob',
    dob: new Date('1990-01-01'),
    address: '123 Hogwarts St',
    phone_nbr: '123-456-7890',
    role: 'patient',
  },
  {
    email: 'harry@mail.com',
    hashed_pass: '123456',
    name: 'Harry',
    dob: new Date('1990-01-01'),
    address: '321 Hogwarts St',
    phone_nbr: '321-456-7890',
    role: 'counselor',
  },
  {
    email: 'hermione@mail.com',
    hashed_pass: '123456',
    name: 'Hermione',
    dob: new Date('1990-01-01'),
    address: '456 Hogwarts St',
    phone_nbr: '456-456-7890',
    role: 'doctor',
  },
  {
    email: 'snape@mail.com',
    hashed_pass: '123456',
    name: 'Snape',
    dob: new Date('1990-01-01'),
    address: '789 Hogwarts St',
    phone_nbr: '789-456-7890',
    role: 'manager',
  },
  {
    email: 'ginny@mail.com',
    hashed_pass: '123456',
    name: 'Ginny',
    dob: new Date('1992-08-11'),
    address: '567 Burrow Way',
    phone_nbr: '555-555-5555',
    role: 'patient',
  },
  {
    email: 'ronan@mail.com',
    hashed_pass: '123456',
    name: 'Ronan',
    dob: new Date('1985-04-23'),
    address: '456 Green Isle',
    phone_nbr: '444-444-4444',
    role: 'counselor',
  },
  {
    email: 'neville@mail.com',
    hashed_pass: '123456',
    name: 'Neville',
    dob: new Date('1988-07-30'),
    address: '13 Longbottom Lane',
    phone_nbr: '333-333-3333',
    role: 'doctor',
  },
  {
    email: 'mcgonagall@mail.com',
    hashed_pass: '123456',
    name: 'McGonagall',
    dob: new Date('1949-10-04'),
    address: '1 Hogwarts Castle',
    phone_nbr: '222-222-2222',
    role: 'manager',
  },
  {
    email: 'luna@mail.com',
    hashed_pass: '123456',
    name: 'Luna',
    dob: new Date('1981-02-13'),
    address: '11 Ravenclaw Tower',
    phone_nbr: '111-111-1111',
    role: 'patient',
  },
  {
    email: 'hagrid@mail.com',
    hashed_pass: '123456',
    name: 'Hagrid',
    dob: new Date('1928-12-06'),
    address: '7 Hagrid Hut',
    phone_nbr: '999-999-9999',
    role: 'doctor',
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.users.create({
      data: u,
    })
    console.log(`Created user with id: ${user.user_id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })