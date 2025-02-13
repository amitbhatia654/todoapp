const task = require("../Models/TaskModel");

const AddTask = async (req, res) => {
  try {
    const result = await new task(req.body).save();
    res.status(200).json({ message: "New Task added Successfully", result });
  } catch (error) {
    res.send("something went wrong in add task ");
  }
};

const getTask = async (req, res) => {
  try {
    console.log("it called");
    const result = await task.find();
    console.log(result, "api ");
    res.status(200).send(result);
  } catch (error) {
    res.send("something went wrong in add task ");
  }
};

const EditTask = async (req, res) => {
  try {
    const taskId = req.body._id;
    const updatedTask = await task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });

    if (!updatedTask) {
      console.log("User not found");
      return;
    }
    res.status(200).json({ message: "Task updated Successfully", updatedTask });
  } catch (error) {
    res.send("something went wrong in add task ");
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task Deleted Successfully", task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Task Not Deleted", error: error.message });
  }
};

module.exports = { AddTask, getTask, EditTask, deleteTask };
