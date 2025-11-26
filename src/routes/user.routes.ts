import { Router } from "express";
import { createUser } from "../controllers/User.controller";

const router = Router();

//Routes
router.post("/register", createUser);

export default router;
