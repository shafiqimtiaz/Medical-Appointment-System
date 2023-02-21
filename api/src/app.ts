import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import * as userService from './service/users.service';
import {isAuthenticated} from './middleware/auth';


dotenv.config()
const app = express();
app.use(express.json());


app.get('/', async(req, res) => {
    res.json('welcome!!');
});

app.post('/auth/registration', async (req, res) => {
    try{
      const existingUser = await userService.findUserByEmail(req.body.email);

      if(!existingUser){
        const newUser = await userService.createUser(req.body);
        res.json(newUser);
      }else{
        res.status(409);
        res.json("User Already Exist");
      }
    }catch(err){
        res.status(500).send('Something went wrong');
    }
});

app.post('/auth/login', async (req, res) => {
    try{
      const existingUser = await userService.login(req.body);

      if (!existingUser) {
          res.status(403);
          res.json('Invalid credentials.');
      }else{
          res.json(existingUser);
      }
    }catch(err){
        res.status(500).send('Something went wrong');
    }
});

app.use(isAuthenticated);

app.get('/user/:id', async (req, res) => {
    try{
        const user = await userService.findUserById(+req.params.id);
        console.log(user);
        res.json(user);
    }catch(err){
        console.error(err);
        res.status(500).send('Something went wrong');
    }
});


const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server running on port ${port} !!`),
)