import { db } from "../util/database";

async function getUnapprovedRegistrations() {
  let staff = await db.medical_staff.findMany({
    where: {
      active: false,
    },
    include: {
      users: true,
    },
  });
  staff.map((s: any) => {
    delete s.users.password;
  });
  return staff;
}

async function approveRegistration(staff_id: any) {
  return db.medical_staff.update({
    where: {
      medical_staff_id: staff_id,
    },
    data: {
      active: true,
    },
  });
}

async function rejectRegistration(staff_id: any) {
  return db.users.delete({
    where: {
      user_id: staff_id,
    },
  });
}

async function deletePatient(patient_id: any) {
  let user = await db.users.findUnique({
    where: {
      user_id: patient_id,
    },
  });
  if (user.role === "patient") {
    return db.users.delete({
      where: {
        user_id: patient_id,
      },
    });
  } else {
    throw new Error("User is not a patient");
  }
}

export {
  getUnapprovedRegistrations,
  approveRegistration,
  rejectRegistration,
  deletePatient,
};
