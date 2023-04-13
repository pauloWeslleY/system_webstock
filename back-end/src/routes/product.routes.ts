import { Router } from 'express';
import { CreateProductUseController } from './../modules/product/useCases/createProduct/CreateProductUseController';

const productRoutes = Router();
const createProductController = new CreateProductUseController();
productRoutes.post("/", createProductController.handleSendCreate);

export { productRoutes };