const { faker } = require('@faker-js/faker');
const { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } = require('../common/constants');

module.exports = function (server, router) {
  const db = router.db; // Assign the lowdb instance

  // Get all product
  server.get('/api/products', (req, res) => {
    const pageSize = Number(req.query.pageSize) || DEFAULT_PAGE_SIZE;
    const page = Number(req.query.page) || DEFAULT_PAGE;
    const data = db.get('products').value();

    res.status(200).jsonp({
      status: 200,
      data: data.slice(page*pageSize, (page*pageSize) + pageSize),
      meta: {
        pageSize,
        currentPage: page,
        totalPage: Math.ceil(data.length / pageSize),
        count: data.length
      }
    });
  });

  // Get product by id
  server.get('/api/products/:id', (req, res) => {
    const id = req.params.id || null;
    const data = db.get('products').find({ id }).value();

    if (data) {
      res.status(200).jsonp({
        status: 200,
        data,
        meta: {}
      });
    } else {
      res.status(404).jsonp({
        status: 404,
        data: null,
        message: `Can not found the product width id: ${id}`,
        meta: {}
      });
    }
  });

  // Create product
  server.post('/api/products', (req, res) => {
    const id = faker.string.uuid();
    db.get('products').push({
      id,
      image: faker.image.dataUri({ color: faker.vehicle.color() }),
      productName: req.body.productName || '',
      productCode: req.body.productCode || '',
      shortDescription: req.body.shortDescription || '',
      information: req.body.information || '',
      price: req.body.price || '',
      currency: req.body.currency || '',
      quantity: req.body.quantity || '',
    }).write();
    const data = db.get('products').find({ id }).value();

    res.status(200).jsonp({
      status: 200,
      data,
      message: 'Create product successfully',
      meta: {}
    });
  });

  // Update product
  server.put('/api/products/:id', (req, res) => {
    const id = req.params.id || null;

    db.get('products').find({ id }).assign({
      image: faker.image.dataUri({ color: faker.vehicle.color() }),
      productName: req.body.productName || '',
      productCode: req.body.productCode || '',
      shortDescription: req.body.shortDescription || '',
      information: req.body.information || '',
      price: req.body.price || '',
      currency: req.body.currency || '',
      quantity: req.body.quantity || '',
    }).write()

    const data = db.get('products').find({ id }).value();

    res.status(200).jsonp({
      status: 200,
      data,
      message: 'Update product successfully',
      meta: {}
    });
  });
};
