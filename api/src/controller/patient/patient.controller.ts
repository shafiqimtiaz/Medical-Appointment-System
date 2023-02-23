import express from "express";
import * as patientService from "../../service/patient.service";
import * as userService from "../../service/user.service";
const patientRouter = express.Router();

patientRouter.post("/assessment", async (req, res) => {
  try {
    const { patient, details, answers } = req.body;

    const user = await userService.findPatientById(patient.patient_id);
    if (!user) {
      return res.status(404).send("User record not found");
    }

    const assessment = await patientService.createPatientAssessment(
      patient,
      user,
      details,
      answers
    );

    res.status(201).json({ assessment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create assessment" });
  }
});

patientRouter.put("/appointment/:appointmentId/accept", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await patientService.acceptAppointmentByPatient(
      appointmentId
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to accept appointment" });
  }
});

patientRouter.put("/appointment/:appointmentId/cancel", async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const appointment = await patientService.cancelAppointmentByPatient(
      appointmentId
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to cancel appointment" });
  }
});

export default patientRouter;
