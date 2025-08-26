import prismaClient from "../application/database.js";
import {
  toDepartmentResponse,
  type DepartmentRequest,
  type DepartmentResponse,
} from "../schema/department.schema.js";
import { DepartmentValidation } from "../validation/department.validation.js";
import { Validation } from "../validation/validation.js";

export class DepartmentService {
  static async register(
    request: DepartmentRequest
  ): Promise<DepartmentResponse> {
    const validated = Validation.validate(
      DepartmentValidation.REGISTER,
      request
    );

    const department = await prismaClient.department.create({
      data: validated,
    });

    return toDepartmentResponse(department);
  }
}
