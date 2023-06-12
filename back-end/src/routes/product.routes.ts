import { Router } from "express";
import { ProductController } from "../modules/product/controllers/ProductController";

const productRoutes = Router();
const productController = new ProductController();

// TODO: Routes
productRoutes.post("/", productController.handleCreateProduct);
productRoutes.get("/", productController.handleReadProduct);
productRoutes.put("/:id", productController.handleUpdateProduct);
productRoutes.delete("/:id", productController.handleDeleteProduct);

export { productRoutes };
