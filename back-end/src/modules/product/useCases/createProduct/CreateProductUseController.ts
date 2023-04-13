import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductUseController {
   async handleSendCreate(req: Request, res: Response) {
      const { name, price, description } = req.body;
      const createProductUseCase = new CreateProductUseCase();
      const data_result = await createProductUseCase.createProducts({
         name,
         price,
         description
      });

      return res.status(201).json(data_result);

   }
}