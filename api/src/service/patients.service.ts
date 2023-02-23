import { db } from "../util/database";

async function createPatientAssessment(
  patient: any,
  user: any,
  assessmentDetails: string,
  answers: any[]
) {
  const assessment = await db.assessments.create({
    data: {
      details: assessmentDetails,
      active: false,
      created_by: user.name,
      updated_by: user.name,
      patient_id: patient.patient_id,
      answers: {
        create: answers.map((answer) => {
          return {
            answer: answer.answer,
            question: answer.question,
          };
        }),
      },
    },
    include: {
      answers: true,
    },
  });

  return assessment;
}

async function acceptAppointmentByPatient(appointment_id: any) {
  return await db.appointments.update({
    where: {
      appointment_id: appointment_id,
    },
    data: {
      active: true,
    },
  });
}

async function cancelAppointmentByPatient(appointment_id: any) {
  return await db.appointments.update({
    where: {
      appointment_id: appointment_id,
    },
    data: {
      active: false,
    },
  });
}

async function cancelAssessmentByPatient(assessment_id: any) {
  return await db.assessment.update({
    where: {
      assessment_id: assessment_id,
    },
    data: {
      active: false,
    },
  });
}

async function findAppointmentByPatient(user_id: any) {
  return await db.appointments.findMany({
    where: {
      patient_id: user_id,
    },
  });
}

async function findAppointmentById(id: any) {
  return await db.appointments.findUnique({
    where: {
      appointment_id: id,
    },
  });
}

export {
  createPatientAssessment,
  acceptAppointmentByPatient,
  cancelAppointmentByPatient,
  cancelAssessmentByPatient,
  findAppointmentByPatient,
  findAppointmentById,
};
