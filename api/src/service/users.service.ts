const bcrypt = require('bcrypt');
import * as JWT from '../util/jwt';
const {PrismaClient} = require('@prisma/client');
const db = new PrismaClient();

async function createUser(user: any){

    user.password = bcrypt.hashSync(user.password, 10);

    return await db.users.create({
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
          address: user.address,
          role: user.role
        }
    });
}

async function findUserByEmail(email: any){
    return await db.users.findUnique({
        where: {
            email: email
        }
    });
}

async function findUserById(id: any){
    return await db.users.findUnique({
        where: {
            user_id: id
        }
    });
}

async function getAllUser(){
    return await db.users.findMany();
}

async function login(user: any){
    const existingUser =  await findUserByEmail(user.email);

    const isValidPassword = await bcrypt.compare(user.password, existingUser.password);

    if(isValidPassword){
        let JWTtoken = JWT.generateAccessToken(existingUser);
        return {access_token: JWTtoken};
    }else {
        return null;
    }

}

export { 
    createUser,
    findUserByEmail,
    login,
    findUserById,
    getAllUser
}