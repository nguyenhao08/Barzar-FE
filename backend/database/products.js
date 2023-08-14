const { faker } = require('@faker-js/faker');

module.exports = () => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      id: faker.string.uuid(),
      image: faker.image.dataUri({ color: faker.vehicle.color() }),
      productName: faker.commerce.productName(),
      productCode: faker.commerce.product(),
      shortDescription: faker.commerce.productDescription(),
      information: faker.lorem.sentences({ min: 10, max: 50 }, '\n'),
      price: faker.commerce.price({ min: 1000, max: 1000000000 }),
      currency: faker.helpers.arrayElement(['USD', 'VNĐ']),
      quantity: faker.number.int({ min: 5, max: 10000 })
    });
  }

  return data;
};

// module.exports = () => ([

// ]);