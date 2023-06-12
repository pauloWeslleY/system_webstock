import { Request, Response } from "express";
import { UsersUseCase } from "../useCases/UsersUseCase";
import { z } from "zod";
import { ServerError } from "../../../error/ServerError";

const usersUseCase = new UsersUseCase();

export class UserController {
  // TODO: Enviando novo usuário
  async handleCreateUser(request: Request, response: Response) {
    try {
      const createUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.number(),
      });

      const { name, email, password } = createUserBody.parse(request.body);
      const data_user = await usersUseCase.executeCreationUser({
        name,
        email,
        password,
      });

      return response.status(201).json({
        message: `User with name ${data_user.name} successfully created!`,
        data_user,
      });
    } catch (error) {
      throw new ServerError("Could not to create user!");
    }
  }

  // TODO: Atualizando usuário
  async handleUpdateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const dataUpdatedUser = await usersUseCase.executeUpdateUser({
        id,
        name,
        email,
        password,
      });

      return res.status(200).json({
        message: `User with ID ${id} updated successfully!`,
        dataUpdatedUser,
      });
    } catch (err) {
      throw new ServerError("Could not update user!");
    }
  }

  // TODO: Deletando usuário
  async handleDeleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const delUser = usersUseCase.executeDeleteUser({ id });

      response.status(200).json({
        message: `Delete user ${id} with successfully!`,
        delUser,
      });
    } catch (error) {
      response.status(200).json({
        message: `Failed to delete user ${error}!`,
      });
    }
  }

  // TODO: Consultando usuário
  async handleReadUsers(request: Request, response: Response) {
    const result = await usersUseCase.executeReadUser();

    return response.status(201).json(result);
  }
}
