const jsonServer = require('json-server');
const customRoutes = require('./routes.js');
// const database = require('./db-sample.json');
const database = require('./database/index.js')();
const server = jsonServer.create();
const router = jsonServer.router(database);
const middlewares = jsonServer.defaults();
const middlewareModule = require('./middleware/index.js');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

function serverRewrite() {
  server.use(jsonServer.rewriter(customRoutes));
}

function runServer() {
  server.use(router);
}

server.use((req, res, next) => {
  const publishUrl = ['/api/login', '/api/register'];
  if (publishUrl.indexOf(req.url) !== -1 || req.url.startsWith('/api/products')) {
    next();
  } else if (isAuthorized(req, res)) {
    next();
  } else {
    res.status(401).jsonp({
      status: 401,
      errorCode: 'un_authorization',
      data: null,
      message: 'Please provide Authorization in request headers'
    });
  }
});

function isAuthorized(req) {
  try {
    // if (req.url === '/refresh') {
    //   const authHeader = req.body.refresh_token;
    //   const jwtToken = JSON.parse(
    //     Buffer.from(authHeader.split('.')[1], 'base64')
    //   );
    //   const tokenExpired = Date.now() > jwtToken.exp * 1000;
    //   if (tokenExpired) return false;
    //   return true;
    // }
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer fake-access-token')) {
      // check if token is expired
      const jwtToken = JSON.parse(Buffer.from(authHeader.split('.')[1], 'base64'));
      const tokenExpired = Date.now() > jwtToken.exp * 1000;
      if (tokenExpired) {
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

// router.render = (req, res) => {
//   res.jsonp({
//     code: 200,
//     data: res.locals.data,
//     message: 'ok',
//   });
// };

middlewareModule(server, router);

setTimeout(() => {
  serverRewrite();
  runServer();
});

server.listen(5000, () => {
  console.log('JSON Server is running on port 5000!');
});
