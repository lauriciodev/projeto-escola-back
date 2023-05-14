"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _Usuarios = require('../models/Usuarios'); var _Usuarios2 = _interopRequireDefault(_Usuarios);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["login nescessario"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { email, id } = dados;

    const usuarioIsOk = await _Usuarios2.default.findOne({
      where: {
        id,
        email
      }
    });
    if (!usuarioIsOk) {
      return res.status(401).json({
        errors: ["Usuario inválido"]
      });
    }
    req.userId = id;
    req.userEmail = email;
    next();
  } catch (e) {
    return res.status(401).json({
      errors: ["token expirado"]
    });
  }
};
