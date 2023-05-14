import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
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
        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 30],
              msg: "Sobrenome deve ter entre 3 e 30 caracteres",
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
}
