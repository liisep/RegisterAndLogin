import { Request, Response } from "express";
import { Connection, Repository, createConnection } from "typeorm";
import bcrypt from "bcrypt";
import { connectDB } from "../db/databaseConn";
import { User } from "./../entity/User";
import { jwtGenerator } from "../utils/jwtGenerator";
import { RegObj } from "../interfaces/Interfaces";

export const registerController = (req: Request, res: Response) => {
  connectDB.then(async (connection: Connection) => {
    const userRepository: Repository<User> = connection.getRepository(User);

    // 1. destructure the req.body (name, email, password)
    const { firstName, lastName, email, password }: RegObj = req.body;

    //2. check if user exist
    const user: User = await userRepository.findOne({
      where: [
        { email: email },
      ]
    })

    if (user === undefined) {
      //3. Bcrypt the user password
      const saltRound: number = 10;
      const salt: string = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      //4. Enter the new user inside our db
      const userData: RegObj = req.body;
      const newUser = await userRepository.create({
        ...userData,
        password: bcryptPassword,
      });
      await userRepository.save(newUser);

      //5. generating jwt token
      const jwt_token = jwtGenerator(newUser.id);
      return res.status(200).json({jwt_token})
      //return res.json(results);
    } else if (user.email !== undefined) {
      // if user exist then throw error
      return res.status(401).json("User already exist!");
    }  
  });
}