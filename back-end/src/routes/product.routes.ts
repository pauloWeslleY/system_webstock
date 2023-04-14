import { Router } from "express";
import { GetProductAllController } from './../modules/product/useCases/getProduct/GetProductAllUseController';
import { CreateProductUseController } from "./../modules/product/useCases/createProduct/CreateProductUseController";

const productRoutes = Router();
const createProductController = new CreateProductUseController();
const getProductAllController = new GetProductAllController();
productRoutes.post("/", createProductController.handleSendCreate);
productRoutes.get("/products_all", getProductAllController.handleGetProduct);

export { productRoutes };
