module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('CartItems', [
      {
        cartId: 1,
        product: 'chair',
        requestedQuantity: 3,
        price: '3400',
        cost: '34000',
        unassignedQuantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('CartItems', null, {})
};
