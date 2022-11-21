const express = require("express");
const router = express.Router();
const taskRouter = express.Router();
const { getTodos, addTodo, getTasks, addTask} = require("../controllers/todoContoller");


router.route("/").get(getTodos).post(addTodo);

// router.param("todoId", (req, res, next, val) => {
//   console.log(val);
//   next();
// });
router.route("/:todoId").get(getTasks).post(addTask)

module.exports = { router, taskRouter };
