import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserUseController {
   async handleSendCreateUser(request: Request, response: Response) {
      const { name, email, password } = request.body;
      const createProductUseCase = new CreateUserUseCase();
      const data_result = await createProductUseCase.executeCreationNewUser({
         name,
         email,
         password
      });

      return response.status(201).json(data_result);
   }
}