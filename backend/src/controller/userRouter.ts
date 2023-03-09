import express, { Router } from "express";
import { generateNewId } from "../routes/userRouter";

const userRouter: Router = express.Router();

userRouter.post("/generateNewId", generateNewId);

export default userRouter;
