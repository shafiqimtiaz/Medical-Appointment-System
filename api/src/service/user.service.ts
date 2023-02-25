const bcrypt = require("bcrypt");
import * as JWT from "../util/jwt";
import { db } from "../util/database";

type UserCreateType = {
  name: string;
  address: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  password: string;
  role: string;
};

type PatientCreateType = {
  health_condition: string;
};

type MedicalStaffCreateType = {
  license_number: string;
  type: string;
};

async function createUser(user: UserCreateType) {
  user.password = bcrypt.hashSync(user.password, 10);

  return await db.users.create({
    data: {
      name: user.name,
      address: user.address,
      date_of_birth: new Date(user.date_of_birth),
      phone_number: user.phone_number,
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

async function createPatients(user_id: any, patient: PatientCreateType) {
  return await db.patients.create({
    data: {
      patient_id: user_id,
      health_condition: patient.health_condition,
    },
  });
}

async function createMedicalStaff(user_id: any, staff: MedicalStaffCreateType) {
  return await db.medical_staff.create({
    data: {
      medical_staff_id: user_id,
      license_number: staff.license_number,
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
  UserCreateType,
  PatientCreateType,
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
