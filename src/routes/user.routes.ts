import { Router } from "express";
import {
  register,
  login,
  getByIdUser,
  updateUser,
  checkUser,
  deleteUser,
} from "../controllers/User.controller";
import { checkToken } from "../middleware/check-token";

const router = Router();

//Routes
router.post("/register", register);
router.post("/login", login);
router.get("/checkUser", checkUser);
router.get("/:id", getByIdUser);
router.patch("/:id", checkToken, updateUser);
router.delete("/:id", checkToken, deleteUser);

export default router;
