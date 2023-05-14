import Alunos from "../models/Alunos";
import Foto from "../models/Foto";

class AlunosController {
  async index(req, res) {
    try {
      const alunos = await Alunos.findAll({
        attributes: ["id", "nome", "sobrenome", "email"],
        order: [
          ["id", "DESC"],
          [Foto, "id", "DESC"],
        ],
        include: {
          model: Foto,
          attributes: ["id", "url", "filename"],
        },
      });
      res.json(alunos);
    } catch (e) {
      console.log(e);
      return res.json({ erro: "deu erro" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Alunos.findByPk(id, {
        attributes: ["id", "nome", "sobrenome", "email"],
        order: [
          ["id", "DESC"],
          [Foto, "id", "DESC"],
        ],
        include: {
          model: Foto,
          attributes: ["id", "url", "filename"],
        },
      });

      if (!aluno) {
        res.status(404).json({
          errors: ["Aluno não encontrado"],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: ["Aluno não existe"],
      });
    }
  }

  async store(req, res) {
    try {
      const aluno = await Alunos.create(req.body);
      const { nome, sobrenome, email } = aluno;
      return res.json({
        nome,
        sobrenome,
        email,
      });
    } catch (erro) {
      return res.status(403).json({
        errors: erro.errors.map((erro) => erro.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(403).json({
          errors: ["Id não informado"],
        });
      }

      const aluno = await Alunos.findByPk(req.params.id);

      const alunoUpdated = await aluno.update(req.body);
      const { nome, sobrenome, email } = alunoUpdated;
      return res.json({
        nome,
        sobrenome,
        email,
      });
    } catch (erro) {
      return res.status(403).json({
        errors: erro.errors.map((erro) => erro.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(403).json({
          errors: ["Id não informado"],
        });
      }

      const aluno = await Alunos.findByPk(req.params.id);

      if (!aluno) {
        return res.status(403).json({
          errors: ["Aluno não existe"],
        });
      }

      const alunoDeleted = await aluno.destroy();
      const { nome, sobrenome, email } = alunoDeleted;
      return res.json({ nome, sobrenome, email });
    } catch (erro) {
      return res.status(403).json({
        errors: erro.errors.map((erro) => erro.message),
      });
    }
  }
}

export default new AlunosController();
