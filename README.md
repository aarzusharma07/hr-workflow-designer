# HR Workflow Designer

A visual workflow designer for HR processes built with **React**, **TypeScript**, **Vite**, and **React Flow**.
This application allows users to create, configure, and simulate workflows such as onboarding, approvals, and automation pipelines.

# Features

* Drag-and-drop workflow builder using React Flow
* Multiple node types:

  * Start Node
  * Task Node
  * Approval Node
  * Automation Node
  * End Node
* Connect nodes visually using edges
* Dynamic node configuration panel
* Workflow validation:

  * Only one Start node allowed
  * Start node cannot have incoming edges
  * Detects disconnected nodes
* Workflow simulation using graph traversal
* Mock API integration (no backend required)
* Fully type-safe using TypeScript

# Example Workflow

Example flow:

Start → Task → Approval → End

# Steps to test:

1. Drag a **Start Node**
2. Add a **Task Node** (assign to HR)
3. Add an **Approval Node** (Manager approval)
4. Add an **End Node**
5. Connect nodes sequentially
6. Click **Run Workflow**

### Expected Output:

Start → Task → Approval → End

# Tech Stack

* React
* TypeScript
* Vite
* React Flow

# Prerequisites

* Node.js (v18 or higher)
* npm

Check versions:

```bash
node --version
npm --version
```

# Getting Started

# 1. Install dependencies

```bash
npm install
```

# 2. Start development server

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Project Structure

```
src/
├── api/
│   └── mockApi.ts
├── components/
│   ├── Canvas.tsx
│   ├── Sidebar.tsx
│   ├── NodeForm.tsx
│   └── SimulationPanel.tsx
├── hooks/
│   └── useWorkflow.ts
├── nodes/
│   ├── StartNode.tsx
│   ├── TaskNode.tsx
│   ├── ApprovalNode.tsx
│   ├── AutomationNode.tsx
│   └── EndNode.tsx
├── types/
│   └── workflow.ts
├── App.tsx
└── main.tsx
```
# How to Use

1. Drag nodes from sidebar onto canvas
2. Connect nodes using edges
3. Click a node to edit its properties
4. Click **Run Workflow** to simulate execution
5. Delete nodes using Delete/Backspace

# Key Design Decisions

* Used **React Flow** for building node-based UI
* Implemented **BFS traversal** for workflow execution
* Enforced **single Start node constraint**
* Used **custom hook (useWorkflow)** for state management
* Applied **TypeScript discriminated unions** for type safety
* Separated logic into components, hooks, and API layers

# Challenges Faced

One major challenge was ensuring correct workflow execution order.

Initially, nodes were processed in array order, which caused incorrect results.

This was solved by implementing **graph traversal (BFS) based on edges**, ensuring execution follows actual workflow connections.

# Future Improvements

* Improved UI and design system
* Export/Import workflow as JSON
* Cycle detection
* Undo/Redo functionality
* Backend integration for persistence
* Visual validation indicators on nodes


# Author

Built by *Aarzu* as part of the Tredence Full Stack Engineering Internship Assignment.
