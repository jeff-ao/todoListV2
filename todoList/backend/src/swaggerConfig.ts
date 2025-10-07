import swaggerJSDoc, { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "2.0.0",
      description: "API para gerenciamento de tarefas e categorias",
    },
    servers: [
      {
        url: "http://localhost:3003",
        description: "Servidor local",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único do usuário",
            },
            name: {
              type: "string",
              description: "Nome do usuário",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
            },
          },
        },
        Category: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único da categoria",
            },
            name: {
              type: "string",
              description: "Nome da categoria",
            },
            color: {
              type: "string",
              description: "Cor da categoria em hexadecimal",
              default: "#3B82F6",
            },
            user_id: {
              type: "integer",
              description: "ID do usuário proprietário",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
            },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único da tarefa",
            },
            task: {
              type: "string",
              description: "Descrição da tarefa",
            },
            user_id: {
              type: "integer",
              description: "ID do usuário proprietário",
            },
            category_id: {
              type: "integer",
              nullable: true,
              description: "ID da categoria (opcional)",
            },
            completed: {
              type: "boolean",
              default: false,
              description: "Status de conclusão da tarefa",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação",
            },
            Category: {
              $ref: "#/components/schemas/Category",
              description: "Dados da categoria associada",
            },
          },
        },
        CreateTaskRequest: {
          type: "object",
          required: ["task", "user_id"],
          properties: {
            task: {
              type: "string",
              description: "Descrição da tarefa",
            },
            category_id: {
              type: "integer",
              nullable: true,
              description: "ID da categoria (opcional)",
            },
            user_id: {
              type: "integer",
              description: "ID do usuário",
            },
          },
        },
        UpdateTaskRequest: {
          type: "object",
          required: ["task"],
          properties: {
            task: {
              type: "string",
              description: "Nova descrição da tarefa",
            },
            category_id: {
              type: "integer",
              nullable: true,
              description: "Novo ID da categoria (opcional)",
            },
          },
        },
        CreateCategoryRequest: {
          type: "object",
          required: ["name", "user_id"],
          properties: {
            name: {
              type: "string",
              description: "Nome da categoria",
            },
            color: {
              type: "string",
              description: "Cor da categoria em hexadecimal",
              default: "#3B82F6",
            },
            user_id: {
              type: "integer",
              description: "ID do usuário",
            },
          },
        },
        UpdateCategoryRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              description: "Novo nome da categoria",
            },
            color: {
              type: "string",
              description: "Nova cor da categoria em hexadecimal",
            },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              description: "Nome do usuário",
              minLength: 3,
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
              maxLength: 255,
            },
            password: {
              type: "string",
              description: "Senha do usuário",
              minLength: 8,
              maxLength: 100,
            },
          },
        },
        UpdateUserRequest: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Novo nome do usuário",
              minLength: 3,
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
              description: "Novo email do usuário",
              maxLength: 255,
            },
            password: {
              type: "string",
              description: "Nova senha do usuário",
              minLength: 8,
              maxLength: 100,
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
            },
            password: {
              type: "string",
              description: "Senha do usuário",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
            },
          },
        },
        SuccessMessage: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensagem de sucesso",
            },
          },
        },
      },
    },
  },
  apis: ["./src/router/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
