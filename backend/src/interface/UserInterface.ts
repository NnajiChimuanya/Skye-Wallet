import { ObjectId } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  paymentId: string[];
}

export default IUser;
