"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("../routes/userRouter");
const userRouter = express_1.default.Router();
userRouter.post("/generateNewId", userRouter_1.generateNewId);
exports.default = userRouter;
