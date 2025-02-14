import express from "express";
import cors from "cors";
import userRouter from "./router/userRouter";
import taskRouter from "./router/taskRoute";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerConfig";

const app = express();
const port: number = 3003;

app.use(express.json());
app.use(cors());

// Rota do Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(
    `📄 Documentação disponível em: http://localhost:${port}/api-docs`
  );
});
