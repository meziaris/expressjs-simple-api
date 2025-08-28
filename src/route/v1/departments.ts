import { Router } from "express";
import { DepartmentController } from "../../controller/department.controller.js";

const router = Router();

router.post("/", DepartmentController.register);
router.get("/", DepartmentController.list);
router.patch("/", DepartmentController.update);
router.delete("/", DepartmentController.delete);

export default router;
