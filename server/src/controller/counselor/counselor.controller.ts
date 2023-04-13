import express from "express";
import * as counselorService from "../../service/counselor.service";
import * as userService from "../../service/user.service";
import {
  authorizeRoles,
  authorizeTypes,
  CustomRequest,
} from "../../middleware/auth";
const counselorRouter = express.Router();

counselorRouter.post(
  "/appointment",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const { patient_Id, medicalStaff_Id, appointmentDate } = req.body;
      const { user_id } = req as CustomRequest;
      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }
      const appointment = await counselorService.createAppointment(
        patient_Id,
        medicalStaff_Id,
        appointmentDate,
        user
      );
      res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to create appointment");
    }
  }
);

counselorRouter.put(
  "/assessments/assign",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    const { assessment_id, medical_staff_id } = req.body;

    try {
      const { user_id } = req as CustomRequest;
      const counselor =
        await counselorService.getAssessmentByCounselorAndAssessmentId(
          +assessment_id,
          +user_id
        );

      if (counselor) {
        const assignedAssessment = await counselorService.assignAssessment(
          +assessment_id,
          +medical_staff_id
        );
        res.status(200).json(assignedAssessment);
      } else {
        res
          .status(500)
          .json("Counselor is not authorized to assign this patient");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to assign doctor");
    }
  }
);

counselorRouter.put(
  "/appointment/modify/:appointmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentDate } = req.body;
    try {
      const { user_id } = req as CustomRequest;
      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }
      const modifiedAppointment = await counselorService.modifyAppointment(
        +appointmentId,
        appointmentDate,
        user
      );
      res.status(200).json(modifiedAppointment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to modify appointment");
    }
  }
);

counselorRouter.get(
  "/appointment",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const appointments = await counselorService.getAppointmentsForCounselor(
        +(req as CustomRequest).user_id
      );
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get appointments");
    }
  }
);

counselorRouter.get(
  "/patients",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
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
  }
);

counselorRouter.get(
  "/patients/assigned",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    try {
      const patients = await counselorService.getPatientsForCounselor(
        +(req as CustomRequest).user_id
      );
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get assigned patients");
    }
  }
);

counselorRouter.delete(
  "/appointment/delete/:appointmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const deletedAppointment = await counselorService.deleteAppointment(
        +appointmentId
      );
      res.status(200).json({ deleted: deletedAppointment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete appointment");
    }
  }
);

counselorRouter.get(
  "/doctors",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const doctors = await counselorService.getAllDoctors();
      res.status(200).json(doctors);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get doctors");
    }
  }
);

counselorRouter.get(
  "/assessments/:id",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const assessments = await counselorService.getAssessmentAnswersById(
        parseInt(req.params.id)
      );
      res.status(200).json(assessments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get assessment");
    }
  }
);

counselorRouter.delete(
  "/assessments/delete/:assessmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const { assessmentId } = req.params;
      const assessment = await counselorService.deleteAssessment(+assessmentId);
      res.status(200).json({ deleted: assessment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete assessment");
    }
  }
);

counselorRouter.put(
  "/assessments/deactivate/:assessmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const { assessmentId } = req.params;
      const deactivatedAssessment = await counselorService.deactivateAssessment(
        +assessmentId
      );
      res.status(200).json(deactivatedAssessment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to deactivate assessment");
    }
  }
);

counselorRouter.put(
  "/assessments/approve/:assessmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const { assessmentId } = req.params;
      const { user_id } = req as CustomRequest;
      const approvedAssessment = await counselorService.approveAssessment(
        +assessmentId,
        +user_id
      );
      res.status(200).json(approvedAssessment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to approve assessment");
    }
  }
);

counselorRouter.delete(
  "/delete/appointment/:patientID",
  authorizeRoles("medical_staff"),
  authorizeTypes("c"),
  async (req, res) => {
    try {
      const { patientID } = req.params;
      const deletedAppointment =
        await counselorService.deleteAppointmentByPatientId(+patientID);
      res.status(200).json({ deleted: deletedAppointment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete appointment");
    }
  }
);

export default counselorRouter;
