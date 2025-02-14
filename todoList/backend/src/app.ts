import express, { Request, Response } from "express";
import userRouter from "./router/userRouter";
import taskRouter from "./router/taskRoute";
import cors from "cors";

const app = express();
const port: number = 3003;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`rodando na porta tudo certo!! ${port}`);
});
