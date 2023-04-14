import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetUserUseCase {
   async getUser(): Promise<User[]> {
      const getUsers = await prisma.user.findMany({
         orderBy: {
            name: "asc"
         }
      });

      return getUsers;
   }
}