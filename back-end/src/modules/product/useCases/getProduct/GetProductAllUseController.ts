import { Request, Response } from "express";
import { GetProductAllUseCase } from "./GetProductAllUseCase";

export class GetProductAllController {
   async handleGetProduct(request: Request, response: Response) {
      const getProductAllUseCase = new GetProductAllUseCase();
      const result = await getProductAllUseCase.getProduct();

      return response.status(201).json(result);
   }
}