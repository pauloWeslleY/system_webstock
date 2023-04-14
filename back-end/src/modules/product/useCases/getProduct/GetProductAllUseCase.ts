import { Product } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetProductAllUseCase {
   async getProduct(): Promise<Product[]> {
      const productsAll = await prisma.product.findMany({
         orderBy: {
            title: "asc"
         }
      });

      return productsAll;
   }
}