import { db } from "../util/database";

async function createAppointment(
  medicalStaffId: number,
  patientId: number,
  details: string,
  appointmentDate: Date,
  createdBy: string
) {
  try {
    const appointment = await db.appointments.create({
      data: {
        details: details,
        appointment_date: new Date(appointmentDate),
        active: true,
        created_by: createdBy,
        updated_by: createdBy,
        medical_staff: { connect: { medical_staff_id: medicalStaffId } },
        patients: { connect: { patient_id: patientId } },
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
