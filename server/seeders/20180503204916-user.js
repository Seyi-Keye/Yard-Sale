module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        name: 'mankind',
        email: 'mayowamakinde@andela.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Users', null, {})
};

