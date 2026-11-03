# VERITAS — Autonomous Multi-Agent Research & Verification Platform

> **Stitch Project:** `10114282341085608186`  
> **Design Theme:** *Epistemic Clarity*  
> **Core Aesthetic:** Linear’s dense utility + Notion’s editorial calm + Apple’s industrial restraint.

---

## 🔬 Overview

**VERITAS** is an autonomous multi-agent research and verification platform designed for researchers, intelligence analysts, and enterprise operators. It enables users to investigate complex hypotheses, deploy autonomous agent swarms, adjudicate conflicting literature, and generate cryptographically verified, citation-backed research reports.

This production web application is built with clean semantic **HTML5**, a bespoke **Vanilla CSS design system**, and a reactive **ES6 JavaScript client**, requiring zero external dependencies or build tools.

---

## 🚀 Key Features & Views

### 1. Research Command Center (`#overview`)
- **Autonomous Intelligence Grid**: Query bar supporting natural language, boolean operations, and DOI references.
- **Verification Depth Selection**:
  - `Standard` (8 Agents, ~45s)
  - `Deep Dive` (16 Agents, ~2m)
  - `Exhaustive Adversarial` (24 Agents, ~5m)
- **Agent Parameters Drawer**: Configurable red-teaming arbiters, corroboration thresholds (80%–99%), and ArXiv preprint weighting.
- **Multi-Agent Pipeline Stepper**: Live tracking across *Planning → Research → Adversarial Review → Synthesis → Verification → Report*.
- **Metrics Telemetry (2x2)**: Active Tasks, Claims Verified (98.4% precision), Evidence Sources (38.2k index), and Report Archive.
- **Recent Investigations**: Filterable by *All Statuses*, *Completed*, *In Verification*, and *Needs Review*.

### 2. Research Agent Workspace (`#agents`)
- **Live Swarm Matrix**: Real-time agent status tracker (8 active nodes, 14 in-flight tasks, 97.8% consensus rate).
- **Workflow Dependency Graph (DAG)**: Visual pipeline flow mapping dependencies between agents.
- **8 Autonomous Agent Nodes**:
  1. **Planner Agent**: Decomposes hypotheses into verification trees.
  2. **Researcher Alpha**: Peer-reviewed literature mining (Nature, PRX, Science).
  3. **Researcher Beta**: Hardware benchmark & empirical dataset extraction.
  4. **Researcher Gamma**: ArXiv preprints and patent prior-art scanner.
  5. **Skeptic Agent (Adversary)**: Red-team contradiction detection and p-hacking bias auditing.
  6. **Synthesizer Agent**: Reconciles evidence graphs and confidence bounds.
  7. **Verifier Agent**: Deterministic Merkle leaf computation.
  8. **Editor Agent**: Executive dossier formulation.
- **Interactive Skeptic Critique Modal**: Detailed contradiction reports and methodological discrepancy audits.

### 3. Claim Verification Explorer (`#claims`)
- **Active Dossier**: Investigation `#QEC-2025` with 99.2% epistemic confidence and root hash `0x9d4a...f721`.
- **Claim Queue Filtering**: Filter by *Supported*, *Partially Supported*, *Contradicted*, and *Unsupported*.
- **Deep-Dive Evidence Inspector**:
  - Primary source passage extracts with highlighted core phrases and SHA-256 offset hashes.
  - Corroborating citation cards with verified DOI badges.
  - Multi-agent consensus votes (Synthesizer vs. Adversarial Skeptic).
  - Actions: *Copy Claim Hash*, *View Citation JSON*, and *Flag for Human Auditor Arbitration*.

### 4. Verified Research Report Reader (`#reports`)
- **Full Dossier Reader**: `#VR-2025-084` (*Fault-Tolerant Quantum Computation via Neutral-Atom Arrays*).
- **Interactive Claim Reference Pills**: Click any inline claim pill (e.g. `#104`, `#108`) to summon the floating evidence drawer.
- **Architectural Benchmark Matrix**: Responsive comparison of Neutral Atoms vs. Superconducting vs. Trapped Ions across coherence times, 2-qubit fidelities, and interconnect scalability.
- **Document Utility Actions**:
  - One-click copy of executive brief.
  - Export as Markdown (`.md`).
  - Print / PDF export stylesheet.
  - Dual-blind cryptographic audit trail inspection.

### 5. Settings & System Preferences (`#settings`)
- Model provider configuration: Gemini 2.5 Flash / Pro, Claude 3.7 Sonnet, GPT-4o, or Local Ollama / DeepSeek-R1.
- Minimum corroboration threshold slider (80%–99%).
- Strict DOI resolution and Merkle logging toggles.

### 6. Themes & Accessibility
- **Luminous Light Mode**: Crisp editorial archival print feel with subtle dividers and soft ambient shadows.
- **Deep Dark Mode**: High-contrast slate theme with glowing verification telemetry and focused readability.
- **Mobile Responsive Shell**: Fluid drawer navigation on mobile and fixed sidebar on desktop.

---

## 💻 Running Locally

### Option 1: Native Node.js (Zero-Dependency)
```bash
npm start
# Or directly:
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your web browser.

### Option 2: Python HTTP Server
```bash
python -m http.server 3000
```

---

## 📁 Directory Structure
```
├── index.html              # Main single-page application entry point
├── server.js               # Zero-dependency Node.js static server
├── package.json            # Project metadata and start scripts
├── css/
│   └── style.css           # Vanilla CSS Epistemic Clarity design system
├── js/
│   ├── app.js              # State manager, router, simulation runner, modal controls
│   └── data.js             # Dataset for investigations, claims, agents, and report
└── README.md               # Documentation
```
