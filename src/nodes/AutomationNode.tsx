import { Handle, Position, type NodeProps } from "reactflow";
import type { AutomationData } from "@/types/workflow";

export function AutomationNode({ data, selected }: NodeProps<AutomationData>) {
  return (
    <div className={`rf-node automation ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="kind">Automation</div>
      <div>{data.title || "Automation"}</div>
      {data.actionId && <div className="sub">action: {data.actionId}</div>}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
