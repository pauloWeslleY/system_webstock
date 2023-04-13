import { CreateUserUseController } from './../modules/user/useCases/createUser/CreateUserUseController';
import { Router } from "express";

const userRoutes = Router();
const createUserUseController = new CreateUserUseController();
userRoutes.post("/", createUserUseController.handleSendCreate);

export { userRoutes };