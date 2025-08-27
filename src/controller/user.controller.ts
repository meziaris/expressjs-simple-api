import type { Request, Response } from "express";
import type {
  UserDelete,
  UserRequest,
  UserResponse,
  UserUpdate,
} from "../schema/user.schema.js";
import { UserService } from "../service/user.service.js";

export class UserController {
  static async register(request: Request, response: Response) {
    const req: UserRequest = request.body;
    const res: UserResponse = await UserService.register(req);

    response.status(201).json(res);
  }

  static async list(_: Request, response: Response) {
    const res: UserResponse[] = await UserService.list();

    response.status(200).json(res);
  }

  static async update(request: Request, response: Response) {
    const req: UserUpdate = request.body;
    const res: UserResponse = await UserService.update(req);

    response.status(200).json(res);
  }

  static async delete(request: Request, response: Response) {
    const req: UserDelete = request.body;
    await UserService.delete(req);

    response.status(200).json({ message: "User deleted successfully" });
  }
}
