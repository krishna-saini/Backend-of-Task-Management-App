/**
 * Importing the todo model to perform CRUD operations
 */
const TodoModel = require("../models/todo");

// get all todos
exports.getAllTodos = async (req, res) => {
  try {
    // return whole data
    const todo = await TodoModel.find();
    // send response
    return res.status(200).json({
      status: "success",
      results: todo.length,
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

// search todo
exports.searchTodo = async (req, res) => {
  try {
    // check if any query is passed
    const { q } = req.query;
    console.log(q);
    // if no query passed
    if (!q) {
      throw new Error("Search value  is required to fetch the todos");
    }
    // if query exists, send filtered data as per query(title of todo)
    const todo = await TodoModel.find({ title: new RegExp(q,"i") });
    // if no MATCHING data found
    if (todo.length === 0) {
      throw new Error("no such query found");
    }
    // else send the matched todo
    return res.status(200).json({
      status: "success",
      results: todo.length,
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err.message });
  }
};

// add a todo
exports.addTodo = async (req, res, next) => {
  try {
    // get all data from req.body
    const { title } = req.body;
    // check data validity
    if (!title) {
      throw new Error("title field is empty");
    }
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
      { new: true } // return updated todo
    );
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res
      .status(404)
      .json({ status: "fail", message: err || "fail to update todo" });
  }
};

// delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.body.todoId);
    // console.log(req.body.todoId);
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
    // if no todo found
    if (todo.length === 0) {
      throw new Error("invalid todo id");
    }
    // if exists send response
    else {
      res.status(200).json({ status: "success", data: { tasks: todo.tasks } });
    }
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
