const TodoModel = require("../models/todo");

// get all todos
exports.getTodos = async (req, res) => {
  try {
    const allTodos = await TodoModel.find();
    console.log(allTodos);
    res.status(200).json({
      status: "success",
      results: allTodos.length,
      data: {
        allTodos,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// add a todo
exports.addTodo = async (req, res, next) => {
  try {
    // get all data from req.body
    const { title } = req.body;
    // check data validity
    if (!title)
      return res
        .status(404)
        .json({ status: "fail", message: "name field is empty" });

    const newTodo = await TodoModel.create({
      title,
    });
    return res.status(201).json({ status: "success", data: { newTodo } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

// update a todo
exports.updateTodo = async (req, res) => {
  try {
    // get data from req.body
    const { todoId, title } = req.body;
    // console.log(title);
    // find it in db and update it directly
    const todo = await TodoModel.findByIdAndUpdate(
      todoId,
      { title: title },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

// delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.body.todoId);
    console.log(req.body.todoId);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// get all tasks
exports.getTasks = async (req, res) => {
  try {
    // get todoId from req object
    const todoId = req.params.todoId;
    console.log(todoId);
    // check if todoid exists in db or not
    const todo = await TodoModel.findById(todoId);
    res.status(200).json({ status: "success", data: { tasks: todo.tasks } });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// add a task
exports.addTask = async (req, res, next) => {
  try {
    // get todoId from req object
    const todoId = req.params.todoId;
    // console.log(todoId);
    // check if todoid exists in db or not
    const todo = await TodoModel.findById(todoId);
    // console.log(todo);
    if (!todo) {
      return res
        .status(404)
        .json({ status: "fail", message: "todoId not found" });
    }

    // get data from req.body
    const { task } = req.body;
    todo.tasks.push(task);
    await todo.save();
    res.status(201).json({ status: "success", data: { todo } });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// updata a task
exports.updateTask = async (req, res, next) => {
  try {
    const { taskKey, updatedTask } = req.body;

    // find the todo
    const todo = await TodoModel.findById(req.params.todoId);
    todo.tasks[taskKey] = updatedTask;
    await todo.save();
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { taskKey } = req.body;
    const todo = await TodoModel.findById(req.params.todoId);
    console.log(todo);
    todo.tasks.splice(taskKey, 1);
    await todo.save();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
