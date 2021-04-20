import { Response } from "express";
import { Connection, Repository, createConnection } from "typeorm";
import { connectDB } from "../db/databaseConn";
import { User } from "../entity/User";
import { UserRequest } from "../interfaces/Interfaces";

export const dashboardController = (req: UserRequest, res: Response) => {
  // return authorized user information;
  connectDB.then( async(connection: Connection) => {
    const userRepository: Repository<User> = connection.getRepository(User);

    const user: User = await userRepository.findOne({
      where: [
        {id : req.user.id}
      ]
    });

    const userData = {
      id: user.id, 
      firstName: user.firstName, 
      lastName: user.lastName, 
      email: user.email
    }
    res.status(200).json(userData);
  });
};