const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const task = new mongoose.model("task", taskSchema);
module.exports = task;
