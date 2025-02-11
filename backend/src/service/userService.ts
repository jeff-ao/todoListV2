import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const userService = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<object> => {
    try {
      if (!(name || email || password).trim()) {
        return { error: "por favor,preencher todos os campos" };
      }
      const newUser: object = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return newUser;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  login: async (email: string, password: string): Promise<object> => {
    try {
      const user: User | null = await prisma.user.findUnique({
        where: {
          email: email,
          password: password,
        },
      });
      if (!user) return { error: "usuario não encontrado" };

      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },
};

export default userService;
