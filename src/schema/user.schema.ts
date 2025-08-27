import type { User } from "@prisma/client";

export type UserResponse = {
  id: string;
  email: string;
  name: string;
  phone: string;
  status: string;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRequest = {
  email: string;
  name: string;
  phone: string;
  password: string;
  status: "ACTIVE" | "INACTIVE";
  departmentId: string;
};

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    status: user.status,
    departmentId: user.departmentId,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
