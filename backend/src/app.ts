import cluster from "cluster";
import os from "os";
import { workerData } from "worker_threads";

import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import userRouter from "./controller/userRouter";

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  console.log(`Forking for ${cpus}`);

  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(` worker ${worker.process.pid} died`);
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`worker ${worker.id} crashed`);
      console.log(`Starting new worker`);
      cluster.fork();
    }
  });
} else {
  const app: Express = express();
  const port = process.env.PORT || 3001;

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    console.log("Skye Wallet user microservice");
    res.send("Skye Wallet user microservice");
  });

  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  mongoose
    .connect(process.env.mongo_uri)
    .then(() => console.log("connected to the database"))
    .catch((err) => console.log(err));

  app.listen(port, () =>
    console.log(`${cluster.worker?.id} Hello, server running`)
  );
}
