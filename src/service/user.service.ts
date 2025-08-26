import prismaClient from "../application/database.js";
import { ResponseError } from "../error/response.error.js";
import {
  toUserResponse,
  type UserRequest,
  type UserResponse,
} from "../schema/user.schema.js";
import { UserValidation } from "../validation/user.validation.js";
import { Validation } from "../validation/validation.js";
import bcrypt from "bcrypt";

export class UserService {
  static async register(request: UserRequest): Promise<UserResponse> {
    const validated = Validation.validate(UserValidation.REGISTER, request);

    const userExisting = await prismaClient.user.findFirst({
      where: {
        email: validated.email,
      },
    });

    if (userExisting) {
      throw new ResponseError(400, "Email already registered");
    }

    const department = await prismaClient.department.findFirst({
      where: {
        id: validated.departmentId,
      },
    });

    if (!department) {
      throw new ResponseError(400, "Department not found");
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prismaClient.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        status: validated.status,
        password: hashedPassword,
        departmentId: validated.departmentId,
      },
    });

    return toUserResponse(user);
  }
}
