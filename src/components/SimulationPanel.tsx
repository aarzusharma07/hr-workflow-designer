
import { useState } from "react";
import type { Edge, Node } from "reactflow";
import { simulateWorkflow } from "@/api/mockApi";
import type { SimulationResult, WorkflowNodeData } from "@/types/workflow";

interface Props {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

export function SimulationPanel({ nodes, edges }: Props) {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    const r = await simulateWorkflow(nodes, edges);
    setResult(r);
    setRunning(false);
  };

  return (
    <div className="sim">
      <div className="sim-bar">
        <button className="btn-primary" onClick={run} disabled={running}>
          {running ? "Running..." : "Run Workflow"}
        </button>
        <span className="sim-meta">
          {nodes.length} nodes · {edges.length} edges
        </span>
      </div>

      {result && !result.ok && (
        <div className="sim-error">
          <div><strong>Validation failed</strong></div>
          <ul>
            {result.errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {result && result.ok && (
        <ol className="sim-list">
          {result.steps.map((s, i) => (
            <li key={s.nodeId}>
              <span className="idx">#{i + 1} [{s.kind}]</span>
              {s.detail}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
