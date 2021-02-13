module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('YardSales', [
      {
        title: 'Our first yardsale',
        startdate: new Date(),
        saleDate: new Date(),
        note: 'it is a success',
        location: 'Lagos',
        rating: '5 star',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {}),
  down: queryInterface =>
    queryInterface.bulkDelete('YardSales', null, {})
};
