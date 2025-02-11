import { useState } from "react";
import "./App.css";
const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Task 1",
      desc: "Create a task app in Mern",
      status: "pending",
    },

    {
      id: 2,
      title: "Blogging Task",
      desc: "Create a blogging app in Mern",
      status: "progress",
    },
    {
      id: 3,
      title: "Mobile Application",
      desc: "Create a Mobile App in React Native",
      status: "progress",
    },
  ]);

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
          {data.filter((t) => t.status == "pending").length > 0 ? (
            data.map((task, key) => {
              if (task.status == "pending")
                return (
                  <div key={key}>
                    <div className="task-box1">
                      <div className="d-flex justify-content-between">
                        <h3> {task.title}</h3>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-danger dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChange(task, "progress")}
                              >
                                IN Progress
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChange(task, "completed")}
                              >
                                Completed
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>{task.desc}</div>
                      <div className="mt-3 fs-5">Date - 20-5-25</div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="no-task">No Task Assigned Yet</div>
          )}
        </div>
        <div className=" main-box">
          <div className="dot2"></div>
          <span className="fs-3">In Progress</span>
          {data.filter((t) => t.status == "progress").length > 0 ? (
            data.map((task) => {
              if (task.status == "progress")
                return (
                  <>
                    <div className="task-box2">
                      <div className="d-flex justify-content-between">
                        <h3> {task.title}</h3>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-warning dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChange(task, "pending")}
                              >
                                Not Started
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChange(task, "completed")}
                              >
                                Completed
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>{task.desc}</div>
                      <div className="mt-3 fs-5">Date - 20-5-25</div>
                    </div>
                  </>
                );
            })
          ) : (
            <div className="no-task">No Task Started Yet</div>
          )}
        </div>
        <div className=" main-box">
          <div className="dot3"></div>
          <span className="fs-3">Completed</span>
          {data.filter((t) => t.status == "completed").length > 0 ? (
            data.map((task, key) => {
              if (task.status == "completed")
                return (
                  <div key={key}>
                    <div className="task-box3">
                      <div className="d-flex justify-content-between">
                        <h3> {task.title}</h3>
                        <div className="btn-group">
                          <button
                            type="button"
                            className="btn btn-success dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></button>
                          <ul className="dropdown-menu">
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChange(task, "pending")}
                              >
                                Not Started
                              </button>
                            </li>

                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleChange(task, "progress")}
                              >
                                progress
                              </button>
                            </li>
                          </ul>
                        </div>
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
    </>
  );
};

export default App;
