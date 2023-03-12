"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
if (cluster_1.default.isMaster) {
    const cpus = os_1.default.cpus().length;
    console.log(`Forking for ${cpus}`);
    for (let i = 0; i < cpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(` worker ${worker.process.pid} died`);
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`worker ${worker.id} crashed`);
            console.log(`Starting new worker`);
            cluster_1.default.fork();
        }
    });
}
else {
    const app = (0, express_1.default)();
    const port = process.env.PORT || 3001;
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE, OPTIONS",
        credentials: true,
    }));
    app.get("/", (req, res) => {
        console.log("Skye Wallet user microservice");
        res.send("Skye Wallet user microservice");
    });
    app.use("/auth", authRouter_1.default);
    app.use("/user", userRouter_1.default);
    mongoose_1.default
        .connect(process.env.mongo_uri)
        .then(() => console.log("connected to the database"))
        .catch((err) => console.log(err));
    app.listen(port, () => { var _a; return console.log(`${(_a = cluster_1.default.worker) === null || _a === void 0 ? void 0 : _a.id} Hello, server running`); });
}
