import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import {
  addTask,
  fetchTasks,
  removeTask,
  updateTaskStatus,
} from "../redux/taskSlice";

import { deleteTask, editTaskApi, postTask } from "../Api";
import { DndContext } from "@dnd-kit/core";
import DroppableComp from "./DroppableComp";
import DraggableComp from "./DraggableComp";

const HomePage = () => {
  const tasks = useSelector((state) => state?.tasks?.tasks);
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState({});

  const dispatch = useDispatch();

  const handleStatusChange = async (values) => {
    const res = await editTaskApi(values);
    toast(res.data.message);
    dispatch(updateTaskStatus(res.data.updatedTask));
  };

  const handleSubmit = async (values) => {
    try {
      if (values._id) {
        const res = await editTaskApi(values);
        toast(res.data.message);
        dispatch(updateTaskStatus(res.data.updatedTask));
      } else {
        const res = await postTask({ ...values, status: "pending" });
        toast(res.data.message);
        dispatch(addTask(res.data.result));
      }

      setShowModal(false);
      setEditTask({});
    } catch (error) {
      console.log(error, "error");
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteTask(id);
    dispatch(removeTask(res.data.task._id));
    toast(res.data.message);
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && over.id == "progress") {
      const draggedTask = tasks.find((t) => t._id == active.id);
      handleStatusChange({ ...draggedTask, status: "progress" });
    }

    if (over && over.id == "completed") {
      const draggedTask = tasks.find((t) => t._id == active.id);
      handleStatusChange({ ...draggedTask, status: "completed" });
    }

    if (over && over.id == "pending") {
      const draggedTask = tasks.find((t) => t._id == active.id);
      handleStatusChange({ ...draggedTask, status: "pending" });
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <h1 className="text-center mt-2 text-white">TASK APP</h1>
        <div className="wrapper">
          <div className="main-box ">
            <span className="dot1"></span>
            <span className="fs-2">Pending Task</span>
            <button
              className="btn btn-primary mx-2"
              onClick={() => setShowModal(true)}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              {" "}
              New Task{" "}
            </button>

            <DroppableComp
              title="Drop Here If Pending  "
              status="pending"
            ></DroppableComp>

            {tasks?.filter((t) => t.status == "pending").length > 0 ? (
              tasks.map((task, index) => {
                if (task.status == "pending")
                  return (
                    <div key={index}>
                      <DraggableComp
                        task={task}
                        id={task._id}
                        handleStatusChange={handleStatusChange}
                        setShowModal={setShowModal}
                        setEditTask={setEditTask}
                      ></DraggableComp>
                    </div>
                  );
              })
            ) : (
              <div className="no-task">No Pending Task !</div>
            )}
          </div>

          <div className=" main-box">
            <div className="dot2"></div>
            <span className="fs-2">In Progress</span>
            <DroppableComp
              title="Drop Here To Start Task"
              status="progress"
            ></DroppableComp>
            {tasks?.filter((t) => t.status == "progress").length > 0 ? (
              tasks.map((task, index) => {
                if (task.status == "progress")
                  return (
                    <div key={index}>
                      <DraggableComp
                        task={task}
                        id={task._id}
                        handleStatusChange={handleStatusChange}
                      ></DraggableComp>
                      {/* <div className="task-box">
                        <div className="d-flex justify-content-between">
                          <h3> {task.title}</h3>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              handleStatusChange({
                                ...task,
                                status: "completed",
                              })
                            }
                          >
                            Mark Completed
                          </button>
                        </div>
                        <div>{task.description}</div>
                      </div> */}
                    </div>
                  );
              })
            ) : (
              <div className="no-task">No active tasks right now</div>
            )}
          </div>
          <div className=" main-box">
            <div className="dot3"></div>
            <span className="fs-2">Completed</span>
            <DroppableComp
              title="Drop Here When Completed "
              status="completed"
            ></DroppableComp>
            {tasks?.filter((t) => t.status == "completed").length > 0 ? (
              tasks.map((task, index) => {
                if (task.status == "completed")
                  return (
                    <div key={index}>
                      <DraggableComp
                        task={task}
                        id={task._id}
                        handleStatusChange={handleStatusChange}
                      ></DraggableComp>
                    </div>
                  );
              })
            ) : (
              <div className="no-task">No Task completed Yet</div>
            )}
          </div>
        </div>
      </DndContext>
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
                  {editTask._id ? "Edit" : "Add"} Task
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
                    editTask?._id ? editTask : { title: "", description: "" }
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
