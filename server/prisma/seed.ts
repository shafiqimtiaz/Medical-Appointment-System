import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");
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
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
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
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "patient",
    },
  });

  await prisma.patients.create({
    data: {
      patient_id: p1.user_id,
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
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "patient",
    },
  });

  await prisma.patients.create({
    data: {
      patient_id: p2.user_id,
    },
  });

  const p3 = await prisma.users.upsert({
    where: { email: "p3@spm.com" },
    update: {},
    create: {
      name: "Patient 3",
      address: "Montreal",
      email: "p3@spm.com",
      date_of_birth: new Date("1995-10-10 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "patient",
    },
  });

  await prisma.patients.create({
    data: {
      patient_id: p3.user_id,
    },
  });

  const p4 = await prisma.users.upsert({
    where: { email: "p4@spm.com" },
    update: {},
    create: {
      name: "Patient 4",
      address: "Montreal",
      email: "p4@spm.com",
      date_of_birth: new Date("1989-10-10 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "patient",
    },
  });

  await prisma.patients.create({
    data: {
      patient_id: p4.user_id,
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
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199254740991",
          type: "c",
        },
      },
    },
  });

  const c2 = await prisma.users.upsert({
    where: { email: "c2@spm.com" },
    update: {},
    create: {
      name: "Counselor 2",
      address: "Montreal",
      email: "c2@spm.com",
      date_of_birth: new Date("1983-10-12 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199254740991",
          type: "c",
        },
      },
    },
  });

  const c3 = await prisma.users.upsert({
    where: { email: "c3@spm.com" },
    update: {},
    create: {
      name: "Counselor 3",
      address: "Montreal",
      email: "c3@spm.com",
      date_of_birth: new Date("1970-10-12 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
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
      date_of_birth: new Date("1972-10-12 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199959640881",
          type: "d",
        },
      },
    },
  });

  const d2 = await prisma.users.upsert({
    where: { email: "d2@spm.com" },
    update: {},
    create: {
      name: "Doctor 2",
      address: "Montreal",
      email: "d2@spm.com",
      date_of_birth: new Date("1969-10-12 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199959640881",
          type: "d",
        },
      },
    },
  });

  const d3 = await prisma.users.upsert({
    where: { email: "d3@spm.com" },
    update: {},
    create: {
      name: "Doctor 3",
      address: "Montreal",
      email: "d3@spm.com",
      date_of_birth: new Date("1950-10-12 00:00:00.00"),
      phone_number: "5143043434",
      password: bcrypt.hashSync("123456", 10),
      role: "medical_staff",
      medical_staff: {
        create: {
          license_number: "9007199959640881",
          type: "d",
        },
      },
    },
  });

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const beforeYesterday = new Date(now);
  beforeYesterday.setDate(beforeYesterday.getDate() - 2);
  const beforeBeforeYesterday = new Date(now);
  beforeBeforeYesterday.setDate(beforeBeforeYesterday.getDate() - 3);

  const jan1 = new Date(now);
  jan1.setMonth(0);

  const jan2 = new Date(now);
  jan2.setMonth(0);
  jan2.setDate(2);

  const feb1 = new Date(now);
  feb1.setMonth(1);
  const feb2 = new Date(now);
  feb2.setMonth(1);
  feb2.setDate(2);

  const mar1 = new Date(now);
  mar1.setMonth(2);
  const mar2 = new Date(now);
  mar2.setMonth(2);
  mar2.setDate(2);
  const mar3 = new Date(now);
  mar3.setMonth(2);
  mar3.setDate(3);

  // generate assessments for patients
  const patients = [p1, p2, p3, p4];

  for (const patient of patients) {
    const as1 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: d1.user_id,
        updated_at: now,
        created_at: now,
      },
    });

    const as2 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: d2.user_id,
        updated_at: yesterday,
        created_at: yesterday,
      },
    });

    const as3 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c1.user_id,
        updated_at: beforeYesterday,
        created_at: beforeYesterday,
      },
    });

    const as4 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: beforeBeforeYesterday,
        created_at: beforeBeforeYesterday,
      },
    });

    const asJan = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: jan1,
        created_at: jan1,
      },
    });

    const asJan2 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: jan2,
        created_at: jan2,
      },
    });

    const asFeb1 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: feb1,
        created_at: feb1,
      },
    });

    const asFeb2 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: feb2,
        created_at: feb2,
      },
    });

    const asMar1 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: mar1,
        created_at: mar1,
      },
    });

    const asMar2 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: mar2,
        created_at: mar2,
      },
    });

    const asMar3 = await prisma.assessments.create({
      data: {
        active: false,
        patient_id: patient.user_id,
        medical_staff_id: c2.user_id,
        updated_at: mar3,
        created_at: mar3,
      },
    });

    const patient_assessments = [
      as1,
      as2,
      as3,
      as4,
      asJan,
      asJan2,
      asFeb1,
      asFeb2,
      asMar1,
      asMar2,
      asMar3,
    ];
    for (const assessment of patient_assessments) {
      for (let i = 0; i < 10; i++) {
        await prisma.answers.create({
          data: {
            assessment_id: assessment.assessment_id,
            question: i + 1,
            answer: "Several Days",
          },
        });
      }
    }
  }
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
