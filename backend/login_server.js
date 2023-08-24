const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom middleware for login
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/api/login') {
    const { email, password } = req.body;

    if (email && password) {
      const user = router.db.get('users').find({ email, password }).value();

      if (user) {
        res.json(user);
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      res.status(400).json({ error: 'Missing email or password' });
    }
  } else {
    next();
  }
});

server.use(router);
server.listen(4000, () => {
  console.log('JSON Server is running');
});
