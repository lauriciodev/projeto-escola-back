"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Usuarios = require('../models/Usuarios'); var _Usuarios2 = _interopRequireDefault(_Usuarios);

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

    const usuario = await _Usuarios2.default.findOne({ where: { email } });
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

    const token = _jsonwebtoken2.default.sign({ id: usuario.id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES,
    });

    return res.json({ token, user: { nome: usuario.nome, email: usuario.email, id: usuario.id } });
  }
}

exports. default = new TokenController();
