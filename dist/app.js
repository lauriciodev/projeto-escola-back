"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
require('./database');
var _path = require('path');
var _expressdelay = require('express-delay'); var _expressdelay2 = _interopRequireDefault(_expressdelay);

_dotenv2.default.config();

// routes
var _HomeRoutes = require('./routes/HomeRoutes'); var _HomeRoutes2 = _interopRequireDefault(_HomeRoutes);
var _UsuariosRoutes = require('./routes/UsuariosRoutes'); var _UsuariosRoutes2 = _interopRequireDefault(_UsuariosRoutes);
var _TokenRoutes = require('./routes/TokenRoutes'); var _TokenRoutes2 = _interopRequireDefault(_TokenRoutes);
var _AlunosRoutes = require('./routes/AlunosRoutes'); var _AlunosRoutes2 = _interopRequireDefault(_AlunosRoutes);
var _FotoRoutes = require('./routes/FotoRoutes '); var _FotoRoutes2 = _interopRequireDefault(_FotoRoutes);

// lauricio

const whiteList = ["http://localhost:3000","https://lauricioescola.netlify.app/"];

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
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(_expressdelay2.default.call(void 0, 2000));
    this.app.use(
      "/images/",
      _express2.default.static(_path.resolve.call(void 0, __dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/", _HomeRoutes2.default);
    this.app.use("/usuarios/", _UsuariosRoutes2.default);
    this.app.use("/token/", _TokenRoutes2.default);
    this.app.use("/alunos/", _AlunosRoutes2.default);
    this.app.use("/fotos/", _FotoRoutes2.default);
  }
}

exports. default = new App().app;
