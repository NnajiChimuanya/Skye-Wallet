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
exports.deleteId = exports.generateNewId = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const ErrorHandler_1 = require("../utils/ErrorHandler");
const uuid_1 = require("uuid");
const generateNewId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                if (client.paymentId.length <= 4) {
                    let newId = yield (0, uuid_1.v4)();
                    client.paymentId.push(newId);
                    client
                        .save()
                        .then((data) => res.json(data))
                        .catch((err) => {
                        let error = (0, ErrorHandler_1.handleError)(err);
                        res.json(error);
                    });
                }
                else {
                    res.json({
                        status: "error",
                        error: "Maximum amount of Payment Id created",
                    });
                }
            }
            else {
                throw Error("Invalid password");
            }
        }
        else {
            throw Error("Email not found");
        }
    }
    catch (err) {
        let errorMessage = (0, ErrorHandler_1.handleError)(err);
        res.json({
            status: "error",
            error: errorMessage,
        });
    }
});
exports.generateNewId = generateNewId;
const deleteId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, id } = req.body;
    let client = yield UserModel_1.default.findOne({ email });
    try {
        if (client) {
            if (password === (client === null || client === void 0 ? void 0 : client.password)) {
                if (client.paymentId.length > 1) {
                    let indexOfId = client.paymentId.indexOf(id);
                    console.log(indexOfId);
                    if (indexOfId >= 0) {
                        let popped = client.paymentId.splice(indexOfId, 1);
                        console.log(client.paymentId);
                        client
                            .save()
                            .then((data) => res.json({
                            status: "success",
                            paymentId: client === null || client === void 0 ? void 0 : client.paymentId,
                        }))
                            .catch((err) => {
                            let errorMessage = (0, ErrorHandler_1.handleError)(err);
                            res.json({
                                status: "error",
                                error: errorMessage,
                            });
                        });
                    }
                    else {
                        throw Error("Id does not exist");
                    }
                }
                else {
                    res.json({
                        status: "error",
                        error: "Minimum 1 payment Id required",
                    });
                }
            }
            else {
                throw Error("Invalid password");
            }
        }
        else {
            throw Error("Email not found");
        }
    }
    catch (err) {
        let errorMessage = (0, ErrorHandler_1.handleError)(err);
        res.json({
            status: "error",
            error: errorMessage,
        });
    }
});
exports.deleteId = deleteId;
