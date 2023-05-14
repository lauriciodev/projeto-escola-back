"use strict";Object.defineProperty(exports, "__esModule", {value: true});// import Alunos from "../models/Alunos";

class HomeController {
  async index(req, res) {
    res.send("api escola");
  }
}

exports. default = new HomeController();
