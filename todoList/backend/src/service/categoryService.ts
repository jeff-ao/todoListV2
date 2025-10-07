import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const categoryService = {
  createCategory: async (
    name: string,
    color: string = "#3B82F6",
    user_id: number
  ): Promise<any | object> => {
    try {
      // Verificar se o usuário existe
      if (!(await prisma.user.findFirst({ where: { id: user_id } }))) {
        return { error: "usuário não existe" };
      }

      // Verificar se a categoria já existe para este usuário
      const existingCategory = await prisma.category.findFirst({
        where: {
          name: name,
          user_id: user_id,
        },
      });

      if (existingCategory) {
        return { error: "categoria já existe para este usuário" };
      }

      const newCategory = await prisma.category.create({
        data: {
          name: name,
          color: color || "#3B82F6",
          user_id,
        },
      });

      return newCategory;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  getCategoriesByUserId: async (user_id: number): Promise<any[] | object> => {
    try {
      const user: User | null = await prisma.user.findFirst({
        where: { id: user_id },
      });

      if (!user) {
        return { error: "usuário não encontrado" };
      }

      const categories = await prisma.category.findMany({
        where: {
          user_id: user_id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return categories;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  editCategory: async (
    id: number,
    name: string,
    color?: string
  ): Promise<any | object> => {
    try {
      const existingCategory = await prisma.category.findFirst({
        where: { id },
      });

      if (!existingCategory) {
        return { error: "categoria não encontrada" };
      }

      // Verificar se já existe outra categoria com o mesmo nome para o mesmo usuário
      const duplicateCategory = await prisma.category.findFirst({
        where: {
          name: name,
          user_id: existingCategory.user_id,
          NOT: {
            id: id,
          },
        },
      });

      if (duplicateCategory) {
        return { error: "já existe uma categoria com este nome" };
      }

      const updateData: any = { name: name };
      if (color) {
        updateData.color = color;
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: updateData,
      });

      return updatedCategory;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  deleteCategory: async (id: number): Promise<object> => {
    try {
      // Verificar se a categoria existe antes de tentar deletar
      const existingCategory = await prisma.category.findFirst({
        where: { id },
      });

      if (!existingCategory) {
        return { error: "categoria não encontrada" };
      }

      // Verificar se existem tarefas usando esta categoria
      const tasksWithCategory = await prisma.task.findMany({
        where: { category_id: id },
      });

      if (tasksWithCategory.length > 0) {
        // Atualizar tarefas para não ter categoria antes de deletar
        await prisma.task.updateMany({
          where: { category_id: id },
          data: { category_id: null },
        });
      }

      await prisma.category.delete({
        where: { id },
      });

      return { message: "categoria deletada com sucesso" };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  },
};

export default categoryService;
