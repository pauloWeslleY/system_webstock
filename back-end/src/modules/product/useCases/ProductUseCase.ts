import { Product } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { ICreateProduct } from "../interfaces/ICreateProduct";
import { ServerError } from "../../../error/ServerError";
import dayjs from "dayjs";

const today = dayjs().startOf("day").toDate();
export class ProductUseCase {
  async executeCreateProducts({
    title,
    price,
    description,
    quantity,
    category_id,
    imageUrl,
  }: ICreateProduct): Promise<Product> {
    //TODO: Validando e verificando se o produto já existe no banco
    const productAlreadyExisting = await prisma.product.findUnique({
      where: {
        title,
      },
    });

    //TODO: Validação se o produto já é existente no banco
    if (productAlreadyExisting) {
      throw new ServerError("Existing product!");
    }

    try {
      //TODO: Criando Produto no banco
      const product = await prisma.product.create({
        data: {
          title,
          price,
          description,
          imageUrl: {
            create: imageUrl?.map((url) => {
              return {
                image_url: url,
              };
            }),
          },
          category_id,
          quantity,
          created_at: today,
        },
        include: {
          imageUrl: true,
        },
      });

      return product;
    } catch (error) {
      throw new ServerError("Failed to create product!");
    }
  }

  // TODO: Deletando produtos
  async executeDeleteProduct({ id }: { id: string }) {
    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id,
        },
      });

      return deletedProduct;
    } catch (err) {
      throw new ServerError("Failed to delete product!");
    }
  }

  // TODO: Atualizando produtos
  async executeUpdateProduct({
    id,
    title,
    price,
    description,
    quantity,
    category_id,
    imageUrl,
  }: ICreateProduct): Promise<Product> {
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id,
        },
        data: {
          title,
          price,
          description,
          quantity,
          category_id,
          imageUrl: {
            create: imageUrl?.map((urlUpdate) => {
              return {
                image_url: urlUpdate,
              };
            }),
          },
        },
        include: {
          imageUrl: true,
        },
      });

      return updatedProduct;
    } catch (error) {
      throw new ServerError("Failed to update this product!");
    }
  }

  // TODO: Consultando produtos
  async executeReadProduct(): Promise<Product[]> {
    const productsAll = await prisma.product.findMany({
      orderBy: {
        title: "asc",
      },
      include: {
        imageUrl: true,
        category: true,
      },
    });

    return productsAll;
  }
}
