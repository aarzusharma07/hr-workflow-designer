import { Handle, Position, type NodeProps } from "reactflow";
import type { TaskData } from "@/types/workflow";

export function TaskNode({ data, selected }: NodeProps<TaskData>) {
  return (
    <div className={`rf-node task ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="kind">Task</div>
      <div>{data.title || "Task"}</div>
      {data.assignee && <div className="sub">→ {data.assignee}</div>}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
