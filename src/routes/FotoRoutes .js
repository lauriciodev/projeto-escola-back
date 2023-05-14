import { Router } from "express";
import FotoController from "../controllers/FotoController";
import Token from "../middlewares/Token";

const router = new Router();

router.post("/", Token, FotoController.store);

export default router;
