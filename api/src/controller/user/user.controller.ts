import express from "express";
import * as userService from "../../service/user.service";
const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
  try {
    let user = await userService.findUserById(+req.params.id);
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch user");
  }
});

userRouter.get("/manager/:id", async (req, res) => {
  try {
    let manager = await userService.findManagerById(+req.params.id);
    if (manager) {
      manager.user = await userService.findUserById(manager.manager_id);
      delete manager.user.password;
    }
    res.json(manager);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch manager");
  }
});

userRouter.get("/patient/:id", async (req, res) => {
  try {
    let patient = await userService.findPatientById(+req.params.id);
    if (patient) {
      patient.user = await userService.findUserById(patient.patient_id);
      delete patient.user.password;
    }
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch patient");
  }
});

userRouter.get("/staff/:id", async (req, res) => {
  try {
    let staff = await userService.findStaffById(+req.params.id);
    if (staff) {
      staff.user = await userService.findUserById(staff.medical_staff_id);
      staff.license_number = staff.license_number.toString();
      delete staff.user.password;
    }
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch medical staff");
  }
});

export default userRouter;
