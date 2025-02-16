import { useDroppable } from "@dnd-kit/core";

export default function DroppableComp({ title, status }) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        height: "100px",
        border: "2px dashed blue",
        padding: "30px",
        margin: "20px",
      }}
    >
      <h3>{title}</h3>
    </div>
  );
}
