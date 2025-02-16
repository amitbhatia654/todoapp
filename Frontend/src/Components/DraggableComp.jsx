import { useDraggable } from "@dnd-kit/core";

export default function DraggableComp({
  task,
  handleStatusChange,
  setShowModal,
  setEditTask,
}) {
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: task._id,
    });

  const preventDragOnButtonClick = (e) => {
    console.log("it comesss");
    e.stopPropagation(); // Prevent drag event from being triggered
  };

  //   const handleMouseDown = (e) => {
  //     if (e.target.tagName === "BUTTON") {
  //       // Prevent drag if it's a button
  //       console.log("button");
  //       setDrag(false);
  //       e.stopPropagation();
  //     }
  //   };

  return (
    <>
      {" "}
      <div
        className="task-box"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        // onMouseDown={handleMouseDown}
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
                // onMouseDown={(e) => preventDragOnButtonClick(e)}
                //   onMouseDown={preventDragOnButtonClick}
                //   onMouseEnter={preventDragOnButtonClick}
                onClick={(e) => {
                  // e.stopPropagation();
                  console.log("it clicckkedd");
                  setEditTask(task), setShowModal(true);
                }}
              >
                Edit{" "}
              </button>
              <button
                className="btn btn-danger mx-1"
                onClick={() => {
                  handleDelete(task._id);
                }}
              >
                Delete{" "}
              </button>
              {/* <button
              className="btn btn-warning"
              onClick={() =>
                handleStatusChange({
                  ...task,
                  status: "progress",
                })
              }
            >
              Start Task
            </button> */}
            </div>
          )}
        </div>
        <div>{task.description}</div>
      </div>
    </>
  );
}
