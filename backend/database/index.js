const users = require('./users.js')();
const roles = require('./roles.js')();
const products = require('./products.js')();

module.exports = () => ({
  users,
  roles,
  products
});
