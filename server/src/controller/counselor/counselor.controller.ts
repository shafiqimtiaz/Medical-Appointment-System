import express from "express";
import * as counselorService from "../../service/counselor.service";
import * as userService from "../../service/user.service";
import {authorizeRoles, CustomRequest} from "../../middleware/auth";
const counselorRouter = express.Router();

counselorRouter.post("/appointment", authorizeRoles("medical_staff"), async (req, res) => {
  const { medicalStaff_Id, patient_Id, assignedStaff_Id, appointmentDate } =
    req.body;

  const user = await userService.findUserById(medicalStaff_Id);
  if (!user) {
    return res.status(404).send("Medical Staff record not found");
  }

  try {
    const appointment = await counselorService.createAppointment(
      appointmentDate,
      patient_Id,
      assignedStaff_Id,
      user
    );
    res.status(200).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create appointment");
  }
});

counselorRouter.get("/appointment", authorizeRoles("medical_staff"), async (req, res) => {
  try {
    const appointments = await counselorService.getAppointmentsForCounselor((req as CustomRequest).user_id);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get appointments");
  }
});

counselorRouter.get("/patients", authorizeRoles("medical_staff"), async (req, res) => {
  try {
    let withAppointments = false;
    if (req.query.andAppointments && req.query.andAppointments === "true") {
      withAppointments = true;
    }
    const patients = await counselorService.getAllPatients(withAppointments);
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get patients");
  }
});

counselorRouter.get("/assessments/:id", authorizeRoles("medical_staff"), async (req, res) => {
  try {
    const assessments = await counselorService.getAssessmentAnswersById(parseInt(req.params.id));
    res.status(200).json(assessments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get assessment");
  }
});

export default counselorRouter;
