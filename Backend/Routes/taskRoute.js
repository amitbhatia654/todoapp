const express = require("express");
const router = express.Router();
const TaskController = require("../controller/TaskController");

router.route("/addTask").post(TaskController.AddTask);
router.route("/getAllTasks").get(TaskController.getTask);
router.route("/editTask").put(TaskController.EditTask);
router.route("/deleteTask/:id").delete(TaskController.deleteTask);

module.exports = router;
