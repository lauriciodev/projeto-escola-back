import Sequelize, { Model } from "sequelize";
import configUrl from "../config/configUrl";

export default class Foto extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "este campo não pode estar vazio",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "este campo não pode estar vazio",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${configUrl.url}/images/${this.getDataValue("filename")}`;
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
}
