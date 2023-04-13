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

async function getAppointmentsForDoctor(doctorId: number) {
  try {
    const appointments = await db.appointments.findMany({
      where: {
        medical_staff_id: doctorId,
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

async function getPatientsForDoctor(doctorId: number) {
  try {
    const patients = await db.patients.findMany({
      where: {
        assessments: {
          some: {
            medical_staff_id: doctorId,
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

async function deactivateAppointment(appointmentId: number) {
  try {
    const assessment = await db.appointment.update({
      where: {
        appointment_id: appointmentId,
      },
      data: {
        active: false,
      },
    });
    return assessment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to deactivate appointment");
  }
}

async function getAppointmentById(appointment_id: number) {
  try {
    const appointment = await db.appointments.findFirst({
      where: {
        appointment_id: appointment_id,
      },
      include: {
        patients: {
          include: {
            users: true,
          },
        },
      },
    });

    delete appointment.patients.users.password;
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to get appointment");
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
  modifyAppointment,
  deleteAppointment,
  getAppointmentsForDoctor,
  getPatientsForDoctor,
  getAssessmentAnswersById,
  deactivateAppointment,
  getAppointmentById,
  deactivateAssessment,
  deleteAppointmentByPatientId,
};
