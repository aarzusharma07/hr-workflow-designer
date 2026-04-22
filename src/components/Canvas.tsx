import { useCallback, useRef } from "react";
import ReactFlow, {
  Background, Controls, MiniMap,
  type Edge, type Node, type NodeChange, type EdgeChange,
  type Connection, type ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { StartNode } from "@/nodes/StartNode";
import { TaskNode } from "@/nodes/TaskNode";
import { ApprovalNode } from "@/nodes/ApprovalNode";
import { AutomationNode } from "@/nodes/AutomationNode";
import { EndNode } from "@/nodes/EndNode";
import type { NodeKind, WorkflowNodeData } from "@/types/workflow";

// Defined OUTSIDE component (required by React Flow)
const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automation: AutomationNode,
  end: EndNode,
};

interface Props {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  onNodesChange: (c: NodeChange[]) => void;
  onEdgesChange: (c: EdgeChange[]) => void;
  onConnect: (c: Connection) => void;
  onSelect: (id: string | null) => void;
  onDropNode: (kind: NodeKind, position: { x: number; y: number }) => void;
}

export function Canvas({
  nodes, edges, onNodesChange, onEdgesChange, onConnect, onSelect, onDropNode,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const kind = event.dataTransfer.getData("application/reactflow") as NodeKind;
      if (!kind || !instanceRef.current) return;
      const position = instanceRef.current.screenToFlowPosition({
        x: event.clientX, y: event.clientY,
      });
      onDropNode(kind, position);
    },
    [onDropNode],
  );

  return (
    <div ref={wrapperRef} style={{ flex: 1, height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(inst) => (instanceRef.current = inst)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={(_, node) => onSelect(node.id)}
        onPaneClick={() => onSelect(null)}
        nodeTypes={nodeTypes}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>
    </div>
  );
}
