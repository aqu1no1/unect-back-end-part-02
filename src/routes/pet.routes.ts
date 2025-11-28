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

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Rotas relacionadas aos pets
 */

/**
 * @swagger
 * /pets/create:
 *   post:
 *     summary: Cria um novo pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 */
router.post("/create", checkToken, create);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Lista todos os pets disponíveis para adoção
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets
 */
router.get("/", getAll);

/**
 * @swagger
 * /pets/mypets:
 *   get:
 *     summary: Lista todos os pets do usuário logado
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pets do usuário
 */
router.get("/mypets", checkToken, getAllPetsUser);

/**
 * @swagger
 * /pets/myadoptions:
 *   get:
 *     summary: Lista todos os pets adotados pelo usuário
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pets adotados pelo usuário
 */
router.get("/myadoptions", checkToken, getAllUserAdoptions);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Retorna os dados de um pet pelo ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do pet
 */
router.get("/:id", getById);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Remove um pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet removido
 */
router.delete("/:id", checkToken, deletePet);

/**
 * @swagger
 * /pets/{id}:
 *   patch:
 *     summary: Atualiza os dados de um pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Pet atualizado
 */
router.patch("/:id", checkToken, updatePet);

/**
 * @swagger
 * /pets/schedule/{id}:
 *   patch:
 *     summary: Agenda uma visita para adoção
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Visita agendada
 */
router.patch("/schedule/:id", checkToken, schedule);

/**
 * @swagger
 * /pets/conclude/{id}:
 *   patch:
 *     summary: Conclui a adoção de um pet
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adoção concluída
 */
router.patch("/conclude/:id", checkToken, conclude);

export default router;
``;
