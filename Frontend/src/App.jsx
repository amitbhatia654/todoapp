import { useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, addTask } from ".././src/redux/taskSlice";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const tasks = useSelector((state) => state?.tasks?.tasks);
  console.log(tasks, "the tasks is ");

  const dispatch = useDispatch();

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
    if (status == "progress") toast("Task Started");
    else toast("Task Completed");
  };

  const handleAddTask = () => {
    dispatch(addTask({ id: Date.now(), title: "New Task", status: "pending" }));
  };

  const handleChange = (task, status) => {
    setData((prevData) =>
      prevData.map((t) => (t.id == task.id ? { ...t, status } : t))
    );
  };
  return (
    <>
      <h2 className="text-center mt-2">Task APP</h2>

      <div className="wrapper">
        <div className="main-box">
          <span className="dot1"></span>
          <span className="fs-3">To Start</span>
          <button
            className="btn btn-primary mx-2"
            // onClick={() => handleAddTask()}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            Add Task{" "}
          </button>

          {tasks.filter((t) => t.status == "pending").length > 0 ? (
            tasks.map((task, index) => {
              if (task.status == "pending")
                return (
                  <div key={index}>
                    <div className="task-box">
                      <div className="d-flex justify-content-between">
                        <h3> {task.title}</h3>
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            handleStatusChange(task.id, "progress")
                          }
                        >
                          Start Task
                        </button>
                      </div>
                      <div>{task.desc}</div>
                      <div className="mt-3 fs-5">Date - 20-5-25</div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="no-task">No Pending Task Left</div>
          )}
        </div>
        <div className=" main-box">
          <div className="dot2"></div>
          <span className="fs-3">In Progress</span>
          {tasks.filter((t) => t.status == "progress").length > 0 ? (
            tasks.map((task, index) => {
              if (task.status == "progress")
                return (
                  <div key={index}>
                    <div className="task-box">
                      <div className="d-flex justify-content-between">
                        <h3> {task.title}</h3>
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleStatusChange(task.id, "completed")
                          }
                        >
                          Mark Completed
                        </button>
                      </div>
                      <div>{task.desc}</div>
                      <div className="mt-3 fs-5">Date - 20-5-25</div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="no-task">No Task Started Yet</div>
          )}
        </div>
        <div className=" main-box">
          <div className="dot3"></div>
          <span className="fs-3">Completed</span>
          {tasks.filter((t) => t.status == "completed").length > 0 ? (
            tasks.map((task, index) => {
              if (task.status == "completed")
                return (
                  <div key={index}>
                    <div className="task-box">
                      <div className="d-flex justify-content-between">
                        <h3> {task.title}</h3>
                      </div>
                      <div>{task.desc}</div>
                      <div className="mt-3 fs-5">Date - 20-5-25</div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="no-task">No Task completed Yet</div>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
