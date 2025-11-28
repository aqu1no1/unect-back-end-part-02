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

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: "João Silva"
 *             email: "joao@gmail.com"
 *             password: "123"
 *             phone: "11987654321"
 *             confirmpassword: "123"
 *     responses:
 *       201:
 *         description: Usuário criado
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: teste@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 */
router.post("/login", login);

/**
 * @swagger
 * /users/checkUser:
 *   get:
 *     summary: Retorna o usuário logado a partir do token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário
 */
router.get("/checkUser", checkUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do usuário
 */
router.get("/:id", getByIdUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza os dados do usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 65f4d7fcab6c2e8b126c0f31
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               phone:
 *                 type: string
 *                 example: 11987654321
 *               password:
 *                 type: string
 *                 example: 123
 *               confirmpassword:
 *                 type: string
 *                 example: 123
 *           example:
 *             name: "Pedro Matias"
 *             phone: "11999999999"
 *             password: "123"
 *             confirmpassword: "123"
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.patch("/:id", checkToken, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuário removido
 */
router.delete("/:id", checkToken, deleteUser);

export default router;
