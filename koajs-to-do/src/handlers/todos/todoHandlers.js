const {
  getAll: getAllTodos,
  add: addTodo,
  deleteOne,
  deleteMany,
  updateMany,
  update: updateTodo,
} = require("../../database/todoRepository");

const getTodos = (ctx) => {
  try {
    const Todos = getAllTodos();
    ctx.body = {
      data: Todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
};
const save = (ctx) => {
  try {
    const postData = ctx.request.body;
    const addRes = addTodo(postData);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};
const deleteOneTodo = (ctx) => {
  try {
    deleteOne(ctx.request.params.id);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};
const deleteManyTodoes = (ctx) => {
  try {
    deleteMany(ctx.request.body.ids);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};
const update = (ctx) => {
  try {
    console.log(ctx.request.body);
    updateTodo(ctx.request.body, ctx.request.params.id);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};
const updateManyTodoes = (ctx) => {
  try {
    updateMany(ctx.request.body);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
};

module.exports = { getTodos, save, deleteOneTodo, deleteManyTodoes, update, updateManyTodoes };
