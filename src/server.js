const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Định nghĩa endpoint tùy chỉnh để xử lý multi-delete
server.delete("/items", (req, res) => {
  const itemIds = req.query.ids.split(",").map(Number);
  const db = router.db;
  const items = db.get("items");

  // Xóa các bản ghi có ids tương ứng
  items.remove((item) => itemIds.includes(item.id)).write();

  res.status(200).json({ message: "Deleted successfully" });
});

server.use(router);

const port = 8080;
server.listen(port, () => {
  console.log(`Json Server is running on port ${port}`);
});
