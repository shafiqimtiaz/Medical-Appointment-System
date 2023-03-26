import { db } from "../util/database";


async function getPatientsForDoctor(doctorId: number) {
  try {
    const patients = await db.patients.findMany({
      where: {
        assessments: {
          some: {
            medical_staff_id: doctorId,
            active: true,
          }
        }
      },
      include: {
        users: true,
        assessments: true,
      }
    })

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
    throw new Error("Unable to get patients for doctor");
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

export { getPatientsForDoctor, getAssessmentAnswersById };