import express, { Router } from "express";
import { generateNewId, deleteId } from "../routes/userRouter";

const userRouter: Router = express.Router();

userRouter.post("/generateNewId", generateNewId);

userRouter.post("/deleteId", deleteId);

export default userRouter;
