import { useCallback, useState } from "react";
import {
  addEdge, applyEdgeChanges, applyNodeChanges,
  type Connection, type Edge, type EdgeChange, type Node, type NodeChange,
} from "reactflow";
import type { NodeKind, WorkflowNodeData } from "@/types/workflow";

let idCounter = 1;
const nextId = () => `n_${idCounter++}`;

function defaultData(kind: NodeKind): WorkflowNodeData {
  switch (kind) {
    case "start": return { kind: "start", title: "Start", metadata: [] };
    case "task":  return { kind: "task", title: "New Task", description: "", assignee: "", dueDate: "", customFields: [] };
    case "approval": return { kind: "approval", title: "Approval", approverRole: "", autoApproveThreshold: 0 };
    case "automation": return { kind: "automation", title: "Automation", actionId: "", params: {} };
    case "end": return { kind: "end", message: "Done", summary: false };
  }
}

export function useWorkflow() {
  const [nodes, setNodes] = useState<Node<WorkflowNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
  }, []);

  const addNode = useCallback(
    (kind: NodeKind, position: { x: number; y: number }) => {
      setNodes((nds) => {
        if (kind === "start" && nds.some((n) => n.data.kind === "start")) return nds;
        const id = nextId();
        const newNode: Node<WorkflowNodeData> = { id, type: kind, position, data: defaultData(kind) };
        return [...nds, newNode];
      });
    }, [],
  );

  const updateNodeData = useCallback(
    (id: string, updater: (d: WorkflowNodeData) => WorkflowNodeData) => {
      setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: updater(n.data) } : n)));
    }, [],
  );

  const deleteSelected = useCallback(() => {
    if (!selectedId) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedId));
    setEdges((eds) => eds.filter((e) => e.source !== selectedId && e.target !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  return {
    nodes, edges, selectedId, setSelectedId,
    onNodesChange, onEdgesChange, onConnect,
    addNode, updateNodeData, deleteSelected, setEdges,
  };
}
