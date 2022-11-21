const TodoModel = require("../models/todo");
exports.getTodos = async (req, res) => {
  res.status(200).json({
    message: "working route",
  });
};

// module.exports = { getTodos };

exports.addTodos = async (req, res, next) => {
  try {
    // get all data from req.body
    const {title} = req.body;

    // check data validity
    if(!title) res.status(404).json({status:"fail",message:'name field is empty'});

    // check if todo already exists in db
    const existingTodo = await TodoModel.findOne({ title });
    if (existingTodo) {
      return res.status(404).json({status:"fail",message:'Two todos cannot have same name'});
    }

    // if not exists, create one
    const newTodo = await TodoModel.create({
      title,
    });
    return res.status(201).json({status:"success",data:{newTodo}});
  } catch (err) {
    console.log(err);
  }
};
