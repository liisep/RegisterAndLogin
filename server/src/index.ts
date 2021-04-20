import "reflect-metadata";
import express, { Application, Request, Response } from 'express';
import cors from "cors";

const authRoutes: NodeRequire = require("./routes/authRoutes");
const dashboardRoute: NodeRequire = require("./routes/dashboardRoute");

// create and setup express app
export const app: Application = express();
app.use(express.json());
app.use(cors());

// register routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

// register and login routes
app.use("/auth", authRoutes);

// dashboard route
app.use("/dashbrd", dashboardRoute);