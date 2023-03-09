import express, { Router } from "express";
import { signup } from "../controller/authController";

const authRouter: Router = express.Router();

authRouter.post("/signup", signup);

export default authRouter;
