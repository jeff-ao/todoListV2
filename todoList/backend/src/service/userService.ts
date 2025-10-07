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
};

export default userService;
