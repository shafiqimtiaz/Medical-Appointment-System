import express from "express";
import * as patientService from "../../service/patients.service";
import * as userService from "../../service/users.service";
const patientRouter = express.Router();

patientRouter.post("/assessment/", async (req, res) => {
  try {
    const { patient, details, answers } = req.body;

    const user = await userService.findUserById(patient.patient_id);

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

patientRouter.get("/appointment/:id", async (req, res) => {
  try {
    let patientAppoinment = await patientService.findAppointmentByPatient(
      +req.params.id
    );
    res.json(patientAppoinment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create Appointment");
  }
});

export default patientRouter;
