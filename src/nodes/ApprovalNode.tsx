import { Handle, Position, type NodeProps } from "reactflow";
import type { ApprovalData } from "@/types/workflow";

export function ApprovalNode({ data, selected }: NodeProps<ApprovalData>) {
  return (
    <div className={`rf-node approval ${selected ? "selected" : ""}`}>
      <Handle type="target" position={Position.Left} />
      <div className="kind">Approval</div>
      <div>{data.title || "Approval"}</div>
      {data.approverRole && <div className="sub">role: {data.approverRole}</div>}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
