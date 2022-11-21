const  TodoModel  = require("../models/todo");
exports.getTodos = async (req, res) => {
  res.status(200).json({
    message: "working route",
  });
};

// module.exports = { getTodos };

exports.addTodos = async(req,res,next)=>{
   // check if todo already exists
   
   // if no exists, create one
   const newTodo = new TodoModel.create({
    name:req.body
   })

}