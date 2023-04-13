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

async function getAllUsers() {
  return await db.users.findMany({
    where: {
      NOT: {
        role: "manager",
      },
    },
    include: {
      manager: true,
      medical_staff: true,
      patients: true,
    },
  });
}

async function getPatientStats() {
  let patients = await db.patients.findMany({
    include: {
      users: {
        select: {
          name: true,
        },
      },
      assessments: true,
      appointments: true,
    },
  });
  return patients;
}

async function getDoctorStats() {
  let doctors = await db.medical_staff.findMany({
    where: {
      active: true,
      type: "d",
    },
    include: {
      users: {
        select: {
          name: true,
        },
      },
      assessments: true,
      appointments: true,
    },
  });
  return doctors;
}

async function getCounselorStats() {
  let counselors = await db.medical_staff.findMany({
    where: {
      active: true,
      type: "c",
    },
    include: {
      users: {
        select: {
          name: true,
        },
      },
      assessments: true,
      appointments: true,
    },
  });
  return counselors;
}

async function getAppointmentStats() {
  let appointments = await db.appointments.findMany({
    include: {
      patients: {
        include: {
          users: {
            select: {
              name: true,
            },
          },
        },
      },
      medical_staff: {
        include: {
          users: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return appointments;
}

async function getAssessmentStats() {
  let assessments = await db.assessments.findMany({
    where: {
      active: false,
      medical_staff: { not: undefined },
      patient_id: { not: undefined },
    },
    include: {
      medical_staff: {
        select: { type: true },
      },
    },
  });
  return assessments;
}

export {
  getUnapprovedRegistrations,
  approveRegistration,
  rejectRegistration,
  deletePatient,
  getAllUsers,
  getPatientStats,
  getDoctorStats,
  getCounselorStats,
  getAppointmentStats,
  getAssessmentStats,
};
