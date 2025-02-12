const express = require("express");
const router = express.Router();
const TaskController = require("../controller/TaskController");

router.route("/addTask").post(TaskController.AddTask);
router.route("/getAllTasks").get(TaskController.AddTask);

module.exports = router;
