import jwt from "jsonwebtoken";
import Usuarios from '../models/Usuarios';

class TokenController {
  async index(req, res) {
    const { email, password } = req.body;

    // verificação de credenciais

    if (!email || !password) {
      return res.status(400).json({
        errors: ["Credenciais não informadas"]
      });
    }

    // verificação de email

    const usuario = await Usuarios.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({
        errors: ["Usuario não existe"]
      });
    }

    const PassWordIsValid = await usuario.ValidPass(password);
    if (!PassWordIsValid) {
      return res.status(400).json({
        errors: ["Senha incorreta"]
      });
    }

    const token = jwt.sign({ id: usuario.id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES,
    });

    return res.json({ token, user: { nome: usuario.nome, email: usuario.email, id: usuario.id } });
  }
}

export default new TokenController();
