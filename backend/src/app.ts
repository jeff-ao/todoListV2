import express, { Request, Response } from "express";
import userRouter from "./router/userRouter";

const app = express();
const port: number = 3000;

app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
