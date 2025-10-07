import { Prisma, PrismaClient, Task, User } from "@prisma/client";

const prisma = new PrismaClient();

const taskService = {
  createTask: async (
    task: string,
    category_id: number | null,
    user_id: number
  ): Promise<Task | object> => {
    try {
      // Verificar se o usuário existe
      if (!(await prisma.user.findFirst({ where: { id: user_id } }))) {
        return { error: "usuário não existe" };
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
        return { error: "usuário não encontrado" };
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

      return updatedTask;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  editCompleted: async (id: number): Promise<Task | object> => {
    try {
      const task: Task | null = await prisma.task.findFirst({ where: { id } });

      if (!task) {
        return { error: "tarefa não encontrada" };
      }

      const completedEdited: Task = await prisma.task.update({
        where: {
          id,
        },
        data: {
          completed: !task.completed,
        },
        include: {
          Category: true,
        },
      });

      return completedEdited;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  deleteTask: async (id: number): Promise<object> => {
    try {
      // Verificar se a tarefa existe antes de tentar deletar
      const existingTask = await prisma.task.findFirst({ where: { id } });

      if (!existingTask) {
        return { error: "tarefa não encontrada" };
      }

      await prisma.task.delete({
        where: { id },
      });

      return { message: "tarefa deletada com sucesso" };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
};

export default taskService;
