import { Sidebar } from "@/components/Sidebar";
import { Canvas } from "@/components/Canvas";
import { NodeForm } from "@/components/NodeForm";
import { SimulationPanel } from "@/components/SimulationPanel";
import { useWorkflow } from "@/hooks/useWorkflow";

export default function App() {
  const wf = useWorkflow();
  const selectedNode = wf.nodes.find((n) => n.id === wf.selectedId) ?? null;

  return (
    <div className="app">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
      </header>
      <div className="app-body">
        <Sidebar />
        <div className="app-main">
          <Canvas
            nodes={wf.nodes}
            edges={wf.edges}
            onNodesChange={wf.onNodesChange}
            onEdgesChange={wf.onEdgesChange}
            onConnect={wf.onConnect}
            onSelect={wf.setSelectedId}
            onDropNode={wf.addNode}
          />
          <SimulationPanel nodes={wf.nodes} edges={wf.edges} />
        </div>
        <aside className="app-right">
          <NodeForm
            node={selectedNode}
            onChange={wf.updateNodeData}
            onDelete={wf.deleteSelected}
          />
        </aside>
      </div>
    </div>
  );
}
