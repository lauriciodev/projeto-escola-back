import { Router } from "express";
import UsuariosController from "../controllers/UsuariosController";
import Token from "../middlewares/Token";

const router = new Router();

router.post("/", UsuariosController.store);
// router.get("/", Token, UsuariosController.index);
router.get("/:id", Token, UsuariosController.show);
router.put("/", Token, UsuariosController.update);
router.delete("/", Token, UsuariosController.delete);

export default router;
