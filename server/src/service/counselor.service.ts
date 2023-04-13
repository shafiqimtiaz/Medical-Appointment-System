import { db } from "../util/database";

async function createAppointment(
  patient_Id: number,
  medicalStaff_Id: number,
  appointmentDate: Date,
  user: any
) {
  try {
    const appointment = await db.appointments.create({
      data: {
        appointment_date: new Date(appointmentDate),
        patient_id: patient_Id,
        medical_staff_id: medicalStaff_Id,
        created_by: user.name,
        updated_by: user.name,
      },
      include: {
        medical_staff: true,
      },
    });
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create appointment");
  }
}

async function getAllPatients(withAppointments: boolean) {
  try {
    let patients = await db.patients.findMany({
      include: {
        users: true,
        assessments: true,
        appointments: withAppointments,
      },
    });

    patients = patients.map((p: any) => {
      return {
        patient_id: p.patient_id,
        user: p.users,
        appointments: p.appointments,
        assessments: p.assessments,
      };
    });

    patients.forEach((p: any) => {
      delete p.user.password;
      delete p.user.user_id;
    });
    return patients;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get patients");
  }
}

async function getAllDoctors() {
  try {
    const doctors = await db.medical_staff.findMany({
      where: {
        type: "d",
      },
      include: {
        users: true,
      },
    });
    doctors.forEach((d: any) => {
      delete d.users.password;
      delete d.users.user_id;
    });
    return doctors;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get doctors");
  }
}

async function getAssessmentAnswersById(assessment_id: number) {
  try {
    return await db.assessments.findFirst({
      where: {
        assessment_id: assessment_id,
      },
      include: {
        answers: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get assessments");
  }
}

async function getAppointmentsForCounselor(counselorId: number) {
  try {
    const appointments = await db.appointments.findMany({
      where: {
        medical_staff_id: counselorId,
      },
      include: {
        patients: {
          include: {
            users: true,
          },
        },
      },
    });
    appointments.forEach((a: any) => {
      delete a.patients.users.password;
      delete a.patients.users.user_id;
    });
    return appointments;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get appointments");
  }
}

async function deleteAssessment(assessmentId: number) {
  try {
    const assessment = await db.assessments.delete({
      where: {
        assessment_id: assessmentId,
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to delete assessment");
  }
}

async function deactivateAssessment(assessmentId: number) {
  try {
    const assessment = await db.assessments.update({
      where: {
        assessment_id: assessmentId,
      },
      data: {
        active: false,
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to deactivate assessment");
  }
}

async function approveAssessment(
  assessmentId: number,
  medicalStaff_Id: number
) {
  try {
    const assessment = await db.assessments.update({
      where: {
        assessment_id: assessmentId,
      },
      data: {
        medical_staff_id: medicalStaff_Id,
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to deactivate assessment");
  }
}

async function getPatientsForCounselor(counselorId: number) {
  try {
    const patients = await db.patients.findMany({
      where: {
        assessments: {
          some: {
            medical_staff_id: counselorId,
            active: true,
          },
        },
      },
      include: {
        users: true,
        assessments: true,
      },
    });

    // remove password and user_id from users
    patients.forEach((p: any) => {
      delete p.users.password;
      delete p.users.user_id;
    });

    // remove assessments that are not active
    patients.forEach((p: any) => {
      p.assessments = p.assessments.filter((a: any) => a.active);
    });
    return patients;
  } catch (e) {
    console.error(e);
    throw new Error("Unable to get patients for counselor");
  }
}

async function getAssessmentByCounselorAndAssessmentId(
  assessment_id: number,
  medicalStaff_id: number
) {
  try {
    const assessment = await db.assessments.findFirst({
      where: {
        assessment_id: assessment_id,
        medical_staff_id: medicalStaff_id,
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get assessment");
  }
}

async function assignAssessment(
  assessment_id: number,
  medicalStaff_id: number
) {
  try {
    const assessment = await db.assessments.update({
      where: {
        assessment_id: assessment_id,
      },
      data: {
        medical_staff_id: medicalStaff_id,
      },
      include: {
        medical_staff: true,
        patients: true,
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to assign medical staff");
  }
}

async function modifyAppointment(
  appointmentId: number,
  appointmentDate: Date,
  user: any
) {
  try {
    const appointment = await db.appointments.update({
      where: {
        appointment_id: appointmentId,
      },
      data: {
        appointment_date: new Date(appointmentDate),
        active: false,
        updated_by: user.name,
      },
      include: {
        medical_staff: true,
      },
    });
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to modify appointment");
  }
}

async function deleteAppointment(appointmentId: number) {
  try {
    const appointment = await db.appointments.delete({
      where: {
        appointment_id: appointmentId,
      },
    });
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to delete appointment");
  }
}

async function deleteAppointmentByPatientId(patientID: number) {
  try {
    const appointment = await db.appointments.deleteMany({
      where: {
        patient_id: patientID,
      },
    });
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to delete appointment");
  }
}

export {
  createAppointment,
  getAllPatients,
  getAllDoctors,
  getAssessmentAnswersById,
  getAppointmentsForCounselor,
  deleteAssessment,
  getPatientsForCounselor,
  deactivateAssessment,
  approveAssessment,
  assignAssessment,
  getAssessmentByCounselorAndAssessmentId,
  modifyAppointment,
  deleteAppointment,
  deleteAppointmentByPatientId,
};
