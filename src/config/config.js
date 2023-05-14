require("dotenv").config();

module.exports = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  dialect: "mariadb",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
};
