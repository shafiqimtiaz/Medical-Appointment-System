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
        patients: { connect: { patient_id: patient_Id } },
        medical_staff: { connect: { medical_staff_id: assignedStaff_Id } },
        created_by: user.name,
        updated_by: user.name,
      },
      include: {
        patients: true,
        medical_staff: true,
      },
    });
    return appointment;
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create appointment");
  }
}

export { createAppointment };
