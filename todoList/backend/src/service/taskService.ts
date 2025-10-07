import { Prisma, PrismaClient, Task, User } from "@prisma/client";

const prisma = new PrismaClient();

const taskService = {
  createTask: async (
    task: string,
    category_id: number | null,
    user_id: number
  ): Promise<Task | object> => {
    try {
      if (typeof task !== "string" || typeof user_id !== "number") {
        return { error: "parametros invalidos" };
      }

      if (!(await prisma.user.findFirst({ where: { id: user_id } }))) {
        return { error: "usuario não existe" };
      }

      // Verificar se a categoria existe e pertence ao usuário (se category_id foi fornecido)
      if (category_id) {
        const category = await prisma.category.findFirst({
          where: {
            id: category_id,
            user_id: user_id,
          },
        });
        if (!category) {
          return { error: "categoria não existe ou não pertence ao usuário" };
        }
      }

      if (!task.trim() || !user_id) {
        return { error: "envie todos os campos obrigatorios" };
      }

      const newTask: Task = await prisma.task.create({
        data: {
          task,
          user_id,
          category_id,
        },
        include: {
          Category: true,
        },
      });

      if (!newTask) return { error: "erro ao cadastrar tarefa" };

      return newTask;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  timelineTasks: async (
    user_id: number,
    order_by: Prisma.SortOrder
  ): Promise<Task[] | object> => {
    try {
      const user: User | null = await prisma.user.findFirst({
        where: { id: user_id },
      });

      if (!user) {
        return { error: "usuario  não encontrado" };
      }

      const tasks: Task[] = await prisma.task.findMany({
        orderBy: {
          createdAt: order_by,
        },
        where: {
          user_id: user_id,
        },
        include: {
          Category: true,
        },
      });

      return tasks;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  editTask: async (
    id: number,
    task: string,
    category_id: number | null
  ): Promise<Task | object> => {
    try {
      if (!id || !task) return { error: "envie todos os campos" };

      // Verificar se a tarefa existe
      const existingTask = await prisma.task.findFirst({ where: { id } });
      if (!existingTask) {
        return { error: "tarefa não encontrada" };
      }

      // Verificar se a categoria existe e pertence ao usuário (se category_id foi fornecido)
      if (category_id) {
        const category = await prisma.category.findFirst({
          where: {
            id: category_id,
            user_id: existingTask.user_id,
          },
        });
        if (!category) {
          return { error: "categoria não existe ou não pertence ao usuário" };
        }
      }

      const updatedTask: Task = await prisma.task.update({
        where: { id },
        data: { task, category_id },
        include: {
          Category: true,
        },
      });

      if (!updatedTask) return { error: "erro ao atualizar tarefa" };

      return updatedTask;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  editCompleted: async (id: number): Promise<Task | object> => {
    try {
      if (!id) return { error: "envie todos campos obrigatorios" };
      const task: Task | null = await prisma.task.findFirst({ where: { id } });

      const completedEdited: Task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          completed: !task?.completed,
        },
        include: {
          Category: true,
        },
      });
      if (!completedEdited) {
        return { error: "error ao alterar completed" };
      }

      return completedEdited;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  deleteTask: async (id: number): Promise<object> => {
    try {
      if (!id || typeof id !== "number") return { error: "envie o id" };

      const taskDeleted: Task | null = await prisma.task.delete({
        where: { id },
      });

      if (!taskDeleted) {
        return { error: "erro ao apagar tarefa" };
      }

      return { message: "post deletado" };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
};

export default taskService;
