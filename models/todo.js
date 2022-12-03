const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  id: { type: String, unique: true, required: [true, "id is required"] },
  title: String,
  tasks: [String],
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
