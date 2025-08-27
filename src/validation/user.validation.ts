import { z, ZodType } from "zod";
import type {
  UserDelete,
  UserRequest,
  UserUpdate,
} from "../schema/user.schema.js";

export class UserValidation {
  static readonly REGISTER: ZodType<UserRequest> = z.object({
    email: z.email(),
    name: z.string().min(3),
    phone: z.string().min(10),
    password: z.string().min(8),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    departmentId: z.uuid(),
  });

  static readonly UPDATE: ZodType<UserUpdate> = z.object({
    id: z.uuid(),
    email: z.email().optional(),
    name: z.string().min(3).optional(),
    phone: z.string().min(10).optional(),
    password: z.string().min(8).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
    departmentId: z.uuid().optional(),
  });

  static readonly DELETE: ZodType<UserDelete> = z.object({
    id: z.uuid(),
  });
}
