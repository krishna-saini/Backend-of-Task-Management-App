const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  userId: { type: String, required: [true, "id is required"] },
  title: { type: String, required: [true, "title is required"] },
  tasks: [String],
},{
  timestamps:true
});

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
