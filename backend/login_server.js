const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Assuming db.json contains your data
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom middleware for login
server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/api/login") {
    const { email, password } = req.body;

    if (email && password) {
      // Delay 3 seconds
      setTimeout(() => {
        const user = router.db.get("users").find({ email, password }).value();

        if (user) {
          res.json(user);
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      }, 3000);
    } else {
      res.status(400).json({ error: "Missing email or password" });
    }
  } else {
    next();
  }
});

const port = 4000;

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running with http://localhost:${port}`);
});
