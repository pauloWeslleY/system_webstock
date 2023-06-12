import { User } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ICreateUser } from "../interfaces/ICreateUser";
import { ServerError } from "../../../error/ServerError";

export class UsersUseCase {
  async executeCreationUser({
    name,
    email,
    password,
  }: ICreateUser): Promise<User> {
    // TODO: Validando usuário existente!
    const userAlreadyExisting = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExisting) {
      throw new ServerError("Existing User!");
    }

    try {
      //TODO: Criando usuário no banco
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return user;
    } catch (error) {
      throw new ServerError("Failed to create user!");
    }
  }

  /*
      TODO: Atualizando usuário
   */
  async executeUpdateUser({ id, name, email, password }: ICreateUser) {
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new ServerError("Failed to update user!");
    }
  }

  /*
      TODO: Deletando usuário
   */
  async executeDeleteUser({ id }: { id: string }) {
    try {
      const user = await prisma.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (err) {
      throw new ServerError("Failed to delete user!");
    }
  }

  /*
      TODO: Consultando todos os usuários
   */
  async executeReadUser(): Promise<User[]> {
    const getUsers = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return getUsers;
  }
}
