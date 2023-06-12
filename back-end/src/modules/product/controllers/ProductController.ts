import { Request, Response } from "express";
import { ProductUseCase } from "../useCases/ProductUseCase";
import { z } from "zod";
import { ServerError } from "../../../error/ServerError";

const productUseCase = new ProductUseCase();

export class ProductController {
  /*
      TODO: Fazendo requisição e enviando produtos pro db
   */
  async handleCreateProduct(request: Request, response: Response) {
    try {
      const createProductBody = z.object({
        title: z.string(),
        price: z.number(),
        description: z.string(),
        imageUrl: z.array(z.string()),
        category_id: z.string(),
        quantity: z.number(),
      });

      const { title, price, description, imageUrl, category_id, quantity } =
        createProductBody.parse(request.body);
      const data = await productUseCase.executeCreateProducts({
        title,
        price,
        description,
        imageUrl,
        category_id,
        quantity,
      });

      return response.status(201).json(data);
    } catch (err) {
      throw new ServerError("Failed to create this product!");
    }
  }

  /*
      NOTE: Deletando produto no db
   */
  async handleDeleteProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const delProduct = await productUseCase.executeDeleteProduct({ id });

      response.status(200).json({
        message: `Product with ID ${id} has been deleted!`,
        delProduct,
      });
    } catch (err) {
      response.status(500).json({
        message: "Could not delete this product!",
      });
    }
  }

  /*
      TODO: Atualizando produto no db
   */
  async handleUpdateProduct(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { title, price, description, imageUrl, category_id, quantity } =
        request.body;
      const updateProduct = await productUseCase.executeUpdateProduct({
        id,
        title,
        price,
        description,
        imageUrl,
        category_id,
        quantity,
      });

      console.log("YOU HERE ==> ", JSON.stringify(updateProduct));
      return response.status(200).json({
        message: `Product with ID ${id} has been update!`,
        updateProduct,
      });
    } catch (error) {
      response.status(500).json({
        message: "Could not update this product!",
      });
    }
  }

  /*
      NOTE: Consultando todos produtos no db
   */
  async handleReadProduct(request: Request, response: Response) {
    const result = await productUseCase.executeReadProduct();

    return response.status(201).json(result);
  }
}
