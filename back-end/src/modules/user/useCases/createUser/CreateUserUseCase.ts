
import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ICreateUser } from "../../interfaces/ICreateUser";
import { ServerError } from "../../../../error/ServerError";


export class CreateUserUseCase {
   async executeCreationNewUser({name, email, password}: ICreateUser): Promise<User> {
      // TODO: Validando usuário existente!
      const userAlreadyExisting = await prisma.user.findUnique({
         where: {
            email
         }
      });

      if(userAlreadyExisting) {
         throw new ServerError("Existing User!");
      }

      //TODO: Criando usuário no banco
      const user = await prisma.user.create({
         data: {
            name,
            email,
            password
         }
      });

      return user;
   }
}