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
exports.signup = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phoneNumber, password } = req.body;
    try {
        let newUser = yield UserModel_1.default.create({
            name,
            email,
            phoneNumber,
            password,
        });
        if (newUser) {
            res.send(newUser);
        }
        else {
            res.json({
                error: "Error occurred while creating user",
            });
        }
    }
    catch (err) {
        let error = (0, ErrorHandler_1.handleError)(err);
        res.json(error);
    }
});
exports.signup = signup;
