import { Router } from "express";
import { UserController } from "../modules/user/controllers/UserController";

const userRoutes = Router();
const userController = new UserController();

// TODO: Routes
userRoutes.post("/", userController.handleCreateUser);
userRoutes.get("/", userController.handleReadUsers);
userRoutes.put("/:id", userController.handleUpdateUser);
userRoutes.delete("/:id", userController.handleDeleteUser);

export { userRoutes };
