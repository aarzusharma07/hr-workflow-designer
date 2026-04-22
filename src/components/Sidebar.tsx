import type { NodeKind } from "@/types/workflow";

const ITEMS: { kind: NodeKind; label: string }[] = [
  { kind: "start", label: "Start" },
  { kind: "task", label: "Task" },
  { kind: "approval", label: "Approval" },
  { kind: "automation", label: "Automation" },
  { kind: "end", label: "End" },
];

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, kind: NodeKind) => {
    event.dataTransfer.setData("application/reactflow", kind);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h2>Nodes</h2>
      <p>Drag onto the canvas</p>
      {ITEMS.map((item) => (
        <div
          key={item.kind}
          draggable
          onDragStart={(e) => onDragStart(e, item.kind)}
          className={`sidebar-item ${item.kind}`}
        >
          {item.label}
        </div>
      ))}
    </aside>
  );
}
