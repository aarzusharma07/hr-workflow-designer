import { useEffect, useState } from "react";
import type { Node } from "reactflow";
import { getAutomations } from "@/api/mockApi";
import type {
  Automation, ApprovalData, AutomationData, CustomField, EndData,
  MetadataItem, StartData, TaskData, WorkflowNodeData,
} from "@/types/workflow";

interface Props {
  node: Node<WorkflowNodeData> | null;
  onChange: (id: string, updater: (d: WorkflowNodeData) => WorkflowNodeData) => void;
  onDelete: () => void;
}

export function NodeForm({ node, onChange, onDelete }: Props) {
  if (!node) {
    return <div className="form-empty">Select a node to edit its properties.</div>;
  }

  const update = (updater: (d: WorkflowNodeData) => WorkflowNodeData) =>
    onChange(node.id, updater);

  return (
    <div className="form">
      <div className="form-header">
        <h3>{node.data.kind} node</h3>
        <button className="btn-link danger" onClick={onDelete}>Delete</button>
      </div>

      {node.data.kind === "start" && <StartForm data={node.data} update={update} />}
      {node.data.kind === "task" && <TaskForm data={node.data} update={update} />}
      {node.data.kind === "approval" && <ApprovalForm data={node.data} update={update} />}
      {node.data.kind === "automation" && <AutomationForm data={node.data} update={update} />}
      {node.data.kind === "end" && <EndForm data={node.data} update={update} />}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

type UpdateFn = (updater: (d: WorkflowNodeData) => WorkflowNodeData) => void;

function StartForm({ data, update }: { data: StartData; update: UpdateFn }) {
  const setMeta = (next: MetadataItem[]) =>
    update((d) => ({ ...(d as StartData), metadata: next }));
  return (
    <>
      <Field label="Title">
        <input
          className="input"
          value={data.title}
          onChange={(e) => update((d) => ({ ...(d as StartData), title: e.target.value }))}
        />
      </Field>
      <KeyValueList label="Metadata" items={data.metadata} onChange={setMeta} />
    </>
  );
}

function TaskForm({ data, update }: { data: TaskData; update: UpdateFn }) {
  const setFields = (next: CustomField[]) =>
    update((d) => ({ ...(d as TaskData), customFields: next }));
  return (
    <>
      <Field label="Title">
        <input className="input" value={data.title}
          onChange={(e) => update((d) => ({ ...(d as TaskData), title: e.target.value }))} />
      </Field>
      <Field label="Description">
        <textarea className="input" rows={3} value={data.description}
          onChange={(e) => update((d) => ({ ...(d as TaskData), description: e.target.value }))} />
      </Field>
      <Field label="Assignee">
        <input className="input" value={data.assignee}
          onChange={(e) => update((d) => ({ ...(d as TaskData), assignee: e.target.value }))} />
      </Field>
      <Field label="Due Date">
        <input type="date" className="input" value={data.dueDate}
          onChange={(e) => update((d) => ({ ...(d as TaskData), dueDate: e.target.value }))} />
      </Field>
      <KeyValueList label="Custom Fields" items={data.customFields} onChange={setFields} />
    </>
  );
}

function ApprovalForm({ data, update }: { data: ApprovalData; update: UpdateFn }) {
  return (
    <>
      <Field label="Title">
        <input className="input" value={data.title}
          onChange={(e) => update((d) => ({ ...(d as ApprovalData), title: e.target.value }))} />
      </Field>
      <Field label="Approver Role">
        <input className="input" value={data.approverRole}
          onChange={(e) => update((d) => ({ ...(d as ApprovalData), approverRole: e.target.value }))} />
      </Field>
      <Field label="Auto-approve threshold">
        <input type="number" className="input" value={data.autoApproveThreshold}
          onChange={(e) => update((d) => ({
            ...(d as ApprovalData), autoApproveThreshold: Number(e.target.value),
          }))} />
      </Field>
    </>
  );
}

function AutomationForm({ data, update }: { data: AutomationData; update: UpdateFn }) {
  const [automations, setAutomations] = useState<Automation[]>([]);

  useEffect(() => { getAutomations().then(setAutomations); }, []);

  const selected = automations.find((a) => a.id === data.actionId);

  return (
    <>
      <Field label="Title">
        <input className="input" value={data.title}
          onChange={(e) => update((d) => ({ ...(d as AutomationData), title: e.target.value }))} />
      </Field>
      <Field label="Action">
        <select className="input" value={data.actionId}
          onChange={(e) => update((d) => ({
            ...(d as AutomationData), actionId: e.target.value, params: {},
          }))}
        >
          <option value="">— Select —</option>
          {automations.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
      </Field>
      {selected?.params.map((p) => (
        <Field key={p} label={p}>
          <input className="input" value={data.params[p] ?? ""}
            onChange={(e) => update((d) => {
              const dd = d as AutomationData;
              return { ...dd, params: { ...dd.params, [p]: e.target.value } };
            })} />
        </Field>
      ))}
    </>
  );
}

function EndForm({ data, update }: { data: EndData; update: UpdateFn }) {
  return (
    <>
      <Field label="Message">
        <input className="input" value={data.message}
          onChange={(e) => update((d) => ({ ...(d as EndData), message: e.target.value }))} />
      </Field>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={data.summary}
          onChange={(e) => update((d) => ({ ...(d as EndData), summary: e.target.checked }))} />
        <span style={{ fontSize: 12 }}>Show summary</span>
      </label>
    </>
  );
}

function KeyValueList({
  label, items, onChange,
}: {
  label: string;
  items: { key: string; value: string }[];
  onChange: (next: { key: string; value: string }[]) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ fontSize: 11, color: "#4b5563", fontWeight: 500 }}>{label}</span>
      {items.map((it, idx) => (
        <div key={idx} className="kv-row">
          <input className="input" placeholder="key" value={it.key}
            onChange={(e) => onChange(items.map((x, i) => i === idx ? { ...x, key: e.target.value } : x))} />
          <input className="input" placeholder="value" value={it.value}
            onChange={(e) => onChange(items.map((x, i) => i === idx ? { ...x, value: e.target.value } : x))} />
          <button className="btn-link danger"
            onClick={() => onChange(items.filter((_, i) => i !== idx))}>✕</button>
        </div>
      ))}
      <button className="btn-link primary"
        onClick={() => onChange([...items, { key: "", value: "" }])}>+ Add</button>
    </div>
  );
}
