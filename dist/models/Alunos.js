"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Nome deve ter entre 3 e 30 caracteres",
            },
          },
        },
        sobrenome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Sobrenome deve ter entre 3 e 30 caracteres",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "alunos",
      }
    );
    return this;
  }

  // associando tabelas
  static associate(models) {
    this.hasMany(models.fotos, { foreignKey: "aluno_id" });
  }
} exports.default = Aluno;
