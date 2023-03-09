import mongoose from "mongoose";
import IUser from "../interface/UserInterface";
import Schema = mongoose.Schema;
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already exists"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number required"],
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  paymentId: [String],
});

userSchema.pre<IUser>("save", async function (next) {
  let payId = await uuidv4();
  this.paymentId.push(payId);
  next();
});

const user = mongoose.model<IUser>("user", userSchema);

export default user;
