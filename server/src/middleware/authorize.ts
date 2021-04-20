import { Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UserRequest } from "../interfaces/Interfaces";

dotenv.config();

export const authorize = async(req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const jwtToken = req.header("jwt_token");

    if(!jwtToken) {
      return res.status(403).json("Not authorized!");
    }

    const payload: any = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;

    next();
  } 
  catch (err) {
    return res.status(403).json("Not authorized!");
  }
}