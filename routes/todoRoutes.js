const express = require("express");
const router = express.Router();
const { getAllAndFilteredTodos, addTodo, updateTodo,deleteTodo} = require("../controllers/todoContoller");
const { getTasks, addTask, updateTask, deleteTask} = require("../controllers/taskController");

// home routes
router.route("/").get(getAllAndFilteredTodos).post(addTodo).patch(updateTodo).delete(deleteTodo);

// tasks routes
router.route("/:todoId").get(getTasks).post(addTask).patch(updateTask).delete(deleteTask)



module.exports =  router;
