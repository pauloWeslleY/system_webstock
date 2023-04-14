import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductUseController {
   async handleSendCreateProduct(request: Request, response: Response) {
      const { title, price, description, imageUrl } = request.body;
      const createProductUseCase = new CreateProductUseCase();
      const data = await createProductUseCase.createProducts({
         title,
         price,
         description,
         imageUrl
      });

      return response.status(201).json(data);
   }
}