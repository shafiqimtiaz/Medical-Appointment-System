import express from "express";
import * as userService from "../../service/user.service";
const authRouter = express.Router();

authRouter.post("/registration", async (req, res) => {
  try {
    const existingUser = await userService.findUserByEmail(req.body.email);

    if (!existingUser) {
      const newUser = await userService.createUser(req.body);
      console.log(newUser);
      let role = newUser.role.toLowerCase();

      if (role == "manager") {
        const newManager = await userService.createManager(newUser.user_id);
        console.log(newManager);
      } else if (role == "patient") {
        const newPatients = await userService.createPatients(
          newUser.user_id,
          req.body
        );
        console.log(newPatients);
      } else if (role == "medical_staff") {
        const newMedical = await userService.createMedicalStaff(
          newUser.user_id,
          req.body
        );
        console.log(newMedical);
      }

      delete newUser.password;
      res.json(newUser);
    } else {
      res.status(409);
      res.json("User Already Exist");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration Failed");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const accesstoken = await userService.login(req.body);

    if (!accesstoken) {
      res.status(403);
      res.json("Invalid credentials.");
    } else {
      res.json(accesstoken);
    }
  } catch (err) {
    res.status(500).send("Login Failed");
  }
});

export default authRouter;
