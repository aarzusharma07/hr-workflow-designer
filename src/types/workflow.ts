export type NodeKind = "start" | "task" | "approval" | "automation" | "end";

export interface MetadataItem { key: string; value: string; }
export interface CustomField { key: string; value: string; }

export interface StartData {
  kind: "start";
  title: string;
  metadata: MetadataItem[];
}

export interface TaskData {
  kind: "task";
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: CustomField[];
}

export interface ApprovalData {
  kind: "approval";
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

export interface AutomationData {
  kind: "automation";
  title: string;
  actionId: string;
  params: Record<string, string>;
}

export interface EndData {
  kind: "end";
  message: string;
  summary: boolean;
}

export type WorkflowNodeData =
  | StartData
  | TaskData
  | ApprovalData
  | AutomationData
  | EndData;

export interface Automation {
  id: string;
  label: string;
  params: string[];
}

export interface ExecutionStep {
  nodeId: string;
  kind: NodeKind;
  title: string;
  detail: string;
}

export interface SimulationResult {
  ok: boolean;
  errors: string[];
  steps: ExecutionStep[];
}
