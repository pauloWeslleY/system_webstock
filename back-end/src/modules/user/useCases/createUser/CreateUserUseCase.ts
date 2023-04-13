
import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ICreateUser } from "../../interfaces/ICreateUser";
import { ServerError } from "../../../../error/ServerError";

export class CreateUserUseCase {
   async createUser({name, email}: ICreateUser): Promise<User> {

      const userAlreadyExists = await prisma.user.findUnique({
         where: {
            email
         }
      });

      if (userAlreadyExists) {
         throw new ServerError("Existing User!!!");
      }

      //TODO: Criando Produto no banco
      const user = await prisma.user.create({
         data: {
            name,
            email,
         }
      });

      return user;
   }
}