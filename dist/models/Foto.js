"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _configUrl = require('../config/configUrl'); var _configUrl2 = _interopRequireDefault(_configUrl);

 class Foto extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "este campo não pode estar vazio",
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "este campo não pode estar vazio",
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_configUrl2.default.url}/images/${this.getDataValue("filename")}`;
          }
        },

      },

      {
        sequelize,
        modelName: "fotos",
      }
    );
    return this;
  }

  // associando tabelas
  static associate(models) {
    this.hasMany(models.fotos, { foreignKey: "aluno_id" });
  }
} exports.default = Foto;
