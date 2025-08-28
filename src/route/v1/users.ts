import { Router } from "express";
import { UserController } from "../../controller/user.controller.js";

const router = Router();

router.post("/", UserController.register);
router.get("/", UserController.list);
router.patch("/", UserController.update);
router.delete("/", UserController.delete);

export default router;
