import express from "express";
import {
  approveRegistration, deletePatient,
  getUnapprovedRegistrations,
  rejectRegistration
} from "../../service/managers.service";
const managerRouter = express.Router();

const checkAuthorization = (req: any) => {
  // TODO: check if user is a manager
  if (req.token)
    return true;

  return false;
}

managerRouter.get("/newRegistrations", async (req, res) => {
  if (!checkAuthorization(req)) return res.status(401).send("Unauthorized");
  try {
    let newRegistrations = await getUnapprovedRegistrations();
    res.json(newRegistrations);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
})

managerRouter.get("/approveRegistration/:id", async (req, res) => {
  if (!checkAuthorization(req)) return res.status(401).send("Unauthorized");
  try {
    await approveRegistration(+req.params.id);
    res.json("Registration approved");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

managerRouter.get("/denyRegistration/:id", async (req, res) => {
  if (!checkAuthorization(req)) return res.status(401).send("Unauthorized");
  try {
    await rejectRegistration(+req.params.id);
    res.json("Registration denied");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

managerRouter.get("/deletePatient/:id", async (req, res) => {
  if (!checkAuthorization(req)) return res.status(401).send("Unauthorized");
  try {
    await deletePatient(+req.params.id);
    res.json("Patient deleted");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
  }
});

export default managerRouter;