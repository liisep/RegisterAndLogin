import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UserPayload } from "../interfaces/Interfaces";

dotenv.config();

export const jwtGenerator = (user_id: number) =>  {
  const payload: UserPayload = {
    user: {
      id: user_id
    }
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
};