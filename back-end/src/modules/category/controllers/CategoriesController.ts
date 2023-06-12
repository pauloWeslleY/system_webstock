import { Request, Response } from "express";
import { CategoriesUseCase } from "../useCases/CategoriesUseCase";
import { z } from "zod";
import { ServerError } from "../../../error/ServerError";

const categoriesUseCase = new CategoriesUseCase();

export class CategoryController {
  // TODO: Fazendo requisição e enviando categorias pro db
  async handleCreateCategory(request: Request, response: Response) {
    try {
      const createCategoryBody = z.object({
        name: z.string(),
      });

      const { name } = createCategoryBody.parse(request.body);
      const data_category = await categoriesUseCase.executeCreateCategory({
        name,
      });

      return response.status(201).json({
        message: `Category with name ${data_category.name} has ben created successfully!`,
        data_category,
      });
    } catch (error) {
      throw new ServerError("Could not create category!");
    }
  }

  // NOTE: Atualizando categoria
  async handleUpdateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedCategory = await categoriesUseCase.executeUpdatedCategory({
        id,
        name,
      });

      return res.status(200).json({
        massage: `Category with ID ${id} to successfully updated!`,
        updatedCategory,
      });
    } catch (error) {
      throw new ServerError("Could not update category!");
    }
  }

  // NOTE: Deletando categoria no db
  async handleDeleteCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const delCategory = await categoriesUseCase.executeDeleteCategory({ id });

      response.status(200).json({
        message: `Category with ID ${id} has been deleted!`,
        delCategory,
      });
    } catch (err) {
      response.status(500).json({
        message: "Could not delete this category!",
      });
    }
  }

  // TODO: Consultando todas categorias
  async handleReadCategories(request: Request, response: Response) {
    const results = await categoriesUseCase.executeReadCategories();

    return response.status(201).json(results);
  }
}
