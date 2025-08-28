import { Router } from "express";
import users from "./users.js";
import departments from "./departments.js";

const router = Router();

router.use("/departments", departments);
router.use("/users", users);

export default router;
