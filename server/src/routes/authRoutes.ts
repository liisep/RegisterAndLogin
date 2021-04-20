import express, { Router, Request, Response } from "express";
import { registerController } from "../controllers/registerController";
import { validInfo } from "../middleware/validInfo";
import { authorize } from "../middleware/authorize";
import {loginController } from "../controllers/loginController";

const router: Router = express.Router();

// Register
router.post("/register", validInfo, async(req: Request, res: Response) => {
  try {
    registerController(req, res);
  } catch(err) {
    res.status(500).json(err.message);;
  }
});

// Login
router.post("/login", validInfo, async(req: Request, res: Response) => {
  try {
    loginController(req, res);
  } 
  catch(err) {
    res.status(500).json(err.message);
  }
});

// Is token verify
router.get("/is-verify", authorize, async(req: Request, res: Response) => {
  try {
    res.status(200).json(true);

  } 
  catch (err) {
    res.status(500).json(err.message);;
  }
});

module.exports = router;