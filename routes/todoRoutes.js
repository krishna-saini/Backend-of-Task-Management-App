const express = require("express");
const router = express.Router();
const { getTodos, addTodos } = require("../controllers/todoContoller");

// router.get("/", getTodos);

router.route("/").get(getTodos).post(addTodos);

module.exports = { router };
