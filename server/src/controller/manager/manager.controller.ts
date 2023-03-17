import express from "express";
import * as managerService from "../../service/managers.service";
import { authorizeRoles } from "../../middleware/auth";
const managerRouter = express.Router();

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

managerRouter.get(
  "/getallusers",
  authorizeRoles("manager"),
  async (req, res) => {
    try {
      const patients = removePasssword(await managerService.getAllUsers());
      res.status(200).json(patients);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something went wrong");
    }
  }
);

function removePasssword(users: any[]) {
  users.forEach((user) => {
    delete user.password;
  });
  return users;
}

export default managerRouter;
