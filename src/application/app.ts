import express from "express";
import { DepartmentController } from "../controller/department.controller.js";
import { ErrorMiddleware } from "../middleware/error.middleware.js";
import { UserController } from "../controller/user.controller.js";

export const app = express();
app.use(express.json());

app.post("/departments", DepartmentController.register);
app.get("/departments", DepartmentController.list);
app.patch("/departments", DepartmentController.update);
app.delete("/departments", DepartmentController.delete);

app.post("/users", UserController.register);
app.get("/users", UserController.list);
app.patch("/users", UserController.update);
app.delete("/users", UserController.delete);

app.use(ErrorMiddleware);
