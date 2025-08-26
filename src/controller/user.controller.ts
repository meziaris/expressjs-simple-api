import type { Request, Response } from "express";
import type { UserRequest, UserResponse } from "../schema/user.schema.js";
import { UserService } from "../service/user.service.js";

export class UserController {
  static async register(request: Request, response: Response) {
    const req: UserRequest = request.body;
    const res: UserResponse = await UserService.register(req);

    response.status(201).json(res);
  }
}
