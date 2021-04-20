import { Request, Response } from "express";
import { Connection, Repository, createConnection } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "./../entity/User";
import { connectDB } from "../db/databaseConn";
import { jwtGenerator } from "../utils/jwtGenerator";
import { LoginObj } from "../interfaces/Interfaces";

export const loginController = (req: Request, res: Response) => {
  connectDB.then( async(connection: Connection) => {
    const userRepository: Repository<User> = connection.getRepository(User);

    //1. destruction the req.body
    const {email, password} : LoginObj = req.body;

    //2. check if user exist (if don't exist throw error)
    const user: User = await userRepository.findOne({
      where: [
        {email: email}
      ]
    });

    if(user === undefined) {
      res.status(401).json("This email is not registered yet!");
    } 
    else if (user !== undefined) {
      //3. check if password is same as the database password (if not throw error, otherwise give token)
      const validPassword = await bcrypt.compare(password, user.password);

      if(!validPassword) res.status(401).json("Password is incorrect!");
      
      const jwt_token = jwtGenerator(user.id);
      res.status(200).json({jwt_token});
    }  
  });
};