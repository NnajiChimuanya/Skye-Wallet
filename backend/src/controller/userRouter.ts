import express, { Router } from "express";
import { generateNewId, deleteId, searchById } from "../routes/userRouter";

const userRouter: Router = express.Router();

userRouter.post("/generateNewId", generateNewId);

userRouter.post("/deleteId", deleteId);

userRouter.post("/searchById", searchById);

export default userRouter;
