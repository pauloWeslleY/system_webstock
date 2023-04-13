
import { Product } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ICreateProduct } from "../../interfaces/ICreateProduct";
import { ServerError } from "../../../../error/ServerError";

export class CreateProductUseCase {
   async createProducts({name, price, description, id}: ICreateProduct): Promise<Product> {

      const productAlreadyExists = await prisma.product.findUnique({
         where: {
            id
         }
      });

      // TODO: Validando se o produto já existe
      if (productAlreadyExists) {
         throw new ServerError("Existing product!!");
      }

      //TODO: Criando Produto no banco
      const product = await prisma.product.create({
         data: {
            name,
            price,
            description,
         }
      });

      return product;
   }
}