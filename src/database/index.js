import Sequelize from "sequelize";
import databaseconf from "../config/config";
import Aluno from "../models/Alunos";
import Usuarios from "../models/Usuarios";
import Foto from '../models/Foto';

const models = [Aluno, Usuarios, Foto];
const connection = new Sequelize(databaseconf);
models.forEach((model) => {
  model.init(connection);
});
models.forEach((model) => {
  model.associate && model.associate(connection.models);
});
