import { Request, Response } from "express";
import user from "../model/UserModel";
import IUser from "../interface/UserInterface";
import { handleError } from "../utils/ErrorHandler";

export const signup = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    let newUser = await user.create({
      name,
      email,
      phoneNumber,
      password,
    });

    if (newUser) {
      res.send(newUser);
    } else {
      res.json({
        error: "Error occurred while creating user",
      });
    }
  } catch (err: any) {
    let error = handleError(err);
    res.json(error);
  }
};
