import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

export default class Usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Nome deve ter entre 3 e 30 caracteres",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
          defaultValue: ""
        },
        password: {
          type: Sequelize.VIRTUAL,
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
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  async ValidPass(pass) {
    const passWordIsValid = await bcrypt.compare(pass, this.password_hash);
    return passWordIsValid;
  }
}
