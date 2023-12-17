const Router = require("koa-router");
const todoHandler = require("../handlers/todos/todoHandlers");
const {
  todoInputMiddleware,
  todoInputUpdateMiddleware,
} = require("../middleware/todoInputMiddleware");

const router = new Router({
  prefix: "/api",
});

router.get("/todoes", todoHandler.getTodos);
router.post("/todoes", todoInputMiddleware, todoHandler.save);
router.put("/todo/:id", todoInputUpdateMiddleware, todoHandler.update);
router.put("/todoes", todoHandler.updateManyTodoes);
router.delete("/todo/:id", todoHandler.deleteOneTodo);
router.delete("/todoes", todoHandler.deleteManyTodoes);

module.exports = router;
