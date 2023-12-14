const fs = require("fs");
const { faker } = require("@faker-js/faker");

const generateTodos = () => {
  const todos = [];

  for (let i = 1; i <= 30; i++) {
    const todo = {
      id: i,
      name: faker.lorem.sentence(),
      isCompleted: false,
    };
    todos.push(todo);
  }

  return todos;
};

const todosData = generateTodos();
fs.writeFileSync("./src/database/todos.json", JSON.stringify(todosData, null, 2));
console.log("todos data generated and saved to todos.json");
