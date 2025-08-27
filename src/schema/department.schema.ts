import type { Department } from "@prisma/client";

export type DepartmentResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type DepartmentRequest = {
  name: string;
};

export type DepartmentUpdate = {
  id: string;
  name: string;
};

export type DepartmentDelete = {
  id: string;
};

export function toDepartmentResponse(
  department: Department
): DepartmentResponse {
  return {
    id: department.id,
    name: department.name,
    createdAt: department.createdAt.toISOString(),
    updatedAt: department.updatedAt.toISOString(),
  };
}
