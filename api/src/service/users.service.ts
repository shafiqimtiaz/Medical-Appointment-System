const bcrypt = require("bcrypt");
import * as JWT from "../util/jwt";
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function createUser(user: any) {
  user.password = bcrypt.hashSync(user.password, 10);

  return await db.users.create({
    data: {
      name: user.name,
      address: user.address,
      email: user.email,
      password: user.password,
      role: user.role,
    },
  });
}

async function createManager(user_id: any) {
  return await db.manager.create({
    data: {
      manager_id: user_id,
    },
  });
}

async function createPatients(user_id: any, patient: any) {
  return await db.patients.create({
    data: {
      patient_id: user_id,
      date_of_birth: new Date(patient.date_of_birth),
      health_condition: patient.health_condition,
    },
  });
}

async function createMedicalStaff(user_id: any, staff: any) {
  return await db.medical_staff.create({
    data: {
      medical_staff_id: user_id,
      license_number: staff.license_number,
      active: false,
      type: staff.type,
    },
  });
}

async function findUserByEmail(email: any) {
  return await db.users.findUnique({
    where: {
      email: email,
    },
  });
}

async function findUserById(id: any) {
  return await db.users.findUnique({
    where: {
      user_id: id,
    },
  });
}

async function findManagerById(id: any) {
  return await db.manager.findUnique({
    where: {
      manager_id: id,
    },
  });
}

async function findPatientById(id: any) {
  return await db.patients.findUnique({
    where: {
      patient_id: id,
    },
  });
}

async function findStaffById(id: any) {
  return await db.medical_staff.findUnique({
    where: {
      medical_staff_id: id,
    },
  });
}

async function getAllUser() {
  return await db.users.findMany();
}

async function login(user: any) {
  const existingUser = await findUserByEmail(user.email);

  if (!existingUser) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (isValidPassword) {
    let JWTtoken = JWT.generateAccessToken(existingUser);
    return { access_token: JWTtoken };
  } else {
    return null;
  }
}

export {
  createUser,
  createManager,
  createPatients,
  createMedicalStaff,
  findUserByEmail,
  login,
  findUserById,
  getAllUser,
  findManagerById,
  findPatientById,
  findStaffById,
};
