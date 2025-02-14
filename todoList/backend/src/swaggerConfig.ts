import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List",
      version: "2.0.0",
      description: "API docs",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "local server",
      },
    ],
  },
  apis: ["./src/router/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
