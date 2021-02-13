module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Carts', [
      {
        userId: 1,
        yardSaleId: 1,
        expirationDate: new Date(),
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Carts', null, {})
};
