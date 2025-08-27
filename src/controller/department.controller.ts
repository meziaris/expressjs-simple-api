import type { Request, Response } from "express";
import type {
  DepartmentDelete,
  DepartmentRequest,
  DepartmentResponse,
  DepartmentUpdate,
} from "../schema/department.schema.js";
import { DepartmentService } from "../service/department.service.js";

export class DepartmentController {
  static async register(request: Request, response: Response) {
    const req: DepartmentRequest = request.body;
    const res: DepartmentResponse = await DepartmentService.register(req);

    response.status(201).json(res);
  }

  static async list(_: Request, response: Response) {
    const res: DepartmentResponse[] = await DepartmentService.list();

    response.status(200).json(res);
  }

  static async update(request: Request, response: Response) {
    const req: DepartmentUpdate = request.body;
    const res: DepartmentResponse = await DepartmentService.update(req);

    response.status(200).json(res);
  }

  static async delete(request: Request, response: Response) {
    const req: DepartmentDelete = request.body;
    await DepartmentService.delete(req);

    response.status(200).json({ message: "department deleted" });
  }
}
