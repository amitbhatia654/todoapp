import { useDraggable } from "@dnd-kit/core";
import { deleteTask } from "../Api";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeTask } from "../redux/taskSlice";

export default function DraggableComp({ task, setShowModal, setEditTask }) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: task._id,
    });

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const res = await deleteTask(id);
    dispatch(removeTask(res.data.task._id));
    toast(res.data.message);
  };

  return (
    <>
      {" "}
      <div
        className="task-box"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        id="tasking"
        style={{
          backgroundColor: isDragging ? "green" : "",
          cursor: "move",
          transform: isDragging
            ? `translate(${transform?.x}px, ${transform?.y}px)`
            : "none",
        }}
      >
        <div className="d-flex justify-content-between">
          <h3> {task.title}</h3>
          {task.status == "pending" && (
            <div>
              <button
                className="btn btn-secondary "
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  setEditTask(task), setShowModal(true);
                }}
              >
                Edit{" "}
              </button>
              <button
                className="btn btn-danger mx-1"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  handleDelete(task._id);
                }}
              >
                Delete{" "}
              </button>
            </div>
          )}
        </div>
        <div>{task.description}</div>
      </div>
    </>
  );
}
