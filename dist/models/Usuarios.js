"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class Usuarios extends _sequelize.Model {
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
        password_hash: {
          type: _sequelize2.default.STRING,
          defaultValue: ""
        },
        password: {
          type: _sequelize2.default.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 20],
              msg: "password deve conter entre 6 e 20 caracteres"
            }
          }

        }
      },
      {
        sequelize,
        modelName: "usuarios",
      }
    );
    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    return this;
  }

  async ValidPass(pass) {
    const passWordIsValid = await _bcryptjs2.default.compare(pass, this.password_hash);
    return passWordIsValid;
  }
} exports.default = Usuarios;