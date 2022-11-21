const express = require("express");
const router = express.Router();
const { getTasks, addTask } = require("../controllers/todoContoller");

// router.get("/", getTodos);
router.param("id", (req, res, next, val) => {
  console.log("first");
  next();
});
router.route("/:id").get(getTasks).post(addTask);

module.exports = { router };
