import { db } from "../util/database";

async function createAppointment(
  appointmentDate: Date,
  patient_Id: any,
  assignedStaff_Id: any,
  user: any
) {
  try {
    const appointment = await db.appointments.create({
      data: {
        appointment_date: new Date(appointmentDate),
        patient_id: patient_Id,
        medical_staff_id: assignedStaff_Id,
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

async function getAppointmentsForCounselor(counselorId: any) {
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

async function deleteAssessment(assessmentId: any) {
  try {
    const assessment = await db.assessments.delete({
      where: {
        assessment_id: parseInt(assessmentId),
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to delete assessment");
  }
}

async function deactivateAssessment(assessmentId: any) {
  try {
    const assessment = await db.assessments.update({
      where: {
        assessment_id: parseInt(assessmentId),
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

async function approveAssessment(assessmentId: any, medicalStaff_Id: any) {
  try {
    const assessment = await db.assessments.update({
      where: {
        assessment_id: parseInt(assessmentId),
      },
      data: {
        medical_staff_id: parseInt(medicalStaff_Id),
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to deactivate assessment");
  }
}

export {
  createAppointment,
  getAllPatients,
  getAssessmentAnswersById,
  getAppointmentsForCounselor,
  deleteAssessment,
  deactivateAssessment,
  approveAssessment,
};
