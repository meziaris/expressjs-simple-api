import prismaClient from "../application/database.js";
import { ResponseError } from "../error/response.error.js";
import {
  toUserResponse,
  type UserDelete,
  type UserRequest,
  type UserResponse,
  type UserUpdate,
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

  static async list(): Promise<UserResponse[]> {
    const users = await prismaClient.user.findMany();
    return users.map(toUserResponse);
  }

  static async update(request: UserUpdate): Promise<UserResponse> {
    const validated = Validation.validate(UserValidation.UPDATE, request);

    const user = await prismaClient.user.findFirst({
      where: {
        id: validated.id,
      },
    });

    if (!user) {
      throw new ResponseError(400, "User not found");
    }

    if (validated.password !== undefined) {
      const hashedPassword = await bcrypt.hash(validated.password, 10);
      validated.password = hashedPassword;
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        id: validated.id,
      },
      data: {
        name: validated.name ?? user.name,
        email: validated.email ?? user.email,
        phone: validated.phone ?? user.phone,
        status: validated.status ?? user.status,
        departmentId: validated.departmentId ?? user.departmentId,
      },
    });

    return toUserResponse(updatedUser);
  }

  static async delete(request: UserDelete): Promise<void> {
    const validated = Validation.validate(UserValidation.DELETE, request);

    const user = await prismaClient.user.findFirst({
      where: {
        id: validated.id,
      },
    });

    if (!user) {
      throw new ResponseError(400, "User not found");
    }

    await prismaClient.user.delete({
      where: {
        id: validated.id,
      },
    });
  }
}
