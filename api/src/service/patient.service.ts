import { db } from "../util/database";

async function createPatientAssessment(
  patient: any,
  user: any,
  assessmentDetails: string,
  answers: any[]
) {
  try {
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
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create assessment");
  }
}

async function acceptAssessmentByPatient(assessment_id: any) {
  try {
    return await await db.assessments.update({
      where: {
        assessment_id: parseInt(assessment_id),
      },
      data: {
        active: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to accept assessment");
  }
}

async function cancelAssessmentByPatient(assessment_id: any) {
  try {
    return await db.assessments.update({
      where: {
        assessment_id: parseInt(assessment_id),
      },
      data: {
        active: false,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to cancel assessment");
  }
}

async function acceptAppointmentByPatient(appointment_id: any) {
  try {
    return await await db.appointments.update({
      where: {
        appointment_id: parseInt(appointment_id),
      },
      data: {
        active: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to accept appointment");
  }
}

async function cancelAppointmentByPatient(appointment_id: any) {
  try {
    return await db.appointments.update({
      where: {
        appointment_id: parseInt(appointment_id),
      },
      data: {
        active: false,
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

async function findAppointmentByPatient(user_id: any) {
  return await db.appointments.findMany({
    where: {
      patient_id: parseInt(user_id),
    },
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
  acceptAssessmentByPatient,
  cancelAssessmentByPatient,
  acceptAppointmentByPatient,
  cancelAppointmentByPatient,
  findAssessmentByPatient,
  findAppointmentByPatient,
  findAssessmentById,
  findAppointmentById,
};
