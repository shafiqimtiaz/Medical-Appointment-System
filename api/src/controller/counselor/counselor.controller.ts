import express from "express";
import * as counselorService from "../../service/counselor.service";
import * as userService from "../../service/user.service";
const counselorRouter = express.Router();

counselorRouter.post("/appointment", async (req, res) => {
  const { medicalStaffId, patientId, details, appointmentDate } = req.body;
  const medicalStaff = await userService.findStaffById(medicalStaffId);
  if (!medicalStaff) {
    return res.status(404).send("Medical_staff record not found");
  }
  try {
    const appointment = await counselorService.createAppointment(
      medicalStaffId,
      patientId,
      details,
      appointmentDate,
      "counselor"
    );
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create appointment" });
  }
});

export default counselorRouter;
