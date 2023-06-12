import { Router } from "express";
import { CategoryController } from "../modules/category/controllers/CategoriesController";

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.post("/", categoryController.handleCreateCategory);
categoryRoutes.get("/", categoryController.handleReadCategories);
categoryRoutes.put("/:id", categoryController.handleUpdateCategory);
categoryRoutes.delete("/:id", categoryController.handleDeleteCategory);

export { categoryRoutes };
