import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductUseController {
   async handleSendCreate(req: Request, res: Response) {
      const { title, price, description, imageUrl } = req.body;
      const createProductUseCase = new CreateProductUseCase();
      const data_result = await createProductUseCase.createProducts({
         title,
         price,
         description,
         imageUrl
      });

      return res.status(201).json(data_result);

   }
}