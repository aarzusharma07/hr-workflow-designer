# HR Workflow Designer

**Aarzu Sharma**
Full Stack Engineering Internship Assignment

# Project Overview

This project is a visual workflow designer built using **React, TypeScript, Vite, and React Flow**.

It allows users to create, configure, and simulate workflows such as onboarding, approvals, and automation pipelines using a drag-and-drop interface.

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

**Start → Task → Approval → End**

# Steps to Test:

1. Drag a Start Node
2. Add a Task Node
3. Add an Approval Node
4. Add an End Node
5. Connect nodes sequentially
6. Click Run Workflow

# Expected Output:

Start → Task → Approval → End


# Architecture

The application follows a modular component-based architecture:

* **Canvas** – Handles React Flow rendering and interactions
* **Sidebar** – Provides draggable node types
* **NodeForm** – Manages dynamic configuration of nodes
* **SimulationPanel** – Handles workflow execution and validation
* **useWorkflow Hook** – Manages state and business logic
* **mockApi** – Simulates backend behavior

# How to Run

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open in browser:

```
http://localhost:5173
```

# Tech Stack

* React
* TypeScript
* Vite
* React Flow
* 
# Design Decisions

* Used **React Flow** for building node-based UI
* Implemented **BFS traversal** for correct workflow execution
* Enforced **single Start node constraint**
* Used **custom hook (useWorkflow)** for state management
* Applied **TypeScript discriminated unions** for type safety
* Separated logic into components, hooks, and API layers

# Challenges Faced

One major challenge was ensuring correct workflow execution order.

Initially, nodes were processed based on array order, which resulted in incorrect outputs.

This was resolved by implementing **graph traversal (BFS) using edges**, ensuring execution follows the actual workflow structure.

# Completed

* Drag and drop nodes
* Node connections
* Dynamic node configuration
* Workflow validation
* Simulation engine



# Future Improvements

* Improved UI and design system
* Export/Import workflows as JSON
* Cycle detection
* Undo/Redo functionality
* Backend integration for persistence
* Visual validation indicators


# Screenshots

<img width="1907" height="1062" alt="Screenshot 2026-04-22 155310" src="https://github.com/user-attachments/assets/7a0ae076-176d-4228-9ad3-5b864789e618" />
<img width="1905" height="1054" alt="Screenshot 2026-04-22 155626" src="https://github.com/user-attachments/assets/5686f641-9427-49f5-b810-bd686daf85dd" />
<img width="1567" height="658" alt="Screenshot 2026-04-22 155714" src="https://github.com/user-attachments/assets/63b34f15-66a9-4c44-91be-076994ce0c13" />
<img width="1915" height="1058" alt="Screenshot 2026-04-22 155740" src="https://github.com/user-attachments/assets/fa73addc-2466-403f-b889-fc906881e23e" />


## 🔗 GitHub Repository

https://github.com/aarzusharma07/hr-workflow-designer

---

## 👨‍💻 Author

Built by **Aarzu Sharma** as part of the Tredence Full Stack Engineering Internship Assignment.
