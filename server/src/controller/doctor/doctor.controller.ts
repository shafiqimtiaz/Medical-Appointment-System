import express from "express";
import { authorizeRoles, CustomRequest } from "../../middleware/auth";
import * as userService from "../../service/user.service";
import * as doctorService from "../../service/doctor.service";
const doctorRouter = express.Router();

doctorRouter.post(
  "/appointment",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { patient_Id, medicalStaff_Id, appointmentDate } = req.body;

    try {
      const { user_id } = req as CustomRequest;

      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }
      const staff_type = await userService.returnStaffType(+user_id);
      if (staff_type === "d") {
        const appointment = await doctorService.createAppointment(
          patient_Id,
          medicalStaff_Id,
          appointmentDate,
          user
        );
        res.status(200).json(appointment);
      } else {
        res.status(500).json("User not authorized to create this appointment");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to create appointment");
    }
  }
);

doctorRouter.put(
  "/appointment/modify/:appointmentId",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentDate } = req.body;

    try {
      const { user_id } = req as CustomRequest;

      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }

      const staff_type = await userService.returnStaffType(+user_id);
      if (staff_type === "d") {
        const modifiedAppointment = await doctorService.modifyAppointment(
          +appointmentId,
          appointmentDate,
          user
        );
        res.status(200).json(modifiedAppointment);
      } else {
        res.status(500).json("User not authorized to modify this appointment");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to modify appointment");
    }
  }
);

doctorRouter.delete(
  "/appointment/delete/:appointmentId",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { appointmentId } = req.params;

    try {
      const { user_id } = req as CustomRequest;

      const user = await userService.findUserById(+user_id);
      if (!user) {
        return res.status(404).send("Medical Staff record not found");
      }

      const staff_type = await userService.returnStaffType(+user_id);
      if (staff_type === "d") {
        const deletedAppointment = await doctorService.deleteAppointment(
          +appointmentId
        );
        res.status(200).json({ deleted: deletedAppointment });
      } else {
        res.status(500).json("User not authorized to delete this appointment");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete appointment");
    }
  }
);

doctorRouter.get(
  "/appointment",
  authorizeRoles("medical_staff"),
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

export default doctorRouter;
