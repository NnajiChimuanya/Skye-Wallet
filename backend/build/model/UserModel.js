"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
const uuid_1 = require("uuid");
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
    balance: Number,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let payId = yield (0, uuid_1.v4)();
        this.paymentId.push(payId);
        this.balance = 5000;
        next();
    });
});
const user = mongoose_1.default.model("user", userSchema);
exports.default = user;
