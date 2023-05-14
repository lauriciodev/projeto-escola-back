// import Alunos from "../models/Alunos";

class HomeController {
  async index(req, res) {
    res.send("api escola");
  }
}

export default new HomeController();
