import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserUseController {
   async handleSendCreate(req: Request, res: Response) {
      const { name, email } = req.body;
      const createProductUseCase = new CreateUserUseCase();
      const data_result = await createProductUseCase.createUser({
         name,
         email
      });

      return res.status(201).json(data_result);

   }
}