const Router = require("koa-router");
const todoHandler = require("../handlers/todos/todoHandlers");
const {
  todoInputMiddleware,
  todoInputUpdateMiddleware,
} = require("../middleware/todoInputMiddleware");

// Prefix all routes with /todos
const router = new Router({
  prefix: "/api",
});

// Routes will go here

router.get("/todoes", todoHandler.getTodos);
router.post("/todo", todoInputMiddleware, todoHandler.save);
router.delete("/todo/:id", todoHandler.deleteOneTodo);
router.post("/todoes/delete", todoHandler.deleteManyTodoes);
router.put("/todo/:id", todoInputUpdateMiddleware, todoHandler.update);
router.put("/todoes", todoHandler.completeAllTodoes);
// router.get("/todo/:id", todoHandler.gettodo);

module.exports = router;
