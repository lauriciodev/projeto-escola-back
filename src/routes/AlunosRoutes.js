import { Router } from "express";
import AlunosController from "../controllers/AlunosController";
import Token from "../middlewares/Token";

const router = new Router();

router.get("/", AlunosController.index);
router.get("/:id", AlunosController.show);
router.post("/", Token, AlunosController.store);
router.put("/:id", Token, AlunosController.update);
router.delete("/:id", Token, AlunosController.delete);

export default router;
