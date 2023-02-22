import express from 'express';
import dotenv from 'dotenv';
import {isAuthenticated} from './middleware/auth';
import authRouter from './controller/auth/auth.controller';
import userRouter from './controller/user/user.controller';


dotenv.config()
const app = express();
app.use(express.json());


app.get('/', async(req, res) => {res.json('welcome!!')});
app.use("/api/v1/auth", authRouter);
app.use(isAuthenticated);
app.use("/api/v1/user", userRouter);


const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server running on port ${port} !!`),
)