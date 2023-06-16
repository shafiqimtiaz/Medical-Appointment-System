import express from "express";
import dotenv from "dotenv";
import { isAuthenticated } from "./middleware/auth";
import authRouter from "./controller/auth/auth.controller";
import userRouter from "./controller/user/user.controller";
import patientRouter from "./controller/patient/patient.controller";
import counselorRouter from "./controller/counselor/counselor.controller";
import managerRouter from "./controller/manager/manager.controller";
import doctorRouter from "./controller/doctor/doctor.controller";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use(isAuthenticated);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/counselor", counselorRouter);
app.use("/api/v1/manager", managerRouter);
app.use("/api/v1/doctor", doctorRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port} !!`));
