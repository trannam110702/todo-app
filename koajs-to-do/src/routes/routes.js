const Router = require("koa-router");
const todoHandler = require("../handlers/todos/todoHandlers");
const { todoInputMiddleware } = require("../middleware/todoInputMiddleware");

// Prefix all routes with /todos
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todos", todoHandler.getTodos);
router.post("/todos", todoInputMiddleware, todoHandler.save);
router.put("/todo/:id", todoInputMiddleware, todoHandler.update);
router.delete("/todo/:id", todoHandler.deleteOneTodo);
// router.get("/todo/:id", todoHandler.gettodo);

module.exports = router;
