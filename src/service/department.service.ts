import prismaClient from "../application/database.js";
import { ResponseError } from "../error/response.error.js";
import {
  toDepartmentResponse,
  type DepartmentDelete,
  type DepartmentRequest,
  type DepartmentResponse,
  type DepartmentUpdate,
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

  static async list(): Promise<DepartmentResponse[]> {
    const departments = await prismaClient.department.findMany();

    return departments.map(toDepartmentResponse);
  }

  static async update(request: DepartmentUpdate): Promise<DepartmentResponse> {
    const validated = Validation.validate(DepartmentValidation.UPDATE, request);

    const department = prismaClient.department.findFirst({
      where: {
        id: validated.id,
      },
    });

    if (!department) {
      throw new ResponseError(400, "department not found");
    }

    const updatedDepartment = await prismaClient.department.update({
      where: {
        id: validated.id,
      },
      data: validated,
    });

    return toDepartmentResponse(updatedDepartment);
  }

  static async delete(request: DepartmentDelete): Promise<void> {
    const validated = Validation.validate(DepartmentValidation.DELETE, request);

    const department = await prismaClient.department.findFirst({
      where: {
        id: validated.id,
      },
    });

    if (!department) {
      throw new ResponseError(400, "department not found");
    }

    await prismaClient.department.delete({
      where: {
        id: validated.id,
      },
    });
  }
}
