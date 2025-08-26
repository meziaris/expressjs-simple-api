import type { Department } from "@prisma/client";

export type DepartmentResponse = {
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type DepartmentRequest = {
  name: string;
};

export function toDepartmentResponse(
  department: Department
): DepartmentResponse {
  return {
    name: department.name,
    createdAt: department.createdAt.toISOString(),
    updatedAt: department.updatedAt.toISOString(),
  };
}
