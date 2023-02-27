import express from "express";
import * as managerService from "../../service/managers.service";
import { checkAuth } from "../../middleware/auth";
const managerRouter = express.Router();

managerRouter.get("/newRegistrations", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).send("Unauthorized");
  try {
    let newRegistrations = await managerService.getUnapprovedRegistrations();
    res.status(200).json(newRegistrations);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch new registrations");
  }
});

managerRouter.put("/approveRegistration/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).send("Unauthorized");
  try {
    const registration = await managerService.approveRegistration(
      +req.params.id
    );
    res.status(200).json(registration);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to approve registration");
  }
});

managerRouter.delete("/denyRegistration/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).send("Unauthorized");
  try {
    const registration = await managerService.rejectRegistration(
      +req.params.id
    );
    res.status(200).status(200).json({ Deleted: registration });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to deny registrations");
  }
});

managerRouter.delete("/deletePatient/:id", async (req, res) => {
  if (!checkAuth(req)) return res.status(401).send("Unauthorized");
  try {
    const patient = await managerService.deletePatient(+req.params.id);
    res.status(200).json({ Deleted: patient });
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
});

export default managerRouter;
