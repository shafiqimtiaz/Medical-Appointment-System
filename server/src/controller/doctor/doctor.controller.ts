import express from "express";
import { authorizeRoles, CustomRequest } from "../../middleware/auth";
import {getAssessmentAnswersById, getPatientsForDoctor} from "../../service/doctor.service";

const doctorRouter = express.Router();

doctorRouter.get("/patients", authorizeRoles("medical_staff"), async (req, res) => {
  try {
    const patients = await getPatientsForDoctor(
      +(req as CustomRequest).user_id
    );
    res.status(200).json(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get patients");
  }
});

doctorRouter.get(
  "/assessments/:id",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    try {
      const assessments = await getAssessmentAnswersById(
        parseInt(req.params.id)
      );
      res.status(200).json(assessments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get assessment");
    }
  }
);

export default doctorRouter;