import { PrismaClient, User } from "@prisma/client";
import validator from "validator";

const prisma = new PrismaClient();
interface UserDetails {
  id: number;
  name: string;
}

const userService = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<User | object> => {
    try {
      // Verificar se o email já existe
      const existingUser = await prisma.user.findFirst({
        where: { email: email },
      });

      if (existingUser) {
        return { error: "email já está sendo usado" };
      }

      // Validar força da senha
      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minSymbols: 1,
          minUppercase: 1,
          minNumbers: 3,
        })
      ) {
        return {
          error:
            "senha fraca - deve ter pelo menos 8 caracteres, 1 símbolo, 1 maiúscula e 3 números",
        };
      }

      const newUser: User = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      return newUser;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  login: async (email: string, password: string): Promise<User | object> => {
    try {
      const user: UserDetails | null = await prisma.user.findUnique({
        where: {
          email,
          password,
        },
        select: {
          id: true,
          name: true,
        },
      });

      if (!user) return { error: "dados incorretos ou usuário não existe" };

      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  getAllUsers: async (): Promise<User[] | object> => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return users;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  getUserById: async (id: number): Promise<User | object> => {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      if (!user) {
        return { error: "usuário não encontrado" };
      }

      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  updateUser: async (
    id: number,
    name?: string,
    email?: string,
    password?: string
  ): Promise<User | object> => {
    try {
      // Verificar se o usuário existe
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: "usuário não encontrado" };
      }

      // Preparar dados para atualização
      const updateData: any = {};

      if (name) {
        updateData.name = name;
      }

      if (email) {
        // Verificar se o email já está sendo usado por outro usuário
        const emailExists = await prisma.user.findFirst({
          where: {
            email: email,
            NOT: { id: id },
          },
        });

        if (emailExists) {
          return { error: "email já está sendo usado por outro usuário" };
        }

        updateData.email = email;
      }

      if (password) {
        // Validar força da senha
        if (
          !validator.isStrongPassword(password, {
            minLength: 8,
            minSymbols: 1,
            minUppercase: 1,
            minNumbers: 3,
          })
        ) {
          return {
            error:
              "senha fraca - deve ter pelo menos 8 caracteres, 1 símbolo, 1 maiúscula e 3 números",
          };
        }

        updateData.password = password;
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      return updatedUser;
    } catch (error: any) {
      return { error: error.message };
    }
  },

  deleteUser: async (id: number): Promise<object> => {
    try {
      // Verificar se o usuário existe
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      if (!existingUser) {
        return { error: "usuário não encontrado" };
      }

      // Verificar se o usuário tem tarefas ou categorias
      const userTasks = await prisma.task.findMany({
        where: { user_id: id },
      });

      const userCategories = await prisma.category.findMany({
        where: { user_id: id },
      });

      // Deletar todas as tarefas do usuário
      if (userTasks.length > 0) {
        await prisma.task.deleteMany({
          where: { user_id: id },
        });
      }

      // Deletar todas as categorias do usuário
      if (userCategories.length > 0) {
        await prisma.category.deleteMany({
          where: { user_id: id },
        });
      }

      // Deletar o usuário
      await prisma.user.delete({
        where: { id },
      });

      return { message: "usuário deletado com sucesso" };
    } catch (error: any) {
      return { error: error.message };
    }
  },
};

export default userService;
