import express from "express";
import * as counselorService from "../../service/counselor.service";
import * as userService from "../../service/user.service";
const counselorRouter = express.Router();

counselorRouter.post("/appointment", async (req, res) => {
  const { medicalStaff_Id, patient_Id, details, appointmentDate } = req.body;

  const user = await userService.findUserById(medicalStaff_Id);
  if (!user) {
    return res.status(404).send("User record not found");
  }

  try {
    const appointment = await counselorService.createAppointment(
      medicalStaff_Id,
      patient_Id,
      details,
      appointmentDate,
      user
    );
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create appointment");
  }
});

export default counselorRouter;
