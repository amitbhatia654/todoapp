import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTask, updateTaskStatus } from "../redux/taskSlice";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import { getAllTask, postTask } from "../Api";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({});
  const tasks = useSelector((state) => state?.tasks?.tasks);

  const dispatch = useDispatch();

  const handleStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status }));
    if (status == "progress") toast("Task Started");
    else toast("Task Completed");
  };

  const getTask = async () => {
    const res = getAllTask();
  };

  useEffect(() => {
    getTask();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const res = postTask(values);
      if (values.id) {
        dispatch(updateTaskStatus(values));
      } else
        dispatch(
          addTask({
            id: Date.now(),
            startDate: new Date(),
            title: values.title,
            description: values.description,
            status: "pending",
          })
        );

      setShowModal(false);
      setEditTask({});
    } catch (error) {}
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
            onClick={() => setShowModal(true)}
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
                        <div>
                          <button
                            className="btn btn-secondary mx-1"
                            onClick={() => {
                              setEditTask(task), setShowModal(true);
                            }}
                          >
                            Edit{" "}
                          </button>
                          <button
                            className="btn btn-warning"
                            onClick={() =>
                              handleStatusChange(task.id, "progress")
                            }
                          >
                            Start Task
                          </button>
                        </div>
                      </div>
                      <div>{task.description}</div>
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
                      <div>{task.description}</div>
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
                      <div>{task.description}</div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="no-task">No Task completed Yet</div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal show d-block " tabIndex="-1" role="dialog">
          <div
            className={`modal-dialog modal-md modal-dialog-centered`}
            role="document"
          >
            {/* modal-dialog-centered" */}
            <div className="modal-content mymodal">
              <div className="modal-header">
                <h5 className="modal-title text-center">
                  {editTask.id ? "Edit" : "Add"} Task
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                    setEditTask({});
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={
                    editTask?.id ? editTask : { title: "", description: "" }
                  }
                  //   validationSchema={AddFolder}
                  enableReinitialize={true}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                      <div className=" ">
                        <div className="container-fluid ">
                          <div className="row">
                            <div className="">
                              <label htmlFor="">Task Title</label>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{ my: 1 }}
                              >
                                <OutlinedInput
                                  id="title"
                                  name="title"
                                  value={props.values.title}
                                  onChange={props.handleChange}
                                />
                              </FormControl>
                              <ErrorMessage
                                name="title"
                                component={"div"}
                                className="text-danger"
                              ></ErrorMessage>
                            </div>

                            <div className="">
                              <label htmlFor="">Description</label>
                              <FormControl
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{ my: 1 }}
                              >
                                <OutlinedInput
                                  id="description"
                                  name="description"
                                  value={props.values.description}
                                  onChange={props.handleChange}
                                />
                              </FormControl>
                              <ErrorMessage
                                name="description"
                                component={"div"}
                                className="text-danger"
                              ></ErrorMessage>
                            </div>

                            <div className="d-flex justify-content-center my-5">
                              <Button
                                variant="outlined"
                                type="submit"
                                sx={{
                                  my: 1,
                                  color: "#47478c",
                                  backgroundColor: "white",
                                  fontSize: "16px",
                                }}
                                // disabled={loading1}
                              >
                                Submit
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
