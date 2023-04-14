
import { Product } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { ICreateProduct } from "../../interfaces/ICreateProduct";
import { ServerError } from "../../../../error/ServerError";

export class CreateProductUseCase {
   async createProducts({title, price, description}: ICreateProduct): Promise<Product> {

      // TODO: Validando e verificando se o produto já existe
      const productAlreadyExisting = await prisma.product.findUnique({
         where: {
            title,
         }
      });

      if (productAlreadyExisting) {
         throw new ServerError("Existing product!");
      }

      //TODO: Criando Produto no banco
      const products = await prisma.product.create({
         data: {
            title,
            price,
            description,
         }
      });

      return products;
   }
}