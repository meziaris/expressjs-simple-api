import { z, ZodType } from "zod";
import type {
  DepartmentDelete,
  DepartmentRequest,
  DepartmentUpdate,
} from "../schema/department.schema.js";

export class DepartmentValidation {
  static readonly REGISTER: ZodType<DepartmentRequest> = z.object({
    name: z.string().min(3),
  });

  static readonly UPDATE: ZodType<DepartmentUpdate> = z.object({
    id: z.uuid(),
    name: z.string().min(3),
  });

  static readonly DELETE: ZodType<DepartmentDelete> = z.object({
    id: z.uuid(),
  });
}
