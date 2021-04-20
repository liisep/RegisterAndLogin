import express, { Router, Response } from "express";
import { UserRequest } from "../interfaces/Interfaces";
import { authorize } from "../middleware/authorize";
import { dashboardController } from "../controllers/dashboardController";

const router: Router = express.Router();

router.get("/", authorize, async(req: UserRequest, res: Response) => {
  try {
    dashboardController(req, res);
  } 
  catch(err) {
    res.status(500).json("Server error!");
  }
});

module.exports = router;