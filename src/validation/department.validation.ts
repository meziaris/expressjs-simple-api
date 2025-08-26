import { z, ZodType } from "zod";
import type { DepartmentRequest } from "../schema/department.schema.js";

export class DepartmentValidation {
  static readonly REGISTER: ZodType<DepartmentRequest> = z.object({
    name: z.string().min(3),
  });
}
