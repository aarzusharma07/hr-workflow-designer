import { Handle, Position, type NodeProps } from "reactflow";
import type { EndData } from "@/types/workflow";

export function EndNode({ data, selected }: NodeProps<EndData>) {
  return (
    <div className={`rf-node end ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="kind">End</div>
      <div>{data.message || "End"}</div>
    </div>
  );
}
