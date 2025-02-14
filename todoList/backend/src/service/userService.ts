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
      if (!name.trim() || !email.trim() || !password.trim()) {
        return { error: "por favor,preencher todos os campos" };
      }
      if (name.length < 3 || !validator.isAlpha(name))
        return { error: "nome invalido" };

      if (
        !validator.isEmail(email) ||
        (await prisma.user.findFirst({
          where: { email: email },
        }))
      ) {
        return { error: "email invalido" };
      }

      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minSymbols: 1,
          minUppercase: 1,
          minNumbers: 3,
        })
      ) {
        return { error: "senha fraca" };
      }

      const newUser: object = await prisma.user.create({
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

      if (!user) return { error: "dados incorretor ou usuario não existe" };

      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },
};

export default userService;
