"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Env = use("Env");
const PREFIX = Env.get("API_PREFIX");

Route.group(() => {
  /**
   * @swagger
   * /api/ping:
   *   get:
   *     tags:
   *       - Utilities
   *     summary: Ping Pong
   *     responses:
   *       200:
   *         description: Send pong
   *         example:
   *           Pong
   */

  Route.get("/ping", () => ({ Pong: true }));
  Route.get("/alunos", "AlunoController.lista");
  Route.get("/mentores", "MentorController.lista");
  Route.get("/eventos", "EventoController.lista");
  Route.post("/aposta", "ApostaController.apostar");
})
  .prefix(PREFIX)
  .formats(["json"])
  .middleware(["guest"]);
