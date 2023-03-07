import express from "express";
import * as counselorService from "../../service/counselor.service";
import * as userService from "../../service/user.service";
import {authorizeRoles} from "../../middleware/auth";
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

export default counselorRouter;
