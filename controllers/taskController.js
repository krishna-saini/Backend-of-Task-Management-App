const TodoModel = require("../models/todo");


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

