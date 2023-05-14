import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuarios';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["login nescessario"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { email, id } = dados;

    const usuarioIsOk = await Usuarios.findOne({
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
