import express, { Router } from "express";
import {
  generateNewId,
  deleteId,
  searchById,
  sendFunds,
} from "../routes/userRouter";

const userRouter: Router = express.Router();

userRouter.post("/generateNewId", generateNewId);

userRouter.post("/deleteId", deleteId);

userRouter.post("/searchById", searchById);

userRouter.post("/sendFunds", sendFunds);

export default userRouter;
