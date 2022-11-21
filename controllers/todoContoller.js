const TodoModel = require("../models/todo");
exports.getTodos = async (req, res) => {
  res.status(200).json({
    message: "working route",
  });
};

// module.exports = { getTodos };

exports.addTodo = async (req, res, next) => {
  try {
    // get all data from req.body
    const { title } = req.body;

    // check data validity
    if (!title)
      res.status(404).json({ status: "fail", message: "name field is empty" });

    // check if todo already exists in db
    const existingTodo = await TodoModel.findOne({ title });
    if (existingTodo) {
      return res
        .status(404)
        .json({ status: "fail", message: "Two todos cannot have same name" });
    }

    // if not exists, create one
    const newTodo = await TodoModel.create({
      title,
    });
    return res.status(201).json({ status: "success", data: { newTodo } });
  } catch (err) {
    console.log(err);
  }
};

exports.getTasks = async (req, res) => {
  try {
    // get todoId from req object
    const todoId = req.params.todoId;
    // console.log(todoId);
    // check if todoid exists in db or not

    res.send("task are here");
  } catch (err) {
    console.log(err);
  }
};

exports.addTask = async (req, res, next) => {
  try {
    // get todoId from req object
    const todoId = req.params.todoId;
    console.log(todoId);
    // check if todoid exists in db or not
    const todo = await TodoModel.findById(todoId );
    // console.log(todo);
    if (!todo) { return res
      .status(404)
      .json({ status: "fail", message: "todoId not found" });}

    // get data from req.body
    const { task } = req.body;
    todo.tasks.push(task);
    await todo.save();
    res.status(201).json({ status: "success", data: { todo } });
  } catch (err) {
    console.log(err);
  }
};
