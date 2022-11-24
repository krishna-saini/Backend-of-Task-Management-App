const express = require("express");
const router = express.Router();
const { getAllAndFilteredTodos, addTodo, updateTodo,deleteTodo, getTasks, addTask, updateTask, deleteTask} = require("../controllers/todoContoller");

// home routes
router.route("/todos").get(getAllAndFilteredTodos).post(addTodo).patch(updateTodo).delete(deleteTodo);

// tasks routes
router.route("/todos/:todoId").get(getTasks).post(addTask).patch(updateTask).delete(deleteTask)



module.exports =  router;
