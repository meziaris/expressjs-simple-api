import type { Request, Response } from "express";
import type {
  DepartmentRequest,
  DepartmentResponse,
} from "../schema/department.schema.js";
import { DepartmentService } from "../service/department.service.js";

export class DepartmentController {
  static async register(request: Request, response: Response) {
    const req: DepartmentRequest = request.body;
    const res: DepartmentResponse = await DepartmentService.register(req);

    response.status(201).json(res);
  }
}
