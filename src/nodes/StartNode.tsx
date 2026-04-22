import { Handle, Position, type NodeProps } from "reactflow";
import type { StartData } from "@/types/workflow";

export function StartNode({ data, selected }: NodeProps<StartData>) {
  return (
    <div className={`rf-node start ${selected ? "selected" : ""}`}>
      <div className="kind">Start</div>
      <div>{data.title || "Start"}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
