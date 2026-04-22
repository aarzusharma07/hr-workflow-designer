import type {
  Automation,
  ExecutionStep,
  SimulationResult,
  WorkflowNodeData,
} from "@/types/workflow";
import type { Edge, Node } from "reactflow";

const AUTOMATIONS: Automation[] = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
];

export async function getAutomations(): Promise<Automation[]> {
  await new Promise((r) => setTimeout(r, 150));
  return AUTOMATIONS.map((a) => ({ ...a, params: [...a.params] }));
}

export async function simulateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[],
): Promise<SimulationResult> {
  await new Promise((r) => setTimeout(r, 200));

  const errors: string[] = [];
  const startNodes = nodes.filter((n) => n.data.kind === "start");

  if (startNodes.length === 0) errors.push("Workflow is missing a start node.");
  if (startNodes.length > 1) errors.push("Only one start node is allowed.");

  if (nodes.length > 1) {
    const connected = new Set<string>();
    edges.forEach((e) => { connected.add(e.source); connected.add(e.target); });
    const orphans = nodes.filter((n) => !connected.has(n.id));
    if (orphans.length > 0) {
      errors.push(`Disconnected nodes: ${orphans.map((o) => describe(o.data)).join(", ")}`);
    }
  }

  startNodes.forEach((s) => {
    if (edges.some((e) => e.target === s.id)) {
      errors.push("Start node must not have an incoming edge.");
    }
  });

  if (errors.length > 0 || startNodes.length !== 1) {
    return { ok: false, errors, steps: [] };
  }

  const start = startNodes[0];
  const adjacency = new Map<string, string[]>();
  edges.forEach((e) => {
    const list = adjacency.get(e.source) ?? [];
    list.push(e.target);
    adjacency.set(e.source, list);
  });

  const steps: ExecutionStep[] = [];
  const visited = new Set<string>();
  const queue: string[] = [start.id];

  while (queue.length > 0) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    const node = nodes.find((n) => n.id === id);
    if (!node) continue;
    steps.push({
      nodeId: node.id,
      kind: node.data.kind,
      title: titleOf(node.data),
      detail: describe(node.data),
    });
    (adjacency.get(id) ?? []).forEach((n) => queue.push(n));
  }

  return { ok: true, errors: [], steps };
}

function titleOf(d: WorkflowNodeData): string {
  if (d.kind === "end") return "End";
  return d.title || d.kind;
}

function describe(d: WorkflowNodeData): string {
  switch (d.kind) {
    case "start":      return `Start: ${d.title || "Untitled"}`;
    case "task":       return `Task "${d.title}" -> ${d.assignee || "unassigned"}`;
    case "approval":   return `Approval "${d.title}" by ${d.approverRole || "?"}`;
    case "automation": return `Automation "${d.title}" runs ${d.actionId || "(none)"}`;
    case "end":        return `End: ${d.message || "Workflow complete"}`;
  }
}
