module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('OrderItems', [
      {
        userId: 1,
        yardsaleId: 1,
        product: 'chair',
        quantity: 5,
        cost: 340050,
        price: 340050,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('OrderItems', null, {})
};
