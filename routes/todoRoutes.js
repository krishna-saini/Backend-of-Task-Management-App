const express = require("express");
const router = express.Router();
const { getAllTodos, addTodo,searchTodo, updateTodo,deleteTodo, getTasks, addTask, updateTask, deleteTask} = require("../controllers/todoContoller");

// home routes
router.route("/todos").get(getAllTodos).post(addTodo).patch(updateTodo).delete(deleteTodo);

// search todo
router.route("/todos/search").get(searchTodo)

// tasks routes
router.route("/todos/:todoId").get(getTasks).post(addTask).patch(updateTask).delete(deleteTask)



module.exports =  router;
