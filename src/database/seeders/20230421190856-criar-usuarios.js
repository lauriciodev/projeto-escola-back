/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Mariana',
        email: "mari@gmail.com",
        password_hash: await bcrypt.hash("123123", 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nome: 'Gloria',
        email: "gloria@gmail.com",
        password_hash: await bcrypt.hash("123123", 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  async down() {
    // desfazer seeds
  }
};
