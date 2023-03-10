import { Request, Response } from "express";
import user from "../model/UserModel";
import IUser from "../interface/UserInterface";
import { handleError } from "../utils/ErrorHandler";
import { v4 as uuidv4 } from "uuid";

export const signup = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    let newUser = await user.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      paymentId: [uuidv4()],
      balance: 5000,
    });

    if (newUser) {
      res.send(newUser);
    } else {
      res.json({
        error: "Error occurred while creating user",
      });
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        console.log("Found user");
        res.json(client);
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let errorMessage = handleError(err);
    res.json({
      status: "error",
      error: errorMessage,
    });
  }
};
