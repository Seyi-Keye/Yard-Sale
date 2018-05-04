module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Products', [
      {
        name: 'Chair',
        condition: 'bad',
        price: '3088484',
        quantity: '5',
        maxslot: 2,
        leftOver: 4,
        imageUrl: 'new Date()',
        yardsaleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('Products', null, {})
};
