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

async function returnUserRole(user_id: number) {
  const user = await db.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  return user.role;
}

async function returnStaffType(user_id: number) {
  const staff = await db.medical_staff.findUnique({
    where: {
      medical_staff_id: user_id,
    },
  });

  return staff.type;
}

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

async function createManager(user_id: number) {
  return await db.manager.create({
    data: {
      manager_id: user_id,
    },
  });
}

async function createPatients(user_id: number, patient: PatientCreateType) {
  return await db.patients.create({
    data: {
      patient_id: user_id,
    },
  });
}

async function createMedicalStaff(
  user_id: number,
  staff: MedicalStaffCreateType
) {
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

async function findUserById(id: number) {
  return await db.users.findUnique({
    where: {
      user_id: id,
    },
  });
}

async function findManagerById(id: number) {
  return await db.manager.findUnique({
    where: {
      manager_id: id,
    },
  });
}

async function findPatientById(id: number) {
  return await db.patients.findUnique({
    where: {
      patient_id: id,
    },
  });
}

async function findStaffById(id: number) {
  return await db.medical_staff.findUnique({
    where: {
      medical_staff_id: id,
    },
  });
}

async function findActiveStaffById(id: number) {
  return await db.medical_staff.findFirst({
    where: {
      medical_staff_id: id,
      active: true,
    },
  });
}

async function getAllUser() {
  return await db.users.findMany();
}

async function login(user: any) {
  const existingUser = await findUserByEmail(user.email);

  if (!existingUser) {
    return { message: "User not found!" };
  }

  let staffType = null;
  if (existingUser.role == "medical_staff") {
    const medicalStaff = await findActiveStaffById(existingUser.user_id);
    if (!medicalStaff) {
      return { message: "Staff not approved!" };
    }
    staffType = await returnStaffType(existingUser.user_id);
  }

  const isValidPassword = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (isValidPassword) {
    let JWTtoken = JWT.generateAccessToken(existingUser);

    if (staffType) {
      return {
        access_token: JWTtoken,
        user_id: existingUser.user_id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
        type: staffType,
      };
    } else {
      return {
        access_token: JWTtoken,
        user_id: existingUser.user_id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      };
    }
  } else {
    return null;
  }
}

export {
  UserCreateType,
  PatientCreateType,
  returnUserRole,
  returnStaffType,
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
  findActiveStaffById,
};
