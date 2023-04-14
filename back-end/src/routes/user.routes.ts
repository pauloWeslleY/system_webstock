import { Router } from "express";
import { GetUserUseController } from "../modules/user/useCases/getUser/getUserUseController";
import { CreateUserUseController } from "./../modules/user/useCases/createUser/CreateUserUseController";

const userRoutes = Router();
const createUserUseController = new CreateUserUseController();
const getUserUseController = new GetUserUseController();
userRoutes.post("/", createUserUseController.handleSendCreate);
userRoutes.get("/users_all", getUserUseController.handleGetUsers);

export { userRoutes };
