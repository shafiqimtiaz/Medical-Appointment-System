import express from "express";
import * as managerService from "../../service/managers.service";
import { authorizeRoles } from "../../middleware/auth";
const managerRouter = express.Router();

function removePasssword(users: any[]) {
  users.forEach((user) => {
    delete user.password;
  });
  return users;
}

managerRouter.get(
  "/newRegistrations",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      let newRegistrations = await managerService.getUnapprovedRegistrations();
      res.status(200).json(newRegistrations);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to fetch new registrations");
    }
  }
);

managerRouter.put(
  "/approveRegistration/:id",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const registration = await managerService.approveRegistration(
        +req.params.id
      );
      res.status(200).json(registration);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to approve registration");
    }
  }
);

managerRouter.delete(
  "/denyRegistration/:id",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const registration = await managerService.rejectRegistration(
        +req.params.id
      );
      res.status(200).status(200).json({ Deleted: registration });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to deny registrations");
    }
  }
);

managerRouter.delete(
  "/deletePatient/:id",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const patient = await managerService.deletePatient(+req.params.id);
      res.status(200).json({ Deleted: patient });
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

managerRouter.get("/users", authorizeRoles("manager"), async (req, res) => {
  try {
    const users = removePasssword(await managerService.getAllUsers());
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
});

managerRouter.get(
  "/patient/stats",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const patientStats = await managerService.getPatientStats();
      res.status(200).json(patientStats);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

managerRouter.get(
  "/doctor/stats",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const doctorStats = await managerService.getDoctorStats();
      res.status(200).json(doctorStats);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

managerRouter.get(
  "/counselor/stats",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const counselorStats = await managerService.getCounselorStats();
      res.status(200).json(counselorStats);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

managerRouter.get(
  "/assessment/stats",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const assessmentStats = await managerService.getAssessmentStats();
      res.status(200).json(assessmentStats);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

managerRouter.get(
  "/appointment/stats",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const appointmentStats = await managerService.getAppointmentStats();
      res.status(200).json(appointmentStats);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

export default managerRouter;
