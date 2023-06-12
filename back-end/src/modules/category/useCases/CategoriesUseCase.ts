import { Categories } from "@prisma/client";
import { ServerError } from "../../../error/ServerError";
import { prisma } from "../../../prisma/client";
import { ICreateCategory } from "../interfaces/ICreateCategory";

export class CategoriesUseCase {
  async executeCreateCategory({ name }: ICreateCategory) {
    // NOTE: verificando se a categoria já existe
    const categoryAlreadyExisting = await prisma.categories.findFirst({
      where: {
        name,
      },
    });

    if (categoryAlreadyExisting) {
      throw new ServerError("Category already exists!");
    }

    try {
      //HACK: criando categorias
      const category = await prisma.categories.create({
        data: {
          name,
        },
      });
      console.log(`Categoria criada com sucesso: => ${category.name}`);

      return category;
    } catch (err) {
      throw new ServerError("Erro ao criar categoria!");
    }
  }

  // TODO: Atualizando categorias
  async executeUpdatedCategory({ id, name }: ICreateCategory) {
    try {
      const updateCategory = await prisma.categories.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return updateCategory;
    } catch (error) {
      throw new ServerError("Failed to update category!");
    }
  }

  // TODO: Deletando categorias
  async executeDeleteCategory({ id }: { id: string }) {
    try {
      const deletedCategory = await prisma.categories.delete({
        where: {
          id,
        },
      });

      return deletedCategory;
    } catch (err) {
      throw new ServerError("Failed to delete category!");
    }
  }

  // TODO: Consultando categorias
  async executeReadCategories(): Promise<Categories[]> {
    const category = await prisma.categories.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        products: true,
      },
    });

    return category;
  }
}
