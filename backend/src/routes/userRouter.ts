import { Request, Response } from "express";
import user from "../model/UserModel";
import { handleError } from "../utils/ErrorHandler";
import { v4 as uuidv4 } from "uuid";

export const generateNewId = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let client = await user.findOne({ email });

  try {
    if (client) {
      if (password === client?.password) {
        if (client.paymentId.length <= 4) {
          let newId = await uuidv4();
          client.paymentId.push(newId);
          client
            .save()
            .then((data) => res.json(data))
            .catch((err: any) => {
              let error = handleError(err);
              res.json(error);
            });
        } else {
          res.json({
            error: "Maximum amount of Payment Id created",
          });
        }
      } else {
        throw Error("Invalid password");
      }
    } else {
      throw Error("Email not found");
    }
  } catch (err: any) {
    let error = handleError(err);
    res.json(error);
  }
};
