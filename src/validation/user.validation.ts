import { z, ZodType } from "zod";
import type { UserRequest } from "../schema/user.schema.js";

export class UserValidation {
  static readonly REGISTER: ZodType<UserRequest> = z.object({
    email: z.email(),
    name: z.string().min(3),
    phone: z.string().min(10),
    password: z.string().min(8),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    departmentId: z.string().uuid(),
  });
}
