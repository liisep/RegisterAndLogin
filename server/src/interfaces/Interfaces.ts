import { Request } from 'express';

export interface RegObj {
  firstName: string,
  lastName: string,
  email: string,
  password: string
};

export interface LoginObj {
  email: string,
  password: string
};

export interface UserRequest extends Request {
  user: {
    id: number
  } 
};

export interface UserPayload {
  user: {
    id: number
  }
};
