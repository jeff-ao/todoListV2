import { z } from "zod";

// User schemas
export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .trim()
    .transform((name) => name.replace(/\s+/g, " ")),
  email: z
    .string()
    .email("Email inválido")
    .trim()
    .toLowerCase()
    .max(255, "Email deve ter no máximo 255 caracteres"),
  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Email inválido").trim().toLowerCase(),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório").trim(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Cor deve estar no formato hexadecimal (#RRGGBB)")
    .optional()
    .default("#3B82F6"),
  user_id: z
    .number()
    .int()
    .positive("ID do usuário deve ser um número positivo"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Nome da categoria é obrigatório").trim(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, "Cor deve estar no formato hexadecimal (#RRGGBB)")
    .optional(),
});

export const getCategoriesSchema = z.object({
  user_id: z.string().transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num <= 0) {
      throw new Error("ID do usuário deve ser um número positivo");
    }
    return num;
  }),
});

// Task schemas
export const createTaskSchema = z.object({
  task: z.string().min(1, "Descrição da tarefa é obrigatória").trim(),
  category_id: z
    .number()
    .int()
    .positive("ID da categoria deve ser um número positivo")
    .nullable()
    .optional(),
  user_id: z
    .number()
    .int()
    .positive("ID do usuário deve ser um número positivo"),
});

export const updateTaskSchema = z.object({
  task: z.string().min(1, "Descrição da tarefa é obrigatória").trim(),
  category_id: z
    .number()
    .int()
    .positive("ID da categoria deve ser um número positivo")
    .nullable()
    .optional(),
});

export const getTasksSchema = z.object({
  user_id: z.string().transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num <= 0) {
      throw new Error("ID do usuário deve ser um número positivo");
    }
    return num;
  }),
  order_by: z.enum(["asc", "desc"]).optional().default("desc"),
});

// ID parameter schema
export const idParamSchema = z.object({
  id: z.string().transform((val) => {
    const num = parseInt(val);
    if (isNaN(num) || num <= 0) {
      throw new Error("ID deve ser um número positivo");
    }
    return num;
  }),
});

// Types
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type GetCategoriesInput = z.infer<typeof getCategoriesSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTasksInput = z.infer<typeof getTasksSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
