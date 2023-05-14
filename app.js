import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import "./src/database";
import { resolve } from "path";
import delay from "express-delay";

dotenv.config();

// routes
import HomeRouter from "./src/routes/HomeRoutes";
import UsuariosRouter from "./src/routes/UsuariosRoutes";
import TokenRouter from "./src/routes/TokenRoutes";
import AlunosRouter from "./src/routes/AlunosRoutes";
import FotoRouter from "./src/routes/FotoRoutes ";

// lauricio

const whiteList = ["http://localhost:3000"];

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by cors"));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(delay(2000));
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/", HomeRouter);
    this.app.use("/usuarios/", UsuariosRouter);
    this.app.use("/token/", TokenRouter);
    this.app.use("/alunos/", AlunosRouter);
    this.app.use("/fotos/", FotoRouter);
  }
}

export default new App().app;
