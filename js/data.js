// VERITAS Research Platform - Core State & Dataset
window.VERITAS_DATA = {
  system: {
    version: "v3.4 Epistemic Engine",
    coreName: "VERITAS Swarm Synthesis Core v4.2",
    merkleRoot: "0x9d4a8e2b17c93fa0174be618c78351a9420bf721",
    activeAgentsCount: 8,
    inFlightTasks: 14,
    consensusRate: "97.8%",
    precisionRate: "98.4%",
    totalSources: "38.2k",
    totalClaimsVerified: 1428,
    totalReports: 194,
    health: "Operational",
    mode: "Adversarial Tri-Party Audit"
  },

  depthModes: [
    {
      id: "standard",
      name: "Standard",
      agents: 8,
      label: "Standard (8 Agents)",
      icon: "bolt",
      desc: "Fast consensus across primary peer-reviewed databases and top citation graphs.",
      time: "~45s"
    },
    {
      id: "deep",
      name: "Deep Dive",
      agents: 16,
      label: "Deep Dive (16 Agents)",
      icon: "hub",
      desc: "Multi-tiered swarm cross-referencing preprints, datasets, and citation co-authors.",
      time: "~2m"
    },
    {
      id: "adversarial",
      name: "Exhaustive",
      agents: 24,
      label: "Exhaustive Adversarial",
      icon: "shield",
      desc: "Red-team skeptic agents actively attempting falsification and methodological attack.",
      time: "~5m"
    }
  ],

  sampleQueries: [
    "Evaluate peer-reviewed replications of room-temperature superconductivity claims in carbonaceous sulfur hydrides (2020-2024).",
    "Synthesize empirical benchmarks of fault-tolerant logical qubit coherence in neutral atom optical tweezer arrays.",
    "Cross-lingual reasoning discrepancies in sparse mixture-of-experts (MoE) architectures under low-resource language transfer.",
    "Mechanistic interpretability of sparse autoencoders trained on language model residual streams: Polysemanticity vs feature orthogonality."
  ],

  agents: [
    {
      id: "planner",
      name: "Planner Agent",
      role: "Orchestration • Epoch 1",
      icon: "account_tree",
      status: "completed",
      progress: 100,
      description: "Decomposes research hypothesis into verification trees and atomic empirical claims.",
      metric: "6 Sub-inquiries generated",
      model: "Gemini 2.5 Flash Thinking",
      threads: 4,
      temperature: 0.1,
      lastLog: "Hypothesis tree structured. Dispatched 3 parallel literature mining sub-threads."
    },
    {
      id: "researcher-alpha",
      name: "Researcher Alpha",
      role: "Literature Mining Swarm",
      icon: "menu_book",
      status: "completed",
      progress: 100,
      description: "Literature mining across indexed peer-reviewed repositories (Nature, PRX, IEEE, Science).",
      metric: "42 papers parsed",
      model: "Claude 3.7 Sonnet",
      threads: 8,
      temperature: 0.2,
      lastLog: "Ingested 42 DOIs from Nature & PRX Quantum with cross-citation mapping."
    },
    {
      id: "researcher-beta",
      name: "Researcher Beta",
      role: "Empirical Extraction Swarm",
      icon: "terminal",
      status: "completed",
      progress: 100,
      description: "Experimental benchmark extraction, empirical artifact scraping & code repo validation.",
      metric: "18 datasets validated",
      model: "GPT-4o Deep Research",
      threads: 6,
      temperature: 0.15,
      lastLog: "Parsed raw hardware benchmark CSVs from Harvard Q-Lab and QuEra open logs."
    },
    {
      id: "researcher-gamma",
      name: "Researcher Gamma",
      role: "Preprint & Prior Art Swarm",
      icon: "hub",
      status: "completed",
      progress: 100,
      description: "ArXiv preprint scanning, cross-domain citation graph evaluation, and patent prior art ingestion.",
      metric: "31 preprints cross-checked",
      model: "Gemini 2.5 Pro",
      threads: 5,
      temperature: 0.3,
      lastLog: "Checked 31 arXiv preprints for methodological drift and author retractions."
    },
    {
      id: "skeptic",
      name: "Skeptic Agent (Adversary)",
      role: "Contradiction Auditor",
      icon: "gavel",
      status: "active",
      progress: 82,
      description: "Adversarial counter-claim generator, p-hacking bias detection, and synthetic statistical falsification.",
      metric: "2 Counter-arguments flagged",
      model: "Anthropic Claude 3.5 Opus (Red-Team Config)",
      threads: 12,
      temperature: 0.7,
      lastLog: "Analyzing methodological discrepancies in sample sizes (N=24 vs N=1,400)...",
      critique: {
        title: "Discrepancy in Vacuum Lifetime Degradation at >1000 Traps",
        severity: "Moderate (Methodological Discrepancy)",
        points: [
          "Discrepancy 1: Early 2023 preprints reported infinite trap lifetime under continuous cooling using small ensembles (N=24), but omitted significant background collision losses that manifest when array scaling breaches N=1,200.",
          "Discrepancy 2: Re-analysis of raw telemetry reveals 1.4% trap loss per 100 shuttle cycles when beam pointing jitter exceeds 2.1 µrad.",
          "Empirical Resolution: Corroborated with Evered et al. (Nature 2023) and Bluvstein et al. (Nature 2024) pulse-shaping mitigations, which successfully restores 99.5% survival rate without decoherence."
        ]
      }
    },
    {
      id: "synthesizer",
      name: "Synthesizer Agent",
      role: "Graph Construction",
      icon: "mediation",
      status: "queued",
      progress: 0,
      description: "Constructs unified hypothesis & evidence graph, reconciling literature with empirical trials.",
      metric: "Awaiting Skeptic critique lock",
      model: "Gemini 2.5 Pro",
      threads: 6,
      temperature: 0.2,
      lastLog: "Listening for Skeptic adversarial lock release on #CLM-104 through #CLM-107."
    },
    {
      id: "verifier",
      name: "Verifier Agent",
      role: "Cryptographic Auditor",
      icon: "verified_user",
      status: "queued",
      progress: 0,
      description: "Cryptographic claim provenance attestation and epistemic truthfulness scoring.",
      metric: "Awaits Synthesizer evidence graph",
      model: "Deterministic Verifier / Merkle Tree Ledger",
      threads: 2,
      temperature: 0.0,
      lastLog: "Ready to assemble SHA-256 leaf nodes into immutable Merkle audit tree."
    },
    {
      id: "editor",
      name: "Editor Agent",
      role: "Dossier Formulation",
      icon: "edit_document",
      status: "queued",
      progress: 0,
      description: "Final editorial formulation, clear citation anchoring, and executive briefing synthesis.",
      metric: "Pending verification lock",
      model: "Claude 3.7 Sonnet Editorial",
      threads: 4,
      temperature: 0.35,
      lastLog: "Report formatting templates prepared for Markdown, PDF, and interactive view."
    }
  ],

  investigations: [
    {
      id: "QEC-2025",
      title: "Quantum Error Correction in Neutral Atoms (2025 Benchmarks)",
      query: "Fault-tolerant logical qubit coherence in neutral-atom optical tweezer arrays.",
      status: "Completed",
      statusClass: "completed",
      progress: 100,
      sourcesCount: 42,
      claimsTotal: 28,
      claimsVerified: 28,
      confidence: "99.2%",
      updatedAt: "12m ago",
      reportId: "VR-2025-084",
      merkleRoot: "0x9d4a8e2b17c93fa0174be618c78351a9420bf721"
    },
    {
      id: "MOE-2025",
      title: "Cross-lingual Reasoning in Sparse MoE Architectures",
      query: "Cross-lingual transfer capabilities and catastrophic forgetting in 64-expert mixture models.",
      status: "Under Verification",
      statusClass: "verifying",
      progress: 77,
      sourcesCount: 19,
      claimsTotal: 18,
      claimsVerified: 14,
      confidence: "88.6%",
      updatedAt: "34m ago",
      reportId: "VR-2025-085",
      merkleRoot: "0x3f1c99812bc89fa01476bcf"
    },
    {
      id: "RTS-2024",
      title: "Room-Temperature Ambient Pressure Hydride Superconductivity",
      query: "Evaluate independent replications of high-Tc claims in CSH and Lu-N-H compounds.",
      status: "Needs Review",
      statusClass: "review",
      progress: 24,
      sourcesCount: 64,
      claimsTotal: 29,
      claimsVerified: 7,
      confidence: "31.4%",
      updatedAt: "2h ago",
      reportId: "VR-2024-112",
      merkleRoot: "0xbb47ca9013ef45"
    },
    {
      id: "SAE-2025",
      title: "Mechanistic Interpretability of Sparse Autoencoders",
      query: "Feature geometry and monosemantic decomposition of language model activations.",
      status: "Researching",
      statusClass: "researching",
      progress: 66,
      sourcesCount: 27,
      claimsTotal: 12,
      claimsVerified: 8,
      confidence: "92.0%",
      updatedAt: "4h ago",
      reportId: "VR-2025-081",
      merkleRoot: "0x789acde455201"
    }
  ],

  claims: [
    {
      id: "CLM-104",
      investigationId: "QEC-2025",
      status: "Supported",
      statusType: "supported",
      text: "Neutral atom arrays achieved fault-tolerant logical qubit coherence exceeding physical T2 by 4.2x.",
      confidence: "99.4%",
      citationsCount: 8,
      verifiedDate: "2025-02-14T08:42:19Z",
      merkleHash: "0x9d4a8e2b17c93fa0174be618c78351a9420bf721",
      quote: "“...the demonstrated transversal gates in the 48-logical-qubit neutral atom processor yielded a net logical coherence gain of 4.2 relative to unencoded physical ancilla, confirming suppression of correlated Rydberg leakages below threshold.”",
      offset: "Section 4.2 • Paragraph 3",
      sha256: "e87f1c94025b31a2...7c041",
      citations: [
        {
          source: "Nature Physics (Oct 2024)",
          title: "High-Fidelity Entanglement in Rydberg Arrays",
          type: "Peer-reviewed Journal • Tier 1",
          doi: "10.1038/s41567-024",
          verified: true,
          match: "100%",
          quote: "“...observed logical storage lifetime increased by a factor of 4.2 ± 0.15 compared to physical T2 under equivalent continuous dynamical decoupling.”"
        },
        {
          source: "Physical Review X (Nov 2024)",
          title: "Fault-Tolerant Logical Architectures with Neutral Atoms",
          type: "Replication Paper • Tier 1",
          doi: "arXiv:2411.08234",
          verified: true,
          match: "98.5%",
          quote: "“...Cross-referenced mathematical framework validates lower bound coherence scaling > 4.0x under transversal parity checks.”"
        }
      ],
      agentConsensus: {
        synthesizer: {
          vote: "Affirmed",
          status: "positive",
          notes: "Affirmed with high consistency across independent experimental groups. Numerical gain matches theoretical bounds."
        },
        skeptic: {
          vote: "Cleared",
          status: "neutral",
          notes: "No conflicting baseline detected in preprints or published literature up to Dec 2024. Leakage error assumptions pass validation."
        }
      }
    },
    {
      id: "CLM-105",
      investigationId: "QEC-2025",
      status: "Supported",
      statusType: "supported",
      text: "Rydberg blockading fidelity reached 99.85% under two-qubit CZ gate operations.",
      confidence: "98.1%",
      citationsCount: 5,
      verifiedDate: "2025-02-14T08:45:00Z",
      merkleHash: "0x88f4b23011a9eecf",
      quote: "“...two-qubit entangling gates driven by shaped 310 nm UV laser pulses achieved bell state fidelities of 99.85(4)%, operating inside a cryogenic optical ring cavity.”",
      offset: "Section 2.1 • Figure 3b",
      sha256: "45a901ff8217bb4c...12de8",
      citations: [
        {
          source: "Nature 622 (2023)",
          title: "High-fidelity parallel entangling gates on a neutral-atom quantum computer",
          type: "Peer-reviewed Journal • Tier 1",
          doi: "10.1038/s41586-023-06481-y",
          verified: true,
          match: "99.8%",
          quote: "“...Achieved average two-qubit gate fidelity of 0.9952 using optimized adiabatic laser pulses in rubidium atoms.”"
        }
      ],
      agentConsensus: {
        synthesizer: {
          vote: "Affirmed",
          status: "positive",
          notes: "Measured bell state fidelities exceed fault-tolerant surface code threshold (99.0%)."
        },
        skeptic: {
          vote: "Cleared",
          status: "neutral",
          notes: "Statistical errors rigorously reported with bootstrap confidence intervals."
        }
      }
    },
    {
      id: "CLM-106",
      investigationId: "QEC-2025",
      status: "Contradicted",
      statusType: "contradicted",
      text: "Zero-field nuclear spin coherence persists at 300K without cryo-cooling.",
      confidence: "8.4%",
      citationsCount: 6,
      verifiedDate: "2025-02-14T08:48:12Z",
      merkleHash: "0x771cae9401928374",
      quote: "“...Early claims of ambient temperature coherence were found to be artifacts of RF background resonance rather than nuclear spin preservation.”",
      offset: "Discredited Preprint arXiv:2308.11204",
      sha256: "d112340ab987654...ff091",
      citations: [
        {
          source: "Physical Review Letters (2024)",
          title: "Refutation of Room-Temperature Nuclear Spin Traps",
          type: "Rebuttal Study • Tier 1",
          doi: "10.1103/PhysRevLett.132.040801",
          verified: true,
          match: "100%",
          quote: "“...Independent replication across 3 laboratories observed decoherence within <1 µs at temperatures above 15 Kelvin.”"
        }
      ],
      agentConsensus: {
        synthesizer: {
          vote: "Rejected",
          status: "negative",
          notes: "All 3 replication consortia failed to observe coherence times > 1 microsecond at 300K."
        },
        skeptic: {
          vote: "Falsified",
          status: "negative",
          notes: "Flagged initial experimental report for RF cavity interference artifact."
        }
      }
    },
    {
      id: "CLM-107",
      investigationId: "QEC-2025",
      status: "Partially Supported",
      statusType: "partial",
      text: "Transversal CNOT implementation reduces overhead by 60% compared to standard planar surface code.",
      confidence: "76.5%",
      citationsCount: 3,
      verifiedDate: "2025-02-14T08:51:30Z",
      merkleHash: "0x448be671239aa801",
      quote: "“...transversal CNOT operations between 3D reconfigurable arrays show a 40-60% reduction in required physical ancilla, dependent on topological connectivity bounds.”",
      offset: "Section 5.3 • Table 2",
      sha256: "90ca218bbff567...34aa1",
      citations: [
        {
          source: "PRX Quantum 5 (2024)",
          title: "Overhead Scaling in Mobile Qubit Architectures",
          type: "Peer-reviewed Journal • Tier 1",
          doi: "10.1103/PRXQuantum.5.020312",
          verified: true,
          match: "92.4%",
          quote: "“...Reductions range between 42% and 61% depending on the aspect ratio of the optical tweezer plane.”"
        }
      ],
      agentConsensus: {
        synthesizer: {
          vote: "Qualified",
          status: "neutral",
          notes: "Reduction is accurate for dense grid topologies, but decreases to ~35% in sparse lattices."
        },
        skeptic: {
          vote: "Caveat Noted",
          status: "neutral",
          notes: "Requires fast Acousto-Optic Deflectors (AOD) with minimal phase disturbance."
        }
      }
    },
    {
      id: "CLM-108",
      investigationId: "QEC-2025",
      status: "Supported",
      statusType: "supported",
      text: "Two-qubit gate fidelity confirmed at 99.52% using optimized adiabatic pulse shaping in Rubidium-87.",
      confidence: "99.1%",
      citationsCount: 4,
      verifiedDate: "2025-02-14T08:53:10Z",
      merkleHash: "0x3344bb1122cc8899",
      quote: "“...Using smooth spline pulse modulation, leakage to non-computational Rydberg states was bounded under 0.08%.”",
      offset: "Section 3.4 • Figure 4",
      sha256: "77aa33bb11ff09...22114",
      citations: [
        {
          source: "Nature (Evered et al., 2023)",
          title: "High-fidelity parallel entangling gates",
          type: "Journal Paper",
          doi: "10.1038/s41586-023-06481-y",
          verified: true,
          match: "100%",
          quote: "“...Fidelity demonstrated at 99.52% across dual species and single isotope arrays.”"
        }
      ],
      agentConsensus: {
        synthesizer: { vote: "Affirmed", status: "positive", notes: "Validated against benchmark logs." },
        skeptic: { vote: "Cleared", status: "neutral", notes: "Pulse fidelity calculations checked." }
      }
    }
  ],

  report: {
    id: "VR-2025-084",
    title: "Fault-Tolerant Quantum Computation via Neutral-Atom Arrays: Comprehensive Verification & Benchmark Synthesis",
    date: "Jan 18, 2025",
    readTime: "8 min read",
    claimsProven: "28/28 Claims Proven",
    statusBadge: "Dual-Blind Audited",
    coreEngine: "VERITAS Swarm Synthesis Core v4.2",
    citationsCount: 42,
    abstract: "Autonomous cross-examination executed across 42 primary peer-reviewed literature items and hardware benchmark repositories. Dual-blind verification confirmed under adversarial prompt arbitration.",
    hash: "0x8f2d4e7a83bb9412e87c538a0f9b6c18d32e5410",
    sections: [
      {
        id: "executive-summary",
        number: "01",
        title: "Executive Summary & Epistemic Verdict",
        content: `
          <div style="background-color:var(--surface-container-low); padding:1rem; border-radius:var(--radius-lg); border-left:3px solid var(--tertiary); margin-bottom:1rem;">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
              <span class="pill-badge pill-success"><span class="material-symbols-outlined icon-xs">verified</span> Dual-Blind Swarm Consensus: 100.0% Unanimous</span>
              <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary);">Merkle Root: 0x8f2d...5410</span>
            </div>
            <p style="font-size:0.9375rem; color:var(--on-surface); line-height:1.6; margin:0;">
              <strong>Epistemic Verdict:</strong> All 28 research claims evaluated across 42 peer-reviewed articles and hardware trial repositories have reached verified consensus. The adversarial falsification gate raised by the Skeptic Agent regarding vacuum lifetime degradation and sample size discrepancies has been rigorously audited and empirically settled.
            </p>
          </div>
          <p>
            Neutral-atom architectures trapped via optical tweezer arrays have demonstrated parity transition toward scalable fault-tolerant quantum computation (FTQC). Recent experimental synthesis confirms the capability to dynamically reconfigure atomic qubits mid-circuit, bypassing nearest-neighbor connectivity constraints inherent to planar superconducting lattices.
            <button class="claim-pill" data-claim-id="104" type="button">
              <span class="material-symbols-outlined icon-sm">verified</span>#104
            </button>
          </p>
          <p>
            By exploiting Rydberg-state excitation protocols, dual-qubit entangling gates routinely achieve fidelities exceeding 99.5%, creating transversal entangling gates across multi-hundred atom ensembles without compounding thermal jitter.
            <button class="claim-pill" data-claim-id="108" type="button">
              <span class="material-symbols-outlined icon-sm">verified</span>#108
            </button>
            The culmination of physical hardware tests and mathematical quantum error correction (QEC) codes signifies an inflection point: neutral-atom ensembles are no longer merely quantum simulators, but viable general-purpose fault-tolerant processors.
          </p>
        `
      },
      {
        id: "swarm-deliberation",
        number: "02",
        title: "Multi-Agent Swarm Deliberation & Round Execution Log",
        content: `
          <p>
            The verification of this dossier proceeded through six autonomous deliberation stages across eight specialized agents, executing continuous epistemic cross-checking and adversarial stress-testing:
          </p>
          <div style="display:flex; flex-direction:column; gap:0.85rem; margin-top:0.75rem;">
            <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:0.9rem; display:flex; gap:0.75rem; align-items:flex-start;">
              <span class="material-symbols-outlined" style="color:var(--tertiary-text); font-size:24px;">psychology</span>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.25rem;">
                  <strong style="color:var(--on-surface); font-size:0.875rem;">Round 1 • Planner Agent (Decomposition)</strong>
                  <span class="pill-badge pill-success" style="font-size:0.6875rem;">Passed (100%)</span>
                </div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">Decomposed FTQC hypothesis into 28 verifiable atomic claims spanning laser stability, Rydberg gate fidelity, and error correction thresholds.</p>
              </div>
            </div>

            <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:0.9rem; display:flex; gap:0.75rem; align-items:flex-start;">
              <span class="material-symbols-outlined" style="color:var(--tertiary-text); font-size:24px;">travel_explore</span>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.25rem;">
                  <strong style="color:var(--on-surface); font-size:0.875rem;">Round 2 • Researchers Triad α, β, γ (Corpus Mining)</strong>
                  <span class="pill-badge pill-success" style="font-size:0.6875rem;">Passed (100%)</span>
                </div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">Dispatched real-time queries across Nature, Science, PRX, and arXiv preprints. Ingested 42 primary peer-reviewed literature items and 18 empirical benchmark datasets.</p>
              </div>
            </div>

            <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:0.9rem; display:flex; gap:0.75rem; align-items:flex-start; border-left:3px solid var(--caution);">
              <span class="material-symbols-outlined" style="color:var(--caution); font-size:24px;">gavel</span>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.25rem;">
                  <strong style="color:var(--on-surface); font-size:0.875rem;">Round 3 • Skeptic Agent (Adversarial Review & Falsification Resolution)</strong>
                  <span class="pill-badge pill-success" style="font-size:0.6875rem;">Resolved & Cleared</span>
                </div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">
                  Flagged 2 counter-arguments: (1) Sample size skew (N=24 in early preprints vs N=1,400 in multi-core traps), and (2) 1.4% trap loss from beam pointing jitter. <em>Settled via Evered et al. (2023) pulse-shaping mitigations, successfully restoring 99.5% survival rate.</em>
                </p>
              </div>
            </div>

            <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:0.9rem; display:flex; gap:0.75rem; align-items:flex-start;">
              <span class="material-symbols-outlined" style="color:var(--tertiary-text); font-size:24px;">mediation</span>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.25rem;">
                  <strong style="color:var(--on-surface); font-size:0.875rem;">Round 4 • Synthesizer Agent (Evidence Graph Formulation)</strong>
                  <span class="pill-badge pill-success" style="font-size:0.6875rem;">Passed (100%)</span>
                </div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">Compiled unified claim & citation evidence matrix. Structured 14 primary claims and 42 citations into an acyclic dependency DAG with 0 topological conflicts.</p>
              </div>
            </div>

            <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:0.9rem; display:flex; gap:0.75rem; align-items:flex-start;">
              <span class="material-symbols-outlined" style="color:var(--tertiary-text); font-size:24px;">verified_user</span>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.25rem;">
                  <strong style="color:var(--on-surface); font-size:0.875rem;">Round 5 • Verifier Agent (Cryptographic Merkle Attestation)</strong>
                  <span class="pill-badge pill-success" style="font-size:0.6875rem;">Passed (100%)</span>
                </div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">Generated cryptographic Merkle tree state root (<code>0x8f2d4e7a83bb9412e87c538a0f9b6c18d32e5410</code>). Confirmed epistemic truthfulness rating at 99.4%.</p>
              </div>
            </div>

            <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-lg); padding:0.9rem; display:flex; gap:0.75rem; align-items:flex-start;">
              <span class="material-symbols-outlined" style="color:var(--tertiary-text); font-size:24px;">edit_document</span>
              <div style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.25rem;">
                  <strong style="color:var(--on-surface); font-size:0.875rem;">Round 6 • Editor Agent (Dossier Synthesis & Publication)</strong>
                  <span class="pill-badge pill-success" style="font-size:0.6875rem;">Completed (100%)</span>
                </div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">Synthesized comprehensive research dossier, architectural benchmark matrix, limitation caveats, and dual-blind audit trail.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "methodology",
        number: "03",
        title: "Research Methodology",
        content: `
          <p>
            The VERITAS agent cluster executed a tripartite verification process across 42 peer-reviewed experimental papers, arXiv preprints deposited between January 2021 and December 2024, and open-source benchmark logs from major academic consortia:
          </p>
          <div class="methodology-cards">
            <div class="method-card">
              <span class="step-badge">STAGE 1</span>
              <h4>Corpus Mining</h4>
              <p>Automated parsing of gate fidelities, decoherence metrics, and optical shuttle latencies.</p>
            </div>
            <div class="method-card">
              <span class="step-badge">STAGE 2</span>
              <h4>Adversarial Audit</h4>
              <p>Red-team agents questioned cherry-picked vacuum loss metrics and false-positive readouts.</p>
            </div>
            <div class="method-card success">
              <span class="step-badge success">STAGE 3</span>
              <h4>Consensus Score</h4>
              <p>Final epistemic agreement reached at 100% corroboration across 28 extracted claims.</p>
            </div>
          </div>
        `
      },
      {
        id: "key-findings",
        number: "04",
        title: "Key Discoveries & Synthesis",
        content: `
          <div class="discoveries-list">
            <div class="discovery-item">
              <div class="discovery-icon"><span class="material-symbols-outlined">shuffle</span></div>
              <div class="discovery-body">
                <div class="discovery-header">
                  <h4>Arbitrary All-to-All Connectivity</h4>
                  <span class="conf-badge">99.8% Conf.</span>
                </div>
                <p>AOD (Acousto-Optic Deflector) steerable lasers permit arbitrary transposition of physical atoms over 100 µm distances in under 30 µs without dephasing.</p>
              </div>
            </div>
            <div class="discovery-item">
              <div class="discovery-icon"><span class="material-symbols-outlined">format_image_left</span></div>
              <div class="discovery-body">
                <div class="discovery-header">
                  <h4>Logical Qubit Encoding Scaling</h4>
                  <span class="conf-badge">100% Conf.</span>
                </div>
                <p>Demonstrated instantiation of up to 48 logical qubits using surface codes and color codes, showing physical-to-logical error suppression ratios exceeding 2.1x.</p>
              </div>
            </div>
            <div class="discovery-item">
              <div class="discovery-icon"><span class="material-symbols-outlined">thermostat</span></div>
              <div class="discovery-body">
                <div class="discovery-header">
                  <h4>Room-Cryo Footprint Efficiency</h4>
                  <span class="conf-badge">97.4% Conf.</span>
                </div>
                <p>Unlike milli-Kelvin dilution refrigerators needed for transmon chips, neutral atoms operate effectively inside optical glass vacuum chambers at 4 Kelvin or ambient ultra-high vacuum.</p>
              </div>
            </div>
          </div>
        `
      },
      {
        id: "comparative-analysis",
        number: "05",
        title: "Architectural Benchmark Matrix",
        content: `
          <div class="table-container">
            <table class="benchmark-table">
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th class="highlight">Neutral Atoms</th>
                  <th>Superconducting</th>
                  <th>Trapped Ions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coherence (T₂)</td>
                  <td class="success-cell">~1.5 - 4.0 s</td>
                  <td>50 - 150 µs</td>
                  <td>~10 - 60 s</td>
                </tr>
                <tr>
                  <td>2-Qubit Gate Fidelity</td>
                  <td class="success-cell">99.5%</td>
                  <td>99.8%</td>
                  <td>99.9%</td>
                </tr>
                <tr>
                  <td>Interconnect Scalability</td>
                  <td class="success-cell">Extremely High</td>
                  <td>Low (Cables)</td>
                  <td>Moderate (Shuttling)</td>
                </tr>
                <tr>
                  <td>Active Trap Qubits</td>
                  <td class="success-cell">1,000+</td>
                  <td>1,121 (IBM Condor)</td>
                  <td>64 - 128</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      {
        id: "skeptic-audit",
        number: "06",
        title: "Conflicting Evidence & Adversarial Skeptic Audit",
        content: `
          <div class="audit-box" style="margin-bottom:1rem;">
            <div class="audit-header">
              <span class="material-symbols-outlined" style="color:var(--caution);">gavel</span>
              <div>
                <h4>Discrepancy 1: Sample Size Skew & Selection Bias (N=24 vs N=1,400)</h4>
                <p>Early 2023 preprints reported infinite trap lifetime under continuous cooling by extrapolating from small isolated ensembles of N=24 atoms. When the Skeptic Agent cross-examined raw telemetry against scaled multi-core runs of N=1,400 atoms, background collision rates surged by 3.8x. <strong>Resolution:</strong> Corroborated with empirical multi-run benchmarks from Harvard/MIT (2024), re-weighting the baseline model to account for multi-body thermal collisions.</p>
              </div>
            </div>
            <div class="audit-resolution">
              <span>Adversarial Resolution: Cleared via 2024 Harvard & QuEra empirical dataset</span>
              <span class="badge-resolved">Flag Reclassified (Resolved)</span>
            </div>
          </div>

          <div class="audit-box">
            <div class="audit-header">
              <span class="material-symbols-outlined" style="color:var(--caution);">balance</span>
              <div>
                <h4>Discrepancy 2: Pointing Jitter & 1.4% Shuttling Atom Loss</h4>
                <p>During active AOD dynamic qubit shuttling, laser beam pointing jitter exceeding 2.1 µrad induced a 1.4% loss per 100 shuttle cycles. <strong>Resolution:</strong> Corroborated with Evered et al. (Nature 2023) shaped-pulse adiabatic transport protocols, which suppressed vibrational excitation and restored a 99.5% survival rate.</p>
              </div>
            </div>
            <div class="audit-resolution">
              <span>Adversarial Resolution: Corroborated with Evered et al. (Nature 2023) pulse-shaping</span>
              <span class="badge-resolved">Consensus Attested (Resolved)</span>
            </div>
          </div>
        `
      },
      {
        id: "claims-ledger",
        number: "07",
        title: "Cryptographically Verified Claims Ledger",
        content: `
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <p>Every scientific assertion in this dossier is anchored to immutable SHA-256 state commitments, dual-blind auditor votes, and peer citations:</p>
            <div class="table-container">
              <table class="benchmark-table">
                <thead>
                  <tr>
                    <th>Claim ID</th>
                    <th>Proposition</th>
                    <th>Status</th>
                    <th>Confidence</th>
                    <th>Auditor Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>#CLM-104</strong></td>
                    <td>Fault-tolerant logical coherence exceeds physical T2 by 4.2x</td>
                    <td><span class="pill-badge pill-success">Supported</span></td>
                    <td class="success-cell">99.4%</td>
                    <td>Synthesizer: Affirmed • Skeptic: Cleared</td>
                  </tr>
                  <tr>
                    <td><strong>#CLM-105</strong></td>
                    <td>Rydberg CZ gate entangling fidelity reached 99.85%</td>
                    <td><span class="pill-badge pill-success">Supported</span></td>
                    <td class="success-cell">98.1%</td>
                    <td>Synthesizer: Affirmed • Skeptic: Cleared</td>
                  </tr>
                  <tr>
                    <td><strong>#CLM-106</strong></td>
                    <td>Zero-field nuclear spin coherence persists at 300K without cryo</td>
                    <td><span class="pill-badge pill-warning">Contradicted</span></td>
                    <td>8.4%</td>
                    <td>Synthesizer: Rejected • Skeptic: Flagged (RF Artifact)</td>
                  </tr>
                  <tr>
                    <td><strong>#CLM-107</strong></td>
                    <td>Transversal CNOT executed across 48 encoded logical qubits</td>
                    <td><span class="pill-badge pill-success">Supported</span></td>
                    <td class="success-cell">99.1%</td>
                    <td>Synthesizer: Affirmed • Skeptic: Cleared</td>
                  </tr>
                  <tr>
                    <td><strong>#CLM-108</strong></td>
                    <td>Mid-circuit dynamic shuttling with <1.5 µrad pointing jitter</td>
                    <td><span class="pill-badge pill-success">Supported</span></td>
                    <td class="success-cell">99.5%</td>
                    <td>Synthesizer: Affirmed • Skeptic: Resolved via Pulse Shaping</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        `
      },
      {
        id: "limitations",
        number: "08",
        title: "Limitations & Epistemic Boundaries",
        content: `
          <div class="limitations-box">
            <p>While logical transversal CNOT operations have succeeded on 48 logical nodes, commercial readiness remains constrained by three operational hurdles:</p>
            <ul>
              <li><strong>Gate Duration Latency:</strong> Rydberg interaction gate times (~200 ns to 1 µs) are roughly 10x slower than superconducting microwave pulses (20-40 ns).</li>
              <li><strong>Laser Optical Wavefront Imperfections:</strong> Residual spatial variations across 2D optical spatial light modulators (SLMs) generate slight Stark shifts.</li>
              <li><strong>State-Preparation-and-Measurement (SPAM):</strong> Atom detection via fluorescence imaging still risks 0.2% heating-induced ejection.</li>
            </ul>
          </div>
        `
      },
      {
        id: "references",
        number: "09",
        title: "Primary Verified Sources",
        content: `
          <div class="citations-grid">
            <div class="citation-card">
              <div class="cit-header">
                <span class="cit-auth">[1] Bluvstein, D., et al.</span>
                <span class="cit-match"><span class="material-symbols-outlined icon-xs">verified</span>100% Match</span>
              </div>
              <p class="cit-title">"A quantum processor based on coherent transport of entangled atom arrays"</p>
              <div class="cit-footer">
                <span>Nature 626, 58–65 (2024)</span>
                <a href="https://doi.org/10.1038/s41586-023-06927-3" target="_blank" rel="noopener">doi:10.1038/s41586-023-06927-3 <span class="material-symbols-outlined icon-xs">north_east</span></a>
              </div>
            </div>
            <div class="citation-card">
              <div class="cit-header">
                <span class="cit-auth">[2] Evered, S. J., et al.</span>
                <span class="cit-match"><span class="material-symbols-outlined icon-xs">verified</span>100% Match</span>
              </div>
              <p class="cit-title">"High-fidelity parallel entangling gates on a neutral-atom quantum computer"</p>
              <div class="cit-footer">
                <span>Nature 622, 268–272 (2023)</span>
                <a href="https://doi.org/10.1038/s41586-023-06481-y" target="_blank" rel="noopener">doi:10.1038/s41586-023-06481-y <span class="material-symbols-outlined icon-xs">north_east</span></a>
              </div>
            </div>
            <div class="citation-card">
              <div class="cit-header">
                <span class="cit-auth">[3] Shaw, A. L., et al.</span>
                <span class="cit-match"><span class="material-symbols-outlined icon-xs">verified</span>98.9% Match</span>
              </div>
              <p class="cit-title">"Benchmarking multi-qubit gates on Rydberg neutral atom arrays"</p>
              <div class="cit-footer">
                <span>PRX Quantum 5, 020312 (2024)</span>
                <a href="https://doi.org/10.1103/PRXQuantum.5.020312" target="_blank" rel="noopener">doi:10.1103/PRXQuantum.5.020312 <span class="material-symbols-outlined icon-xs">north_east</span></a>
              </div>
            </div>
            <div class="citation-card">
              <div class="cit-header">
                <span class="cit-auth">[4] Ebadi, S., et al.</span>
                <span class="cit-match"><span class="material-symbols-outlined icon-xs">verified</span>100% Match</span>
              </div>
              <p class="cit-title">"Quantum optimization of maximum independent set problems using neutral atom arrays"</p>
              <div class="cit-footer">
                <span>Science 376, 1209–1215 (2022)</span>
                <a href="https://doi.org/10.1126/science.abo6587" target="_blank" rel="noopener">doi:10.1126/science.abo6587 <span class="material-symbols-outlined icon-xs">north_east</span></a>
              </div>
            </div>
          </div>
        `
      }
    ]
  }
};
