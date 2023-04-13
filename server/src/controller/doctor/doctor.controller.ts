import express from "express";
import {
  authorizeRoles,
  authorizeTypes,
  CustomRequest,
} from "../../middleware/auth";
import * as userService from "../../service/user.service";
import * as doctorService from "../../service/doctor.service";
const doctorRouter = express.Router();

doctorRouter.post(
  "/appointment",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const { patient_Id, medicalStaff_Id, appointmentDate } = req.body;
      const { user_id } = req as CustomRequest;
      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }
      const appointment = await doctorService.createAppointment(
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

doctorRouter.put(
  "/appointment/modify/:appointmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentDate } = req.body;

    try {
      const { user_id } = req as CustomRequest;
      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }
      const modifiedAppointment = await doctorService.modifyAppointment(
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

doctorRouter.delete(
  "/appointment/delete/:appointmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const deletedAppointment = await doctorService.deleteAppointment(
        +appointmentId
      );
      res.status(200).json({ deleted: deletedAppointment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete appointment");
    }
  }
);

doctorRouter.put(
  "/appointment/deactivate/:appointmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const deactivatedAppointment = await doctorService.deactivateAppointment(
        +appointmentId
      );
      res.status(200).json(deactivatedAppointment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to deactivate appointment");
    }
  }
);

doctorRouter.put(
  "/assessment/deactivate/:assessmentId",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const { assessmentId } = req.params;
      const deactivatedAssessment = await doctorService.deactivateAssessment(
        +assessmentId
      );
      res.status(200).json(deactivatedAssessment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to deactivate assessment");
    }
  }
);

doctorRouter.get(
  "/appointment",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const appointments = await doctorService.getAppointmentsForDoctor(
        +(req as CustomRequest).user_id
      );
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get appointments");
    }
  }
);

doctorRouter.get(
  "/patients",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const patients = await doctorService.getPatientsForDoctor(
        +(req as CustomRequest).user_id
      );
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get patients");
    }
  }
);

doctorRouter.get(
  "/assessments/:id",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const assessments = await doctorService.getAssessmentAnswersById(
        parseInt(req.params.id)
      );
      res.status(200).json(assessments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get assessment");
    }
  }
);

doctorRouter.get(
  "/appointment/:id",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const appointment = await doctorService.getAppointmentById(
        parseInt(req.params.id)
      );
      res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get assessment");
    }
  }
);

doctorRouter.delete(
  "/delete/appointment/:patientID",
  authorizeRoles("medical_staff"),
  authorizeTypes("d"),
  async (req, res) => {
    try {
      const { patientID } = req.params;
      const deletedAppointment =
        await doctorService.deleteAppointmentByPatientId(+patientID);
      res.status(200).json({ deleted: deletedAppointment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete appointment");
    }
  }
);

export default doctorRouter;
