import { Router } from "express";
import {
  create,
  getAll,
  getById,
  getAllPetsUser,
  getAllUserAdoptions,
  deletePet,
  updatePet,
  conclude,
  schedule,
} from "../controllers/Pet.controller";
import { checkToken } from "../middleware/check-token";

const router = Router();

//Routes
router.post("/create", checkToken, create);
router.get("/", getAll);
router.get("/mypets", checkToken, getAllPetsUser);
router.get("/myadoptions", checkToken, getAllUserAdoptions);
router.get("/:id", getById);
router.delete("/:id", checkToken, deletePet);
router.patch("/:id", checkToken, updatePet);
router.patch("/schedule/:id", checkToken, schedule);
router.patch("/conclude/:id", checkToken, conclude);
export default router;
