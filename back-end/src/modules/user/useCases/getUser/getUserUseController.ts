import { Request, Response } from "express";
import { GetUserUseCase } from "./getUserUserCase";

export class GetUserUseController {
   async handleGetUsers(request: Request, response: Response){
      const getUserUseCase = new GetUserUseCase();
      const result = await getUserUseCase.getUser();

      return response.status(201).json(result);
   }
}