import { db } from "../util/database";

async function createPatientAssessment(
  patient_id: any,
  answers: any[],
  user: any
) {
  try {
    return await db.assessments.create({
      data: {
        patient_id: patient_id,
        answers: {
          create: answers.map((answer) => {
            return {
              question: answer.question,
              answer: answer.answer,
            };
          }),
        },
      },
      include: {
        answers: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create assessment");
  }
}

async function cancelAssessmentByPatient(assessment_id: any) {
  try {
    return await db.assessments.delete({
      where: {
        assessment_id: parseInt(assessment_id),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to cancel assessment");
  }
}

async function acceptAppointmentByPatient(appointment_id: any, user: any) {
  try {
    return await await db.appointments.update({
      where: {
        appointment_id: parseInt(appointment_id),
      },
      data: {
        active: true,
        updated_by: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to accept appointment");
  }
}

async function cancelAppointmentByPatient(appointment_id: any) {
  try {
    return await db.appointments.delete({
      where: {
        appointment_id: parseInt(appointment_id),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to cancel appointment");
  }
}

async function findAssessmentByPatient(user_id: any) {
  return await db.assessments.findMany({
    where: {
      patient_id: parseInt(user_id),
    },
  });
}

async function findActiveAssessmentByPatientId(user_id: any) {
  return await db.assessments.findFirst({
    where: {
      patient_id: parseInt(user_id),
      active: true
    },
  });
}

async function findAppointmentByPatient(user_id: any) {
  return await db.appointments.findMany({
    where: {
      patient_id: parseInt(user_id),
    },
    include: {
      medical_staff: true
    }
  });
}

async function findAssessmentById(assessment_id: any) {
  return await db.assessments.findUnique({
    where: {
      assessment_id: parseInt(assessment_id),
    },
  });
}

async function findAppointmentById(appointment_id: any) {
  return await db.appointments.findUnique({
    where: {
      appointment_id: parseInt(appointment_id),
    },
  });
}

export {
  createPatientAssessment,
  cancelAssessmentByPatient,
  acceptAppointmentByPatient,
  cancelAppointmentByPatient,
  findAssessmentByPatient,
  findAppointmentByPatient,
  findAssessmentById,
  findAppointmentById,
  findActiveAssessmentByPatientId
};
