import { Request, Response, NextFunction } from 'express';
import { RegObj } from "../interfaces/Interfaces";
import { validEmail } from "../utils/validEmail";

export const validInfo = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password }: RegObj = req.body;

  if (req.path === "/register") {
    if (![firstName, lastName, email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials!");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email!");
    }
  } 
  else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials!");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email!");
    }
  }

  next();
};