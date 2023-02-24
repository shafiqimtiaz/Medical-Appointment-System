import { db } from "../util/database";

async function createAppointment(
  medicalStaff_Id: number,
  patient_Id: number,
  details: string,
  appointmentDate: Date,
  user: any
) {
  try {
    const appointment = await db.appointments.create({
      data: {
        details: details,
        appointment_date: new Date(appointmentDate),
        active: false,
        created_by: user.name,
        updated_by: user.name,
        medical_staff: { connect: { medical_staff_id: medicalStaff_Id } },
        patients: { connect: { patient_id: patient_Id } },
      },
      include: {
        medical_staff: true,
        patients: true,
      },
    });
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create appointment");
  }
}

export { createAppointment };
