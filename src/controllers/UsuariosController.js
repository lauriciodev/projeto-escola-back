import Usuarios from "../models/Usuarios";

class UsuariosController {
  // criando usuarios
  async store(req, res) {
    try {
      const novoUsuario = await Usuarios.create(req.body);
      return res.json(novoUsuario);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }

  // lendo usuarios

  async index(req, res) {
    try {
      const usuario = await Usuarios.findAll({ attributes: ["id", "nome", "email"] });
      return res.json(usuario);
    } catch (erro) {
      return res.json(null);
    }
  }

  // lendo usuario esprecifico

  async show(req, res) {
    try {
      const usuario = await Usuarios.findByPk(req.userId);
      const { nome, email } = usuario;
      return res.json({ nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // atualizando usuario

  async update(req, res) {
    try {
      // verificando existencia do usuario
      const usuario = await Usuarios.findByPk(req.userId);
      if (!usuario) {
        return res.status(400).json({
          error: ["usuario não existe"],
        });
      }

      // atualizando dados

      const dadosAtualizados = await usuario.update(req.body);
      const { nome, email } = dadosAtualizados;
      return res.json({ nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }

  // deletando usuarios

  async delete(req, res) {
    try {
      const usuario = await Usuarios.findByPk(req.userId);

      if (!usuario) {
        return res.status(400).json({
          error: ["usuario não existe"],
        });
      }

      usuario.destroy();
      return res.json({
        nome: usuario.nome,
        email: usuario.email
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((erro) => erro.message)
      });
    }
  }
}

export default new UsuariosController();
