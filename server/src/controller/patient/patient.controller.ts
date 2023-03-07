import express from "express";
import * as patientService from "../../service/patient.service";
import * as userService from "../../service/user.service";
import {authorizeRoles} from "../../middleware/auth";
const patientRouter = express.Router();

patientRouter.post("/assessment", authorizeRoles("patient"), async (req, res) => {
  try {
    const { patient_id, answers } = req.body;

    const user = await userService.findUserById(patient_id);
    if (!user) {
      return res.status(404).send("Patient record not found");
    }

    const assessment = await patientService.createPatientAssessment(
      patient_id,
      answers,
      user
    );

    res.status(200).json(assessment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create assessment");
  }
});

patientRouter.delete("/assessment/:assessment_Id/cancel", authorizeRoles("patient"), async (req, res) => {
  try {
    const assessment = await patientService.cancelAssessmentByPatient(
      +req.params.assessment_Id
    );
    res.status(200).json({ Deleted: assessment });
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to cancel assessment");
  }
});

patientRouter.get("/assessment/findbyuserid/:patient_id", authorizeRoles("patient"), async (req, res) => {
  try {
    const { patient_id } = req.params;
    const activeAssessment = await patientService.findActiveAssessmentByPatientId(patient_id);
    if(activeAssessment){
      res.status(200).json(activeAssessment);
    }else{
      res.status(200).json({"message": "no active assessment found!"});
    }
    

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

patientRouter.get("/appointment/:patient_id", authorizeRoles("patient"), async (req, res) => {
  try {
    const appointment = await patientService.findAppointmentByPatient(
      +req.params.patient_id
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to fetch appointment");
  }
});

patientRouter.put("/appointment/:appointment_Id/accept", authorizeRoles("patient"), async (req, res) => {
  try {
    const { appointment_Id } = req.params;

    let app = await patientService.findAppointmentById(+appointment_Id);

    const user = await userService.findUserById(app.patient_id);
    if (!user) {
      return res.status(404).send("Patient record not found");
    }

    const appointment = await patientService.acceptAppointmentByPatient(
      appointment_Id,
      user
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to accept appointment");
  }
});

patientRouter.delete(
  "/appointment/:appointment_Id/cancel",
  authorizeRoles("patient"),
  async (req, res) => {
    try {
      const appointment = await patientService.cancelAppointmentByPatient(
        +req.params.appointment_Id
      );
      res.status(200).json({ Deleted: appointment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to cancel appointment");
    }
  }
);

export default patientRouter;
