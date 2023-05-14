"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _config = require('../config/config'); var _config2 = _interopRequireDefault(_config);
var _Alunos = require('../models/Alunos'); var _Alunos2 = _interopRequireDefault(_Alunos);
var _Usuarios = require('../models/Usuarios'); var _Usuarios2 = _interopRequireDefault(_Usuarios);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const models = [_Alunos2.default, _Usuarios2.default, _Foto2.default];
const connection = new (0, _sequelize2.default)(_config2.default);
models.forEach((model) => {
  model.init(connection);
});
models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
