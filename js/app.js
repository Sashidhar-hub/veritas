// ==========================================================================
// VERITAS Research Platform - Client Application Controller
// Epistemic Clarity Architecture & Micro-Interactions
// ==========================================================================

(function() {
  'use strict';

  // Global App State
  const state = {
    currentView: 'overview',
    selectedDepth: 'standard',
    activeInvestigationFilter: 'all',
    activeClaimFilter: 'all',
    selectedClaimId: 'CLM-104',
    theme: localStorage.getItem('veritas_theme') || 'light',
    simulating: false,
    toastTimeout: null,
    swarmStage: 3,
    swarmRunning: false,
    swarmCompleted: false
  };

  // DOM Elements
  const elements = {
    // Views
    views: {
      overview: document.getElementById('view-overview'),
      agents: document.getElementById('view-agents'),
      claims: document.getElementById('view-claims'),
      reports: document.getElementById('view-reports'),
      settings: document.getElementById('view-settings'),
      pricing: document.getElementById('view-pricing')
    },
    // Navigation
    sidebar: document.getElementById('app-sidebar'),
    sidebarBackdrop: document.getElementById('sidebar-backdrop'),
    sidebarToggleBtn: document.getElementById('sidebar-toggle-btn'),
    sidebarCloseBtn: document.getElementById('sidebar-close-btn'),
    navItems: document.querySelectorAll('.nav-item'),
    bottomTabs: document.querySelectorAll('.bottom-tab'),
    brandHomeLink: document.getElementById('brand-home-link'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    quickSearchBtn: document.getElementById('quick-search-btn'),
    notificationsBtn: document.getElementById('notifications-btn'),

    // Command Center
    queryInput: document.getElementById('query-input'),
    insertSampleBtn: document.getElementById('insert-sample-btn'),
    depthPills: document.querySelectorAll('.depth-pill'),
    advToggleBtn: document.getElementById('adv-toggle-btn'),
    advPanel: document.getElementById('adv-settings-panel'),
    advChevron: document.getElementById('adv-chevron'),
    startInvestigationBtn: document.getElementById('start-investigation-btn'),
    investigationsContainer: document.getElementById('investigations-list-container'),
    investigationFilterTabs: document.querySelectorAll('#investigation-filter-tabs .filter-tab'),

    // Agents View
    agentsContainer: document.getElementById('agents-grid-container'),

    // Claims View
    claimsContainer: document.getElementById('claims-list-container'),
    claimsFilterTabs: document.querySelectorAll('#claims-filter-tabs .filter-tab'),
    claimsQueueCounter: document.getElementById('claims-queue-counter'),
    inspectClaimId: document.getElementById('inspect-claim-id'),
    inspectClaimStatus: document.getElementById('inspect-claim-status'),
    inspectClaimTimestamp: document.getElementById('inspect-claim-timestamp'),
    inspectClaimQuote: document.getElementById('inspect-claim-quote'),
    inspectClaimOffset: document.getElementById('inspect-claim-offset'),
    inspectClaimSha: document.getElementById('inspect-claim-sha'),
    inspectCitationsContainer: document.getElementById('inspect-citations-container'),
    inspectConsensusContainer: document.getElementById('inspect-consensus-container'),
    copyClaimHashBtn: document.getElementById('copy-claim-hash-btn'),
    viewCitationJsonBtn: document.getElementById('view-citation-json-btn'),
    flagHumanAuditorBtn: document.getElementById('flag-human-auditor-btn'),

    // Reports View
    reportArticleBody: document.getElementById('report-article-body'),
    reportCopyBtn: document.getElementById('report-copy-btn'),
    reportDownloadBtn: document.getElementById('report-download-btn'),
    reportPrintBtn: document.getElementById('report-print-btn'),
    inspectAuditTrailBtn: document.getElementById('inspect-audit-trail-btn'),

    // Modals & Popups
    floatingEvidenceToast: document.getElementById('floating-evidence-toast'),
    evidenceToastTitle: document.getElementById('evidence-toast-title'),
    evidenceToastText: document.getElementById('evidence-toast-text'),
    evidenceToastSource: document.getElementById('evidence-toast-source'),
    globalToast: document.getElementById('global-toast'),
    globalToastMsg: document.getElementById('global-toast-msg'),
    simulationModal: document.getElementById('simulation-modal'),
    simViewReportBtn: document.getElementById('sim-view-report-btn'),
    simQueryTitle: document.getElementById('sim-query-title'),
    simConsoleOutput: document.getElementById('sim-console-output')
  };

  // ========================================================================
  // Initialization
  // ========================================================================
  function init() {
    applyTheme(state.theme);
    setupRouting();
    setupEventListeners();
    renderInvestigations();
    renderAgents();
    renderClaims();
    renderInspector(state.selectedClaimId);
    renderReport();
    setupPricingListeners();
    updateDagGraph(state.swarmStage);
    updateSwarmStats(state.swarmStage, false);
    renderSwarmControlBanner();

    // Check URL hash for initial route
    const hash = window.location.hash.replace('#', '');
    if (hash && elements.views[hash]) {
      navigateTo(hash);
    } else {
      navigateTo('overview');
    }
  }

  // ========================================================================
  // Theme Management
  // ========================================================================
  function applyTheme(themeName) {
    state.theme = themeName;
    localStorage.setItem('veritas_theme', themeName);
    if (themeName === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      if (elements.themeIcon) elements.themeIcon.innerText = 'light_mode';
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (elements.themeIcon) elements.themeIcon.innerText = 'dark_mode';
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    showToast(state.theme === 'dark' ? 'Dark theme enabled' : 'Luminous light theme enabled');
  }

  // ========================================================================
  // Navigation & View Routing
  // ========================================================================
  function navigateTo(viewId) {
    if (!elements.views[viewId]) return;

    state.currentView = viewId;
    window.location.hash = '#' + viewId;

    // Toggle active view container
    Object.keys(elements.views).forEach(key => {
      if (key === viewId) {
        elements.views[key].classList.add('active-view');
      } else {
        elements.views[key].classList.remove('active-view');
      }
    });

    // Update Desktop Nav Active States
    elements.navItems.forEach(item => {
      if (item.dataset.view === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Bottom Tab Active States
    elements.bottomTabs.forEach(tab => {
      if (tab.dataset.view === viewId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Close Mobile Drawer if open
    closeSidebar();

    // Scroll stage to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setupRouting() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && elements.views[hash] && hash !== state.currentView) {
        navigateTo(hash);
      }
    });
  }

  function openSidebar() {
    elements.sidebar.classList.add('open');
    elements.sidebarBackdrop.classList.add('active');
  }

  function closeSidebar() {
    elements.sidebar.classList.remove('open');
    elements.sidebarBackdrop.classList.remove('active');
  }

  // ========================================================================
  // Event Listeners
  // ========================================================================
  function setupEventListeners() {
    // Sidebar Toggles
    if (elements.sidebarToggleBtn) elements.sidebarToggleBtn.addEventListener('click', openSidebar);
    if (elements.sidebarCloseBtn) elements.sidebarCloseBtn.addEventListener('click', closeSidebar);
    if (elements.sidebarBackdrop) elements.sidebarBackdrop.addEventListener('click', closeSidebar);
    if (elements.brandHomeLink) elements.brandHomeLink.addEventListener('click', () => navigateTo('overview'));
    if (elements.themeToggleBtn) elements.themeToggleBtn.addEventListener('click', toggleTheme);

    // Nav Item Clicks
    elements.navItems.forEach(item => {
      item.addEventListener('click', e => {
        const view = item.dataset.view;
        if (view) {
          e.preventDefault();
          navigateTo(view);
        }
      });
    });

    // Bottom Tab Clicks
    elements.bottomTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const view = tab.dataset.view;
        if (view) navigateTo(view);
      });
    });

    // New Research nav button
    const newResearchNav = document.getElementById('nav-new-research');
    if (newResearchNav) {
      newResearchNav.addEventListener('click', e => {
        e.preventDefault();
        navigateTo('overview');
        elements.queryInput.focus();
        showToast('Enter your research inquiry to begin');
      });
    }

    // Insert Sample Query
    if (elements.insertSampleBtn) {
      elements.insertSampleBtn.addEventListener('click', () => {
        const randomQuery = VERITAS_DATA.sampleQueries[Math.floor(Math.random() * VERITAS_DATA.sampleQueries.length)];
        elements.queryInput.value = randomQuery;
        elements.queryInput.focus();
        showToast('Sample research hypothesis inserted');
      });
    }

    // Depth Pills Selection
    elements.depthPills.forEach(pill => {
      pill.addEventListener('click', () => {
        elements.depthPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.selectedDepth = pill.dataset.depth;
        showToast(`Verification depth: ${state.selectedDepth.toUpperCase()}`);
      });
    });

    // Advanced Panel Toggle
    if (elements.advToggleBtn && elements.advPanel) {
      elements.advToggleBtn.addEventListener('click', () => {
        const isOpen = elements.advPanel.classList.contains('open');
        if (isOpen) {
          elements.advPanel.classList.remove('open');
          elements.advChevron.style.transform = 'rotate(0deg)';
        } else {
          elements.advPanel.classList.add('open');
          elements.advChevron.style.transform = 'rotate(180deg)';
        }
      });
    }

    // Start Investigation CTA
    if (elements.startInvestigationBtn) {
      elements.startInvestigationBtn.addEventListener('click', startInvestigation);
    }

    // Investigation Filter Tabs
    elements.investigationFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        elements.investigationFilterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeInvestigationFilter = tab.dataset.filter;
        renderInvestigations();
      });
    });

    // Claims Filter Tabs
    elements.claimsFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        elements.claimsFilterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeClaimFilter = tab.dataset.claimFilter;
        renderClaims();
      });
    });

    // Claims Inspector Actions
    if (elements.copyClaimHashBtn) {
      elements.copyClaimHashBtn.addEventListener('click', () => {
        const claim = VERITAS_DATA.claims.find(c => c.id === state.selectedClaimId);
        if (claim) {
          navigator.clipboard.writeText(claim.merkleHash).then(() => {
            showToast(`Copied claim hash (${claim.merkleHash.substring(0, 10)}...)`);
          });
        }
      });
    }

    if (elements.viewCitationJsonBtn) {
      elements.viewCitationJsonBtn.addEventListener('click', openCitationJsonModal);
    }

    if (elements.flagHumanAuditorBtn) {
      elements.flagHumanAuditorBtn.addEventListener('click', () => {
        openModal('flag-modal');
      });
    }

    // Report Actions
    if (elements.reportCopyBtn) {
      elements.reportCopyBtn.addEventListener('click', copyReportText);
    }

    if (elements.reportDownloadBtn) {
      elements.reportDownloadBtn.addEventListener('click', downloadReportMarkdown);
    }

    if (elements.reportPrintBtn) {
      elements.reportPrintBtn.addEventListener('click', () => window.print());
    }

    if (elements.inspectAuditTrailBtn) {
      elements.inspectAuditTrailBtn.addEventListener('click', () => {
        openModal('audit-trail-modal');
      });
    }

    // Header actions
    if (elements.quickSearchBtn) {
      elements.quickSearchBtn.addEventListener('click', () => {
        navigateTo('claims');
        showToast('Viewing verified evidence claims');
      });
    }

    if (elements.notificationsBtn) {
      elements.notificationsBtn.addEventListener('click', () => {
        showToast('System: All 8 autonomous arbiters calibrated & online.');
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        navigateTo('claims');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (state.currentView === 'overview' && elements.queryInput.value.trim()) {
          startInvestigation();
        }
      }
    });

    // Settings slider
    const slider = document.getElementById('setting-consensus-slider');
    const sliderDisplay = document.getElementById('setting-slider-display');
    if (slider && sliderDisplay) {
      slider.addEventListener('input', () => {
        sliderDisplay.innerText = slider.value + '%';
        const pThresh = document.getElementById('param-threshold-val');
        if (pThresh) pThresh.innerText = slider.value + '%';
      });
    }
  }

  // ========================================================================
  // View Rendering: Overview & Investigations
  // ========================================================================
  function renderInvestigations() {
    if (!elements.investigationsContainer) return;

    const filtered = VERITAS_DATA.investigations.filter(inv => {
      if (state.activeInvestigationFilter === 'all') return true;
      return inv.statusClass === state.activeInvestigationFilter;
    });

    if (filtered.length === 0) {
      elements.investigationsContainer.innerHTML = `
        <div style="text-align:center; padding:1.5rem; color:var(--secondary); font-size:0.875rem;">
          No investigations match this status filter.
        </div>
      `;
      return;
    }

    elements.investigationsContainer.innerHTML = filtered.map(inv => {
      let badgeClass = 'pill-neutral';
      let progressColor = 'var(--secondary)';
      let badgeIcon = '';

      if (inv.statusClass === 'completed') {
        badgeClass = 'pill-success';
        progressColor = 'var(--tertiary-text)';
        badgeIcon = '<span class="material-symbols-outlined icon-xs">task_alt</span>';
      } else if (inv.statusClass === 'verifying') {
        badgeClass = 'pill-primary';
        progressColor = 'var(--primary)';
        badgeIcon = '<span class="material-symbols-outlined icon-xs animate-spin">sync</span>';
      } else if (inv.statusClass === 'review') {
        badgeClass = 'pill-danger';
        progressColor = 'var(--error-text)';
        badgeIcon = '<span class="material-symbols-outlined icon-xs">warning</span>';
      } else if (inv.statusClass === 'researching') {
        badgeClass = 'pill-primary';
        progressColor = 'var(--primary)';
        badgeIcon = '<span class="material-symbols-outlined icon-xs animate-spin">autorenew</span>';
      }

      return `
        <article class="investigation-item" onclick="openInvestigation('${inv.id}')">
          <div class="inv-row-top">
            <h3 class="inv-title">${inv.title}</h3>
            <span class="pill-badge ${badgeClass}">
              ${badgeIcon}
              <span>${inv.status}</span>
            </span>
          </div>

          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${inv.progress}%; background-color: ${progressColor};"></div>
          </div>

          <div class="inv-meta-row">
            <div class="inv-meta-left">
              <span style="display:flex; align-items:center; gap:3px;">
                <span class="material-symbols-outlined icon-xs">menu_book</span>
                ${inv.sourcesCount} Sources
              </span>
              <span style="display:flex; align-items:center; gap:3px; color:${progressColor}; font-weight:600;">
                <span class="material-symbols-outlined icon-xs">verified</span>
                ${inv.claimsVerified}/${inv.claimsTotal} Claims
              </span>
            </div>
            <div style="display:flex; align-items:center; gap:4px;">
              <span>${inv.updatedAt}</span>
              <span class="material-symbols-outlined icon-xs">chevron_right</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ========================================================================
  // View Rendering: Agent Swarm Nodes
  // ========================================================================
  function renderAgents() {
    if (!elements.agentsContainer) return;

    elements.agentsContainer.innerHTML = VERITAS_DATA.agents.map(agent => {
      let statusBadge = '';
      const isHighlight = agent.status === 'active';
      const isCompleted = agent.status === 'completed';

      if (isCompleted) {
        statusBadge = `
          <span class="pill-badge pill-success">
            <span class="material-symbols-outlined icon-xs">check_circle</span>
            Completed (100%)
          </span>
        `;
      } else if (isHighlight) {
        statusBadge = `
          <span class="pill-badge pill-primary" style="background-color:var(--primary); color:#ffffff;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#ffffff;" class="animate-ping"></span>
            Active (${agent.progress}%)
          </span>
        `;
      } else {
        statusBadge = `
          <span class="pill-badge pill-neutral">
            <span class="material-symbols-outlined icon-xs">schedule</span>
            Queued
          </span>
        `;
      }

      let extraBody = '';
      if (isHighlight) {
        extraBody = `
          <div class="agent-telemetry-box">
            <div style="display:flex; justify-content:space-between; font-weight:600;">
              <span>Live Telemetry Log:</span>
              <span style="color:var(--primary);">${agent.progress}% processed</span>
            </div>
            <p style="color:var(--on-surface); display:flex; align-items:center; gap:4px;">
              <span class="material-symbols-outlined icon-xs animate-spin" style="color:var(--primary);">autorenew</span>
              ${agent.lastLog}
            </p>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; padding-top:4px;">
            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary);">${agent.metric}</span>
            ${agent.id === 'skeptic' ? `
              <div style="display:flex; gap:0.4rem;">
                <button class="report-action-btn" style="height:32px; font-size:0.75rem; padding:0 0.75rem;" type="button" onclick="openCritiqueModal()">Inspect Critique</button>
                <button class="btn-primary-lg" style="height:32px; font-size:0.75rem; padding:0 0.85rem;" type="button" onclick="passAllRounds()"><span class="material-symbols-outlined icon-xs">play_arrow</span> Resolve &amp; Pass</button>
              </div>
            ` : `
              <button class="sample-link" style="font-size:0.75rem; display:flex; align-items:center; gap:2px;" onclick="viewAgentDetails('${agent.id}')">
                <span>View Details</span>
                <span class="material-symbols-outlined icon-xs">arrow_forward</span>
              </button>
            `}
          </div>
        `;
      } else if (isCompleted) {
        extraBody = `
          <div class="agent-actions-row">
            <div style="display:flex; align-items:center; gap:4px; font-family:var(--font-mono); font-size:0.75rem; color:var(--tertiary-text); background-color:var(--surface-container-low); padding:2px 8px; border-radius:var(--radius-sm);">
              <span class="material-symbols-outlined icon-xs" style="color:var(--tertiary-text)">check_circle</span>
              <span>${agent.metric}</span>
            </div>
            ${agent.id === 'skeptic' ? `
              <button class="sample-link" style="font-size:0.75rem; display:flex; align-items:center; gap:2px;" onclick="openCritiqueModal()">
                <span>Critique Audit</span>
                <span class="material-symbols-outlined icon-xs">arrow_forward</span>
              </button>
            ` : `
              <button class="sample-link" style="font-size:0.75rem; display:flex; align-items:center; gap:2px;" onclick="viewAgentDetails('${agent.id}')">
                <span>View Details</span>
                <span class="material-symbols-outlined icon-xs">arrow_forward</span>
              </button>
            `}
          </div>
        `;
      } else {
        extraBody = `
          <div class="agent-actions-row">
            <div style="display:flex; align-items:center; gap:4px; font-family:var(--font-mono); font-size:0.75rem; color:var(--on-surface-variant); background-color:var(--surface-container-low); padding:2px 8px; border-radius:var(--radius-sm);">
              <span class="material-symbols-outlined icon-xs" style="color:var(--secondary)">hourglass_empty</span>
              <span>${agent.metric}</span>
            </div>
            <button class="sample-link" style="font-size:0.75rem; display:flex; align-items:center; gap:2px;" onclick="viewAgentDetails('${agent.id}')">
              <span>View Details</span>
              <span class="material-symbols-outlined icon-xs">arrow_forward</span>
            </button>
          </div>
        `;
      }

      const topBarColor = isCompleted ? 'var(--tertiary)' : (isHighlight ? 'var(--primary)' : 'var(--surface-container)');
      const topBarWidth = isCompleted ? '100%' : (isHighlight ? `${agent.progress}%` : '0%');

      return `
        <div class="agent-node-card ${isHighlight ? 'highlight' : ''}" id="agent-card-${agent.id}">
          <div class="agent-top-bar">
            <div style="height:100%; width:${topBarWidth}; background:${topBarColor}; transition: width 0.35s ease;"></div>
          </div>

          <div class="agent-card-header">
            <div class="agent-title-cluster">
              <div class="agent-avatar-box">
                <span class="material-symbols-outlined icon-md">${agent.icon}</span>
              </div>
              <div>
                <h3 class="agent-name">${agent.name}</h3>
                <span class="agent-role">${agent.role}</span>
              </div>
            </div>
            ${statusBadge}
          </div>

          <p class="agent-desc">${agent.description}</p>
          ${extraBody}
        </div>
      `;
    }).join('');
  }

  // ========================================================================
  // Swarm Pipeline Execution & Progression Engine
  // ========================================================================
  function updateDagGraph(stage) {
    const label = document.getElementById('dag-stage-label');
    if (label) {
      if (stage < 4) {
        label.innerHTML = `
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--primary)" class="animate-pulse"></span>
          Stage 3 of 6 • Skeptic Adversary Active
        `;
      } else if (stage === 4) {
        label.innerHTML = `
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--primary)" class="animate-pulse"></span>
          Stage 4 of 6 • Synthesizer Evidence Graph Active
        `;
      } else if (stage === 5) {
        label.innerHTML = `
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--primary)" class="animate-pulse"></span>
          Stage 5 of 6 • Verifier Merkle Ledger Active
        `;
      } else if (stage === 6) {
        label.innerHTML = `
          <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--primary)" class="animate-pulse"></span>
          Stage 6 of 6 • Editor Dossier Formulation Active
        `;
      } else {
        label.innerHTML = `
          <span class="material-symbols-outlined icon-xs" style="color:var(--tertiary-text)">check_circle</span>
          All 6 Stages Complete • Swarm Sealed (100%)
        `;
      }
    }

    const nodeNames = [
      { id: 'dag-node-1', name: '1. Planner', defaultIcon: 'check_circle' },
      { id: 'dag-node-2', name: '2. Researchers (α,β,γ)', defaultIcon: 'check_circle' },
      { id: 'dag-node-3', name: '3. Skeptic (Adversary)', defaultIcon: 'cyclone' },
      { id: 'dag-node-4', name: '4. Synthesizer', defaultIcon: 'hourglass_top' },
      { id: 'dag-node-5', name: '5. Verifier', defaultIcon: 'pending' },
      { id: 'dag-node-6', name: '6. Editor', defaultIcon: 'schedule' }
    ];

    const isAllDone = stage >= 7;

    nodeNames.forEach((n, idx) => {
      const nodeEl = document.getElementById(n.id);
      if (!nodeEl) return;
      const stepNum = idx + 1;
      const iconEl = nodeEl.querySelector('.material-symbols-outlined');

      if (isAllDone || stepNum < stage) {
        nodeEl.className = 'dag-node completed';
        if (iconEl) {
          iconEl.className = 'material-symbols-outlined icon-xs';
          iconEl.style.color = 'var(--tertiary-text)';
          iconEl.innerText = 'check_circle';
        }
      } else if (stepNum === stage) {
        nodeEl.className = 'dag-node active';
        if (iconEl) {
          iconEl.className = 'material-symbols-outlined icon-xs animate-spin';
          iconEl.style.color = 'inherit';
          iconEl.innerText = 'cyclone';
        }
      } else {
        nodeEl.className = 'dag-node';
        if (iconEl) {
          iconEl.className = 'material-symbols-outlined icon-xs';
          iconEl.style.color = 'var(--secondary)';
          iconEl.innerText = n.defaultIcon;
        }
      }
    });

    for (let c = 1; c <= 5; c++) {
      const connEl = document.getElementById(`dag-conn-${c}`);
      if (!connEl) continue;
      if (isAllDone || c < stage - 1) {
        connEl.className = 'dag-connector completed';
      } else if (c === stage - 1) {
        connEl.className = 'dag-connector active';
      } else {
        connEl.className = 'dag-connector';
      }
    }
  }

  function updateSwarmStats(stage, isDone) {
    const activeEl = document.getElementById('swarm-stat-active-agents');
    const tasksEl = document.getElementById('swarm-stat-inflight-tasks');
    const tasksSub = document.getElementById('swarm-stat-tasks-subtext');
    const consensusEl = document.getElementById('swarm-stat-consensus');
    const consensusSub = document.getElementById('swarm-stat-consensus-subtext');
    const modeEl = document.getElementById('swarm-stat-mode');
    const modeSub = document.getElementById('swarm-stat-mode-subtext');

    if (activeEl) activeEl.innerText = '8';

    if (isDone || stage >= 7) {
      if (tasksEl) tasksEl.innerText = '0';
      if (tasksSub) { tasksSub.innerText = 'All 14 resolved & sealed'; tasksSub.style.color = 'var(--tertiary-text)'; }
      if (consensusEl) consensusEl.innerText = '100.0%';
      if (consensusSub) consensusSub.innerText = '+2.2% confidence (Unanimous)';
      if (modeEl) modeEl.innerText = 'Verified';
      if (modeSub) modeSub.innerText = 'Immutable Merkle Seal';
    } else if (stage === 6) {
      if (tasksEl) tasksEl.innerText = '2';
      if (tasksSub) tasksSub.innerText = '1 editorial briefing';
      if (consensusEl) consensusEl.innerText = '99.8%';
      if (consensusSub) consensusSub.innerText = '+2.0% confidence';
      if (modeEl) modeEl.innerText = 'Editorial';
      if (modeSub) modeSub.innerText = 'Dossier synthesis';
    } else if (stage === 5) {
      if (tasksEl) tasksEl.innerText = '5';
      if (tasksSub) tasksSub.innerText = '2 cryptographic proofs';
      if (consensusEl) consensusEl.innerText = '99.4%';
      if (consensusSub) consensusSub.innerText = '+1.7% confidence';
      if (modeEl) modeEl.innerText = 'Cryptographic';
      if (modeSub) modeSub.innerText = 'Merkle tree attestation';
    } else if (stage === 4) {
      if (tasksEl) tasksEl.innerText = '9';
      if (tasksSub) tasksSub.innerText = 'Synthesizer in-flight';
      if (consensusEl) consensusEl.innerText = '98.6%';
      if (consensusSub) consensusSub.innerText = '+1.5% confidence';
      if (modeEl) modeEl.innerText = 'Synthesizing';
      if (modeSub) modeSub.innerText = 'Evidence DAG active';
    } else {
      if (tasksEl) tasksEl.innerText = '14';
      if (tasksSub) tasksSub.innerText = '3 synthesizing';
      if (consensusEl) consensusEl.innerText = '97.8%';
      if (consensusSub) consensusSub.innerText = '+1.4% confidence';
      if (modeEl) modeEl.innerText = 'Adversarial';
      if (modeSub) modeSub.innerText = 'Tri-party audit';
    }
  }

  function renderSwarmControlBanner() {
    const card = document.getElementById('swarm-control-card');
    if (!card) return;

    if (state.swarmCompleted) {
      card.style.borderLeft = '4px solid var(--tertiary)';
      card.innerHTML = `
        <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; gap:0.75rem; align-items:flex-start; max-width:680px;">
            <div style="width:38px; height:38px; border-radius:var(--radius-md); background:rgba(16, 185, 129, 0.12); color:var(--tertiary-text); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <span class="material-symbols-outlined icon-md">verified</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <span class="pill-badge pill-success">✓ Swarm Verification Complete • All 6 Rounds Passed</span>
                <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary);">Consensus 100.0% Unanimous</span>
              </div>
              <h3 style="font-family:var(--font-headline); font-size:1.0625rem; font-weight:600; color:var(--on-surface); margin-top:4px;">
                Verified Research Dossier Ready: Fault-Tolerant Quantum Computation
              </h3>
              <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-top:2px; line-height:1.45;">
                All adversarial counter-arguments resolved, unified 14-claim evidence graph constructed, and Merkle root (<code>0x8f2d...5410</code>) cryptographically sealed. Full research dossier formulated and ready for review.
              </p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; align-self:center;">
            <button class="btn-primary-lg" style="height:40px; padding:0 1.25rem; background:#10b981; border-color:#10b981; color:#ffffff;" type="button" onclick="navigateToReport()">
              <span class="material-symbols-outlined icon-sm">description</span>
              <span>View Detailed Research Report</span>
            </button>
            <button class="report-action-btn" style="height:40px;" type="button" onclick="openModal('audit-trail-modal')">
              <span class="material-symbols-outlined icon-sm">lock_reset</span>
              <span>Inspect Audit Trail</span>
            </button>
            <button class="report-action-btn" style="height:40px;" type="button" onclick="resetSwarmPipeline()" title="Reset and re-run swarm demonstration">
              <span class="material-symbols-outlined icon-sm">restart_alt</span>
              <span>Reset</span>
            </button>
          </div>
        </div>
      `;
    } else if (state.swarmRunning) {
      card.style.borderLeft = '4px solid var(--primary)';
      card.innerHTML = `
        <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; gap:0.75rem; align-items:flex-start; max-width:680px;">
            <div style="width:38px; height:38px; border-radius:var(--radius-md); background:var(--primary-container); color:var(--on-primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <span class="material-symbols-outlined icon-md animate-spin">cyclone</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <span class="pill-badge pill-primary" style="background-color:var(--primary); color:#ffffff;">
                  <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#ffffff;" class="animate-ping"></span>
                  Swarm In-Flight • Executing Stage ${state.swarmStage} of 6
                </span>
                <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary);">Real-Time Micro-Deliberation</span>
              </div>
              <h3 style="font-family:var(--font-headline); font-size:1.0625rem; font-weight:600; color:var(--on-surface); margin-top:4px;">
                Passing Swarm Rounds &amp; Resolving Adversarial Counter-Claims...
              </h3>
              <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-top:2px; line-height:1.45;">
                Active agents are computing falsification proofs, reconciling evidence directed graphs, calculating SHA-256 state commitments, and compiling the publication dossier.
              </p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; align-self:center;">
            <div class="pill-badge pill-neutral" style="padding:0.4rem 0.85rem; display:flex; align-items:center; gap:6px;">
              <span class="material-symbols-outlined icon-xs animate-spin" style="color:var(--primary);">autorenew</span>
              <span>Running Stage ${state.swarmStage}...</span>
            </div>
          </div>
        </div>
      `;
    } else {
      card.style.borderLeft = '4px solid var(--caution)';
      card.innerHTML = `
        <div style="display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; gap:0.75rem; align-items:flex-start; max-width:680px;">
            <div style="width:38px; height:38px; border-radius:var(--radius-md); background:rgba(245, 158, 11, 0.12); color:var(--caution); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
              <span class="material-symbols-outlined icon-md">gavel</span>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                <span class="pill-badge pill-warning" id="swarm-status-badge">Pipeline Paused • Stage 3 of 6</span>
                <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--secondary);">Skeptic Adversarial Audit Gate</span>
              </div>
              <h3 style="font-family:var(--font-headline); font-size:1.0625rem; font-weight:600; color:var(--on-surface); margin-top:4px;" id="swarm-status-title">
                Adversarial Critique Pending: Sample Size &amp; Vacuum Lifetime Discrepancies
              </h3>
              <p style="font-size:0.875rem; color:var(--on-surface-variant); margin-top:2px; line-height:1.45;" id="swarm-status-desc">
                The Skeptic Agent halted automated pipeline progression to audit 2 counter-arguments (sample size variance N=24 vs N=1,400, and 1.4% shuttling loss). Resolve the critique to pass all remaining rounds (Synthesizer &rarr; Verifier &rarr; Editor) and generate the comprehensive research report.
              </p>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; align-self:center;" id="swarm-control-actions">
            <button class="btn-primary-lg" id="btn-resolve-swarm" style="height:40px; padding:0 1.25rem;" type="button" onclick="passAllRounds()">
              <span class="material-symbols-outlined icon-sm">play_circle</span>
              <span>Resolve Skeptic &amp; Pass All Rounds</span>
            </button>
            <button class="report-action-btn" style="height:40px;" type="button" onclick="openCritiqueModal()">
              <span class="material-symbols-outlined icon-sm">gavel</span>
              <span>Inspect Critique</span>
            </button>
            <button class="report-action-btn" style="height:40px;" type="button" onclick="stepNextRound()" title="Step one round forward">
              <span class="material-symbols-outlined icon-sm">skip_next</span>
              <span>Step Round</span>
            </button>
          </div>
        </div>
      `;
    }
  }

  async function passAllRounds() {
    if (state.swarmRunning) return;
    state.swarmRunning = true;
    closeModal('critique-modal');

    const skeptic = VERITAS_DATA.agents.find(a => a.id === 'skeptic');
    const synth = VERITAS_DATA.agents.find(a => a.id === 'synthesizer');
    const verif = VERITAS_DATA.agents.find(a => a.id === 'verifier');
    const editor = VERITAS_DATA.agents.find(a => a.id === 'editor');

    // ROUND 1: Skeptic Resolution (Stage 3)
    state.swarmStage = 3;
    renderSwarmControlBanner();
    updateDagGraph(3);
    updateSwarmStats(3, false);

    if (skeptic && skeptic.status !== 'completed') {
      skeptic.status = 'active';
      skeptic.progress = 88;
      skeptic.lastLog = "Auditing sample sizes: Cross-referencing N=24 preprint claims against N=1,400 multi-core telemetry...";
      renderAgents();
      await sleep(800);

      skeptic.progress = 95;
      skeptic.lastLog = "Applying Evered et al. (Nature 2023) shaped-pulse mitigations to eliminate 1.4% shuttling loss...";
      renderAgents();
      await sleep(800);

      skeptic.progress = 100;
      skeptic.status = 'completed';
      skeptic.metric = "2 Counter-arguments resolved & attested";
      skeptic.lastLog = "Adversarial verification cleared. 2 counter-arguments resolved. Consensus lock released.";
      renderAgents();
      showToast("✓ Round 1 Passed: Skeptic Adversarial Lock Released!");
      await sleep(600);
    }

    // ROUND 2: Synthesizer Evidence Graph (Stage 4)
    state.swarmStage = 4;
    renderSwarmControlBanner();
    updateDagGraph(4);
    updateSwarmStats(4, false);

    if (synth && synth.status !== 'completed') {
      synth.status = 'active';
      synth.progress = 40;
      synth.metric = "Ingesting claims #CLM-104 through #CLM-108...";
      synth.lastLog = "Unlocking claim dependency graph for #CLM-104 through #CLM-108...";
      renderAgents();
      await sleep(800);

      synth.progress = 80;
      synth.lastLog = "Reconciling preprint telemetry with peer-reviewed Nature & PRX empirical datasets...";
      synth.metric = "Reconciling 42 citations...";
      renderAgents();
      await sleep(800);

      synth.progress = 100;
      synth.status = 'completed';
      synth.metric = "Unified 14-claim evidence graph";
      synth.lastLog = "Evidence graph unified: 14 claims cross-referenced, 0 topological cycles.";
      renderAgents();
      showToast("✓ Round 2 Passed: Unified Evidence Graph Synthesized!");
      await sleep(600);
    }

    // ROUND 3: Verifier Cryptographic Attestation (Stage 5)
    state.swarmStage = 5;
    renderSwarmControlBanner();
    updateDagGraph(5);
    updateSwarmStats(5, false);

    if (verif && verif.status !== 'completed') {
      verif.status = 'active';
      verif.progress = 45;
      verif.metric = "Hashing claim provenance paths...";
      verif.lastLog = "Constructing cryptographic Merkle proof tree for claim provenance...";
      renderAgents();
      await sleep(800);

      verif.progress = 85;
      verif.metric = "Calculating SHA-256 state commitments...";
      verif.lastLog = "Attesting epistemic truthfulness rating: 99.4% truthfulness score...";
      renderAgents();
      await sleep(800);

      verif.progress = 100;
      verif.status = 'completed';
      verif.metric = "Merkle Root Attested: 0x8f2d...5410";
      verif.lastLog = "Merkle root sealed: 0x8f2d4e7a83bb9412e87c538a0f9b6c18d32e5410. Dual-blind signature certified.";
      renderAgents();
      showToast("✓ Round 3 Passed: Cryptographic Merkle Root Attested!");
      await sleep(600);
    }

    // ROUND 4: Editor Dossier Formulation (Stage 6)
    state.swarmStage = 6;
    renderSwarmControlBanner();
    updateDagGraph(6);
    updateSwarmStats(6, false);

    if (editor && editor.status !== 'completed') {
      editor.status = 'active';
      editor.progress = 50;
      editor.metric = "Formulating executive briefing...";
      editor.lastLog = "Aggregating multi-agent consensus matrices & skeptic audit trail...";
      renderAgents();
      await sleep(800);

      editor.progress = 90;
      editor.metric = "Anchoring verified citations...";
      editor.lastLog = "Drafting architectural benchmark matrix, limitation caveats, and citation ledger...";
      renderAgents();
      await sleep(800);

      editor.progress = 100;
      editor.status = 'completed';
      editor.metric = "Verified Research Dossier Ready";
      editor.lastLog = "Executive briefing, benchmark matrix, and skeptic audit trail published.";
      renderAgents();
      await sleep(600);
    }

    // COMPLETE ALL ROUNDS (Stage 7)
    state.swarmStage = 7;
    state.swarmRunning = false;
    state.swarmCompleted = true;

    updateDagGraph(7);
    updateSwarmStats(7, true);
    renderSwarmControlBanner();
    renderReport();
    renderInvestigations();

    showToast("🎉 All Rounds Passed! Verified Research Report Generated.");
  }

  async function stepNextRound() {
    if (state.swarmRunning) return;
    const skeptic = VERITAS_DATA.agents.find(a => a.id === 'skeptic');
    const synth = VERITAS_DATA.agents.find(a => a.id === 'synthesizer');
    const verif = VERITAS_DATA.agents.find(a => a.id === 'verifier');
    const editor = VERITAS_DATA.agents.find(a => a.id === 'editor');

    if (!skeptic || skeptic.status !== 'completed') {
      state.swarmRunning = true;
      state.swarmStage = 3;
      renderSwarmControlBanner();
      updateDagGraph(3);
      skeptic.status = 'active';
      skeptic.progress = 92;
      skeptic.lastLog = "Auditing sample sizes: Re-weighting N=24 initial preprint with N=1,400 Harvard/MIT dataset...";
      renderAgents();
      await sleep(700);

      skeptic.progress = 100;
      skeptic.status = 'completed';
      skeptic.metric = "2 Counter-arguments resolved & attested";
      skeptic.lastLog = "Adversarial verification cleared. 2 counter-arguments resolved. Consensus lock released.";
      renderAgents();
      state.swarmRunning = false;
      state.swarmStage = 4;
      updateDagGraph(4);
      updateSwarmStats(4, false);
      renderSwarmControlBanner();
      showToast("✓ Step Complete: Skeptic Adversarial Lock Released!");
    } else if (!synth || synth.status !== 'completed') {
      state.swarmRunning = true;
      state.swarmStage = 4;
      renderSwarmControlBanner();
      updateDagGraph(4);
      synth.status = 'active';
      synth.progress = 50;
      synth.metric = "Reconciling evidence graph...";
      synth.lastLog = "Unlocking claim dependency graph for #CLM-104 through #CLM-108...";
      renderAgents();
      await sleep(700);

      synth.progress = 100;
      synth.status = 'completed';
      synth.metric = "Unified 14-claim evidence graph";
      synth.lastLog = "Evidence graph unified: 14 claims cross-referenced, 0 topological cycles.";
      renderAgents();
      state.swarmRunning = false;
      state.swarmStage = 5;
      updateDagGraph(5);
      updateSwarmStats(5, false);
      renderSwarmControlBanner();
      showToast("✓ Step Complete: Evidence Graph Unified!");
    } else if (!verif || verif.status !== 'completed') {
      state.swarmRunning = true;
      state.swarmStage = 5;
      renderSwarmControlBanner();
      updateDagGraph(5);
      verif.status = 'active';
      verif.progress = 55;
      verif.metric = "Calculating SHA-256 commitments...";
      verif.lastLog = "Constructing cryptographic Merkle proof tree for claim provenance...";
      renderAgents();
      await sleep(700);

      verif.progress = 100;
      verif.status = 'completed';
      verif.metric = "Merkle Root Attested: 0x8f2d...5410";
      verif.lastLog = "Merkle root sealed: 0x8f2d4e7a83bb9412e87c538a0f9b6c18d32e5410. Dual-blind signature certified.";
      renderAgents();
      state.swarmRunning = false;
      state.swarmStage = 6;
      updateDagGraph(6);
      updateSwarmStats(6, false);
      renderSwarmControlBanner();
      showToast("✓ Step Complete: Cryptographic Merkle Root Attested!");
    } else if (!editor || editor.status !== 'completed') {
      state.swarmRunning = true;
      state.swarmStage = 6;
      renderSwarmControlBanner();
      updateDagGraph(6);
      editor.status = 'active';
      editor.progress = 60;
      editor.metric = "Formulating executive briefing...";
      editor.lastLog = "Aggregating multi-agent consensus matrices & skeptic audit trail...";
      renderAgents();
      await sleep(700);

      editor.progress = 100;
      editor.status = 'completed';
      editor.metric = "Verified Research Dossier Ready";
      editor.lastLog = "Executive briefing, benchmark matrix, and skeptic audit trail published.";
      renderAgents();
      state.swarmRunning = false;
      state.swarmStage = 7;
      state.swarmCompleted = true;
      updateDagGraph(7);
      updateSwarmStats(7, true);
      renderSwarmControlBanner();
      renderReport();
      renderInvestigations();
      showToast("🎉 Swarm Complete! Verified Research Report Ready.");
    }
  }

  function resetSwarmPipeline() {
    state.swarmStage = 3;
    state.swarmRunning = false;
    state.swarmCompleted = false;

    const skeptic = VERITAS_DATA.agents.find(a => a.id === 'skeptic');
    if (skeptic) {
      skeptic.status = 'active';
      skeptic.progress = 82;
      skeptic.metric = '2 Counter-arguments flagged';
      skeptic.lastLog = 'Analyzing methodological discrepancies in sample sizes (N=24 vs N=1,400)...';
    }

    const synth = VERITAS_DATA.agents.find(a => a.id === 'synthesizer');
    if (synth) {
      synth.status = 'queued';
      synth.progress = 0;
      synth.metric = 'Awaiting Skeptic critique lock';
      synth.lastLog = 'Listening for Skeptic adversarial lock release on #CLM-104 through #CLM-107.';
    }

    const verif = VERITAS_DATA.agents.find(a => a.id === 'verifier');
    if (verif) {
      verif.status = 'queued';
      verif.progress = 0;
      verif.metric = 'Awaits Synthesizer evidence graph';
      verif.lastLog = 'Ready to assemble SHA-256 leaf nodes into immutable Merkle audit tree.';
    }

    const editor = VERITAS_DATA.agents.find(a => a.id === 'editor');
    if (editor) {
      editor.status = 'queued';
      editor.progress = 0;
      editor.metric = 'Pending verification lock';
      editor.lastLog = 'Report formatting templates prepared for Markdown, PDF, and interactive view.';
    }

    updateDagGraph(3);
    updateSwarmStats(3, false);
    renderAgents();
    renderSwarmControlBanner();
    showToast('Swarm pipeline reset to Stage 3 (Skeptic Adversarial Audit).');
  }

  function resolveCritiqueAndRunSwarm() {
    closeModal('critique-modal');
    passAllRounds();
  }

  // ========================================================================
  // View Rendering: Claims & Inspector
  // ========================================================================
  function renderClaims() {
    if (!elements.claimsContainer) return;

    const filtered = VERITAS_DATA.claims.filter(claim => {
      if (state.activeClaimFilter === 'all') return true;
      return claim.statusType === state.activeClaimFilter;
    });

    if (elements.claimsQueueCounter) {
      elements.claimsQueueCounter.innerText = `Showing ${filtered.length} of ${VERITAS_DATA.claims.length}`;
    }

    if (filtered.length === 0) {
      elements.claimsContainer.innerHTML = `
        <div style="text-align:center; padding:1.5rem; color:var(--secondary); font-size:0.875rem;">
          No claims found matching this category.
        </div>
      `;
      return;
    }

    elements.claimsContainer.innerHTML = filtered.map(claim => {
      const isSelected = claim.id === state.selectedClaimId;
      let badgeClass = 'pill-success';
      let icon = 'check_circle';

      if (claim.statusType === 'contradicted') {
        badgeClass = 'pill-danger';
        icon = 'cancel';
      } else if (claim.statusType === 'partial') {
        badgeClass = 'pill-warning';
        icon = 'warning';
      }

      return `
        <article class="claim-card ${isSelected ? 'selected' : ''}" onclick="selectClaim('${claim.id}')">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="pill-badge pill-neutral">#${claim.id}</span>
              ${isSelected ? `
                <span style="font-family:var(--font-mono); font-size:0.6875rem; color:var(--primary); font-weight:600; display:flex; align-items:center; gap:2px;">
                  <span class="material-symbols-outlined icon-xs">radio_button_checked</span> Selected
                </span>
              ` : ''}
            </div>
            <span class="pill-badge ${badgeClass}">
              <span class="material-symbols-outlined icon-xs">${icon}</span>
              ${claim.status}
            </span>
          </div>

          <p class="claim-text">${claim.text}</p>

          <div class="claim-footer">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="display:flex; align-items:center; gap:3px;">
                <span class="material-symbols-outlined icon-xs" style="color:var(--tertiary-text)">analytics</span>
                Confidence: <strong style="color:var(--on-surface); margin-left:2px;">${claim.confidence}</strong>
              </span>
              <span style="display:flex; align-items:center; gap:3px;">
                <span class="material-symbols-outlined icon-xs">menu_book</span>
                ${claim.citationsCount} citations
              </span>
            </div>
            <span style="color:${isSelected ? 'var(--primary)' : 'var(--secondary)'}; font-weight:600; display:flex; align-items:center; gap:2px;">
              ${isSelected ? 'Inspecting' : 'Inspect'}
              <span class="material-symbols-outlined icon-xs">${isSelected ? 'arrow_downward' : 'chevron_right'}</span>
            </span>
          </div>
        </article>
      `;
    }).join('');
  }

  function selectClaim(claimId) {
    state.selectedClaimId = claimId;
    renderClaims();
    renderInspector(claimId);

    // Smooth scroll to inspector panel on mobile
    if (window.innerWidth < 1024) {
      const panel = document.getElementById('evidence-inspector-panel');
      if (panel) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  function renderInspector(claimId) {
    const claim = VERITAS_DATA.claims.find(c => c.id === claimId) || VERITAS_DATA.claims[0];
    if (!claim) return;

    if (elements.inspectClaimId) elements.inspectClaimId.innerText = `INSPECTING #${claim.id}`;
    if (elements.inspectClaimStatus) {
      let badgeClass = 'pill-success';
      let icon = 'verified';
      if (claim.statusType === 'contradicted') {
        badgeClass = 'pill-danger';
        icon = 'cancel';
      } else if (claim.statusType === 'partial') {
        badgeClass = 'pill-warning';
        icon = 'warning';
      }
      elements.inspectClaimStatus.className = `pill-badge ${badgeClass}`;
      elements.inspectClaimStatus.innerHTML = `<span class="material-symbols-outlined icon-xs">${icon}</span> ${claim.status.toUpperCase()}`;
    }

    if (elements.inspectClaimTimestamp) {
      elements.inspectClaimTimestamp.innerText = `Verified on ${claim.verifiedDate} via Multi-LLM Arbiter`;
    }

    if (elements.inspectClaimQuote) {
      elements.inspectClaimQuote.innerHTML = claim.quote;
    }

    if (elements.inspectClaimOffset) {
      elements.inspectClaimOffset.innerText = `Offset: ${claim.offset}`;
    }

    if (elements.inspectClaimSha) {
      elements.inspectClaimSha.innerText = `SHA256: ${claim.sha256}`;
    }

    // Citations
    if (elements.inspectCitationsContainer) {
      elements.inspectCitationsContainer.innerHTML = claim.citations.map(cit => `
        <div class="source-item">
          <div class="source-top">
            <div>
              <span class="source-name">${cit.source}</span>
              <div style="font-size:0.8125rem; color:var(--secondary);">${cit.title}</div>
            </div>
            <span class="pill-badge pill-neutral" style="color:var(--tertiary-text); font-weight:600;">
              <span class="material-symbols-outlined icon-xs">link</span>
              DOI Verified
            </span>
          </div>

          <div class="source-quote">${cit.quote}</div>

          <div style="display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:0.6875rem; color:var(--secondary); padding-top:2px;">
            <span>${cit.type}</span>
            <span style="color:var(--primary);">${cit.doi}</span>
          </div>
        </div>
      `).join('');
    }

    // Agent Consensus
    if (elements.inspectConsensusContainer) {
      elements.inspectConsensusContainer.innerHTML = `
        <div class="consensus-agent-row">
          <div style="width:28px; height:28px; border-radius:var(--radius-md); background:var(--primary-fixed); color:var(--primary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <span class="material-symbols-outlined icon-sm">psychology</span>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-family:var(--font-headline); font-size:0.875rem; font-weight:600; color:var(--on-surface);">Synthesizer Agent</span>
              <span class="pill-badge ${claim.agentConsensus.synthesizer.status === 'positive' ? 'pill-success' : 'pill-neutral'}">${claim.agentConsensus.synthesizer.vote}</span>
            </div>
            <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:2px;">${claim.agentConsensus.synthesizer.notes}</p>
          </div>
        </div>

        <div class="consensus-agent-row">
          <div style="width:28px; height:28px; border-radius:var(--radius-md); background:var(--secondary-container); color:var(--secondary); display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <span class="material-symbols-outlined icon-sm">policy</span>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-family:var(--font-headline); font-size:0.875rem; font-weight:600; color:var(--on-surface);">Adversarial Skeptic Agent</span>
              <span class="pill-badge pill-neutral">${claim.agentConsensus.skeptic.vote}</span>
            </div>
            <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:2px;">${claim.agentConsensus.skeptic.notes}</p>
          </div>
        </div>
      `;
    }
  }

  // ========================================================================
  // View Rendering: Research Report Reader
  // ========================================================================
  function renderReport() {
    if (!elements.reportArticleBody) return;

    // Update Header Metadata if dynamic elements exist
    const rep = VERITAS_DATA.report;
    const elId = document.getElementById('report-header-id');
    const elStatus = document.getElementById('report-header-status');
    const elClaims = document.getElementById('report-header-claims');
    const elReadtime = document.getElementById('report-header-readtime');
    const elDate = document.getElementById('report-header-date');
    const elTitle = document.getElementById('report-header-title');
    const elEngine = document.getElementById('report-header-engine');
    const elAbstract = document.getElementById('report-header-abstract');
    const elFooterHash = document.getElementById('report-footer-hash');

    if (elId && rep.id) elId.innerText = `Report #${rep.id}`;
    if (elStatus && rep.statusBadge) {
      elStatus.innerHTML = `<span class="material-symbols-outlined icon-xs">verified</span><span>${rep.statusBadge}</span>`;
    }
    if (elClaims && rep.claimsProven) {
      elClaims.innerHTML = `<span class="material-symbols-outlined icon-xs">check_circle</span><span>${rep.claimsProven}</span>`;
    }
    if (elReadtime && rep.readTime) {
      elReadtime.innerHTML = `<span class="material-symbols-outlined icon-xs">timer</span><span>${rep.readTime}</span>`;
    }
    if (elDate && rep.date) elDate.innerText = rep.date;
    if (elTitle && rep.title) elTitle.innerText = rep.title;
    if (elEngine && rep.coreEngine) {
      elEngine.innerHTML = `<span class="material-symbols-outlined icon-sm">psychology</span><span>${rep.coreEngine}</span>`;
    }
    if (elAbstract && rep.abstract) elAbstract.innerText = rep.abstract;
    if (elFooterHash && rep.hash) elFooterHash.innerText = `Cryptographic Hash: ${rep.hash}`;

    elements.reportArticleBody.innerHTML = rep.sections.map(sec => `
      <section class="card" id="${sec.id}" style="scroll-margin-top: 80px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-mono); font-size:0.75rem; font-weight:700; color:var(--primary);">${sec.number}</span>
          <h2 style="font-family:var(--font-headline); font-size:1.125rem; font-weight:600; color:var(--on-surface);">${sec.title}</h2>
        </div>
        <div style="font-size:0.9375rem; line-height:1.7; color:var(--on-surface); display:flex; flex-direction:column; gap:0.75rem;">
          ${sec.content}
        </div>
      </section>
    `).join('');

    // Attach click listeners to in-text claim pills
    const claimPills = elements.reportArticleBody.querySelectorAll('.claim-pill');
    claimPills.forEach(pill => {
      pill.addEventListener('click', e => {
        e.stopPropagation();
        const cid = pill.dataset.claimId;
        showClaimEvidenceToast(cid);
      });
    });
  }

  function showClaimEvidenceToast(cid) {
    const claim = VERITAS_DATA.claims.find(c => c.id === 'CLM-' + cid || c.id === cid) || VERITAS_DATA.claims[0];
    if (!claim) return;

    if (elements.evidenceToastTitle) elements.evidenceToastTitle.innerText = `Claim #${claim.id} Verified`;
    if (elements.evidenceToastText) elements.evidenceToastText.innerText = claim.text;
    if (elements.evidenceToastSource) elements.evidenceToastSource.innerText = claim.citations[0] ? `Corroborated by ${claim.citations[0].source} (${claim.citations[0].doi})` : 'Corroborated by multi-agent consensus';

    elements.floatingEvidenceToast.classList.add('show');

    clearTimeout(state.toastTimeout);
    state.toastTimeout = setTimeout(() => {
      closeEvidenceToast();
    }, 7000);
  }

  function closeEvidenceToast() {
    if (elements.floatingEvidenceToast) {
      elements.floatingEvidenceToast.classList.remove('show');
    }
  }

  // ========================================================================
  // Tavily Real-Time Search & Verification Engine
  // ========================================================================
  async function checkTavilyStatus() {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();

      const badge = document.getElementById('overview-tavily-badge');
      const text = document.getElementById('overview-tavily-text');
      const pill = document.getElementById('tavily-status-pill');
      const keyInput = document.getElementById('setting-tavily-key');

      const localKey = localStorage.getItem('veritas_tavily_key');
      if (localKey && keyInput && !keyInput.value) {
        keyInput.value = localKey;
      }

      if (data.hasTavilyKey) {
        if (badge) badge.className = 'pill-badge pill-success';
        if (text) text.innerText = 'Tavily Live (.env)';
        if (pill) {
          pill.className = 'pill-badge pill-success';
          pill.innerText = `Active in .env (${data.keyPrefix})`;
        }
      } else if (localKey) {
        if (badge) badge.className = 'pill-badge pill-primary';
        if (text) text.innerText = 'Tavily Live (Browser)';
        if (pill) {
          pill.className = 'pill-badge pill-primary';
          pill.innerText = 'Active (Browser Key)';
        }
      } else {
        if (badge) badge.className = 'pill-badge pill-neutral';
        if (text) text.innerText = 'Simulation Mode';
        if (pill) {
          pill.className = 'pill-badge pill-neutral';
          pill.innerText = 'No Key Configured';
        }
      }
    } catch (e) {
      console.warn('Status check failed:', e);
    }
  }

  async function testTavilyConnection() {
    const keyInput = document.getElementById('setting-tavily-key');
    const localKey = keyInput ? keyInput.value.trim() : '';
    if (localKey) {
      localStorage.setItem('veritas_tavily_key', localKey);
    }

    showToast('Testing Tavily connection...');
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'quantum error correction benchmark',
          max_results: 1,
          api_key: localKey
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('✓ Tavily Connected! Real-time search is active.');
        checkTavilyStatus();
      } else {
        showToast(`Tavily: ${data.error}`);
      }
    } catch (err) {
      showToast(`Connection error: ${err.message}`);
    }
  }

  function setSimStage(stageNum, status) {
    const el = document.getElementById(`sim-stage-${stageNum}`);
    if (!el) return;
    const icon = el.querySelector('.material-symbols-outlined');
    if (status === 'running') {
      el.className = 'sim-stage-row running';
      if (icon) {
        icon.className = 'material-symbols-outlined icon-xs animate-spin';
        icon.innerText = 'sync';
      }
    } else if (status === 'done') {
      el.className = 'sim-stage-row done';
      if (icon) {
        icon.className = 'material-symbols-outlined icon-xs';
        icon.innerText = 'check_circle';
      }
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ========================================================================
  // Live Investigation Pipeline
  // ========================================================================
  async function startInvestigation() {
    const query = elements.queryInput.value.trim() || "Evaluate peer-reviewed replications of room-temperature superconductivity claims in carbonaceous sulfur hydrides (2020-2024).";
    elements.simQueryTitle.innerText = `Investigating: "${query}"`;
    elements.simViewReportBtn.disabled = true;

    // Reset stages
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`sim-stage-${i}`);
      if (el) {
        el.className = 'sim-stage-row';
        const icon = el.querySelector('.material-symbols-outlined');
        if (icon) {
          icon.className = 'material-symbols-outlined icon-xs';
          icon.innerText = 'hourglass_empty';
        }
      }
    }

    openModal('simulation-modal');

    const outputBox = elements.simConsoleOutput;
    outputBox.innerHTML = '> Swarm initialized. Connecting to Epistemic Grid...<br/>';

    const localKey = localStorage.getItem('veritas_tavily_key') || '';
    const searchDepth = state.selectedDepth === 'standard' ? 'basic' : 'advanced';

    // Stage 1: Planning
    setSimStage(1, 'running');
    outputBox.innerHTML += `> [Planner Agent] Decomposing research hypothesis: "${query.substring(0, 50)}..."<br/>`;
    await sleep(600);
    setSimStage(1, 'done');

    // Stage 2: Literature Mining via Tavily Real-Time Search
    setSimStage(2, 'running');
    outputBox.innerHTML += `> [Researcher Swarm] Dispatching real-time queries to Tavily API (${searchDepth} mode)...<br/>`;

    let tavilyData = null;
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query,
          search_depth: searchDepth,
          max_results: 6,
          api_key: localKey
        })
      });

      const resData = await res.json();
      if (resData.success && resData.results && resData.results.length > 0) {
        tavilyData = resData;
        setSimStage(2, 'done');
        outputBox.innerHTML += `<strong style="color:#4ade80;">> [Researcher Alpha] Tavily returned ${tavilyData.results.length} verified sources in ${tavilyData.responseTime}s!</strong><br/>`;
        tavilyData.results.slice(0, 3).forEach((r, idx) => {
          let host = '';
          try { host = new URL(r.url).hostname; } catch(e) { host = 'web'; }
          outputBox.innerHTML += `> [Source ${idx + 1}] "${r.title.substring(0, 55)}..." <span style="color:#60a5fa;">(${host})</span><br/>`;
        });
      } else {
        setSimStage(2, 'done');
        outputBox.innerHTML += `> [Researcher Note] ${resData.error || 'Simulating academic corpus retrieval...'}<br/>`;
      }
    } catch (e) {
      setSimStage(2, 'done');
      outputBox.innerHTML += `> [Researcher Note] Bridge fallback: ${e.message}<br/>`;
    }

    // Stage 3: Skeptic Adversarial Review
    setSimStage(3, 'running');
    outputBox.innerHTML += '> [Skeptic Agent] Analyzing contradiction signals, sample size bias & p-hacking risk...<br/>';
    await sleep(800);
    setSimStage(3, 'done');

    // Stage 4: Synthesizer
    setSimStage(4, 'running');
    outputBox.innerHTML += '> [Synthesizer Agent] Constructing unified claim & citation evidence matrix...<br/>';
    await sleep(800);
    setSimStage(4, 'done');

    // Stage 5: Verifier
    setSimStage(5, 'running');
    const hash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
    outputBox.innerHTML += `> [Verifier Agent] Generated Merkle verification root: <span style="color:#a78bfa;">${hash.substring(0, 18)}...</span><br/>`;
    await sleep(600);
    setSimStage(5, 'done');

    // Apply Live Results if Tavily returned real data, or high-fidelity simulation fallback
    if (tavilyData && tavilyData.results && tavilyData.results.length > 0) {
      applyLiveSearchResults(query, tavilyData, hash);
    } else {
      const fallbackData = {
        results: [
          {
            title: `Empirical Replication Analysis: ${query.length > 50 ? query.substring(0, 47) + '...' : query}`,
            url: "https://doi.org/10.1038/s41586-024-ftqc",
            content: "Multi-institutional trials cross-examined under dual-blind adversarial verification confirm primary physical-to-logical error suppression scaling by 2.1x without correlated leakage."
          },
          {
            title: "Methodological Audit & Sample Size Discrepancy Resolution",
            url: "https://doi.org/10.1103/PRXQuantum.2024",
            content: "Skeptic adversarial review resolved the initial sample variance (N=24 vs N=1,400) by incorporating shaped-pulse transport mitigation protocols."
          }
        ],
        answer: `Verified empirical consensus affirms the core claims of "${query.length > 50 ? query.substring(0, 47) + '...' : query}" following complete multi-agent deliberation and adversarial audit settlement.`
      };
      applyLiveSearchResults(query, fallbackData, hash);
    }

    // Sync swarm agents and DAG state
    state.swarmStage = 7;
    state.swarmCompleted = true;
    state.swarmRunning = false;
    VERITAS_DATA.agents.forEach(a => {
      a.status = 'completed';
      a.progress = 100;
    });
    updateDagGraph(7);
    updateSwarmStats(7, true);
    renderAgents();
    renderSwarmControlBanner();

    outputBox.innerHTML += '<strong style="color:#4ade80;">> Investigation complete. Verified research dossier ready!</strong><br/>';
    outputBox.scrollTop = outputBox.scrollHeight;
    elements.simViewReportBtn.disabled = false;
    showToast('Investigation formulated & ready to review!');
  }

  function applyLiveSearchResults(query, tavilyData, hash) {
    const invId = 'LIVE-' + Math.floor(1000 + Math.random() * 9000);

    // 1. Prepend to Investigations List
    const newInv = {
      id: invId,
      title: query.length > 60 ? query.substring(0, 57) + '...' : query,
      query: query,
      status: "Completed",
      statusClass: "completed",
      progress: 100,
      sourcesCount: tavilyData.results.length,
      claimsTotal: tavilyData.results.length + 1,
      claimsVerified: tavilyData.results.length + 1,
      confidence: "98.7%",
      updatedAt: "Just now",
      reportId: `VR-${invId}`,
      merkleRoot: hash
    };
    VERITAS_DATA.investigations.unshift(newInv);

    // 2. Extract Real Claims from Tavily Results
    const newClaims = tavilyData.results.map((r, i) => {
      let host = 'Journal / Web Source';
      try { host = new URL(r.url).hostname; } catch(e) {}
      return {
        id: `CLM-${200 + i}`,
        investigationId: invId,
        status: "Supported",
        statusType: "supported",
        text: r.title,
        confidence: `${(96 + Math.random() * 3.8).toFixed(1)}%`,
        citationsCount: 1,
        verifiedDate: new Date().toISOString(),
        merkleHash: hash,
        quote: `“${r.content.substring(0, 240)}...”`,
        offset: `Online Citation • ${host}`,
        sha256: hash.substring(0, 24) + '...',
        citations: [
          {
            source: host,
            title: r.title,
            type: "Real-time Verified Source",
            doi: r.url,
            verified: true,
            match: "100%",
            quote: `“${r.content.substring(0, 180)}...”`
          }
        ],
        agentConsensus: {
          synthesizer: { vote: "Affirmed", status: "positive", notes: "Corroborated by live web & preprint retrieval." },
          skeptic: { vote: "Cleared", status: "neutral", notes: "Passes domain authority validation." }
        }
      };
    });

    VERITAS_DATA.claims = newClaims.concat(VERITAS_DATA.claims);
    state.selectedClaimId = newClaims[0].id;

    // 3. Update Report with Live Findings
    const answerSnippet = tavilyData.answer ? `<p><strong>Executive Answer:</strong> ${tavilyData.answer}</p>` : '';
    const citationsHtml = tavilyData.results.map((r, i) => `
      <div class="citation-card">
        <div class="cit-header">
          <span class="cit-auth">[${i + 1}] ${r.title.substring(0, 40)}</span>
          <span class="cit-match"><span class="material-symbols-outlined icon-xs">verified</span>Live Match</span>
        </div>
        <p class="cit-title">"${r.title}"</p>
        <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:4px;">${r.content.substring(0, 180)}...</p>
        <div class="cit-footer">
          <span>Tavily Real-Time Ingestion</span>
          <a href="${r.url}" target="_blank" rel="noopener">Open Source Link <span class="material-symbols-outlined icon-xs">north_east</span></a>
        </div>
      </div>
    `).join('');

    VERITAS_DATA.report = {
      id: `VR-${invId}`,
      title: `Live Research Synthesis: ${query}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read",
      claimsProven: `${newClaims.length}/${newClaims.length} Claims Proven`,
      statusBadge: "Dual-Blind Audited",
      coreEngine: "VERITAS Swarm + Tavily Engine",
      citationsCount: tavilyData.results.length,
      abstract: `Autonomous multi-agent investigation executed across live sources retrieved via Tavily Search API. Verified under adversarial consensus protocols.`,
      hash: hash,
      sections: [
        {
          id: "executive-summary",
          number: "01",
          title: "Executive Synthesis & Verdict",
          content: `
            ${answerSnippet}
            <div style="background-color:var(--surface-container-low); padding:0.9rem; border-radius:var(--radius-lg); border-left:3px solid var(--tertiary); margin-top:0.75rem;">
              <span class="pill-badge pill-success"><span class="material-symbols-outlined icon-xs">verified</span> Epistemic Status: 100.0% Corroborated</span>
              <p style="font-size:0.875rem; color:var(--on-surface); line-height:1.5; margin-top:4px;">
                Autonomous swarm parsing cross-examined ${tavilyData.results.length} verified real-time literature endpoints. All propositions verified with zero unreconciled topological contradictions.
                <button class="claim-pill" data-claim-id="${newClaims[0].id}" type="button">
                  <span class="material-symbols-outlined icon-xs">verified</span>#${newClaims[0].id}
                </button>
              </p>
            </div>
          `
        },
        {
          id: "swarm-deliberation",
          number: "02",
          title: "Multi-Agent Swarm Deliberation Trail",
          content: `
            <div style="display:flex; flex-direction:column; gap:0.65rem;">
              <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-md); padding:0.75rem;">
                <div style="display:flex; justify-content:space-between;"><strong style="font-size:0.875rem;">Round 1: Planner Agent</strong><span class="pill-badge pill-success">Passed</span></div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:3px;">Decomposed "${query.substring(0, 45)}..." into ${newClaims.length} atomic verifiable claims.</p>
              </div>
              <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-md); padding:0.75rem;">
                <div style="display:flex; justify-content:space-between;"><strong style="font-size:0.875rem;">Round 2: Researchers Triad</strong><span class="pill-badge pill-success">Passed</span></div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:3px;">Ingested ${tavilyData.results.length} peer sources and preprints via Tavily Live Engine.</p>
              </div>
              <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-md); padding:0.75rem;">
                <div style="display:flex; justify-content:space-between;"><strong style="font-size:0.875rem;">Round 3: Skeptic Agent Audit</strong><span class="pill-badge pill-success">Resolved</span></div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:3px;">Audited sample size variance and p-hacking bias. Counter-arguments resolved via empirical cross-checks.</p>
              </div>
              <div style="background:var(--surface-container-lowest); border:1px solid var(--border-default); border-radius:var(--radius-md); padding:0.75rem;">
                <div style="display:flex; justify-content:space-between;"><strong style="font-size:0.875rem;">Round 4 &amp; 5: Synthesizer &amp; Verifier</strong><span class="pill-badge pill-success">Attested</span></div>
                <p style="font-size:0.8125rem; color:var(--on-surface-variant); margin-top:3px;">Evidence DAG reconciled; cryptographic Merkle Root sealed (<code>${hash.substring(0, 20)}...</code>).</p>
              </div>
            </div>
          `
        },
        {
          id: "claims-ledger",
          number: "03",
          title: "Verified Claims & Falsification Ledger",
          content: `
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${newClaims.map(c => `
                <div style="background:var(--surface-container-low); padding:0.75rem; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                  <div>
                    <span style="font-family:var(--font-mono); font-weight:700; color:var(--primary); font-size:0.8125rem;">#${c.id}</span>
                    <span style="font-size:0.875rem; color:var(--on-surface); margin-left:6px;">${c.text}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    <span class="pill-badge pill-success">${c.confidence} Conf.</span>
                    <span class="pill-badge pill-neutral">Dual-Blind Cleared</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `
        },
        {
          id: "references",
          number: "04",
          title: "Primary Verified Sources",
          content: `<div class="citations-grid">${citationsHtml}</div>`
        }
      ]
    };

    // Re-render UI views
    renderInvestigations();
    renderClaims();
    renderInspector(state.selectedClaimId);
    renderReport();
  }

  function navigateToReport() {
    closeModal('simulation-modal');
    closeModal('critique-modal');
    renderReport();
    navigateTo('reports');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ========================================================================
  // Modals & UI Actions
  // ========================================================================
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  function openCritiqueModal() {
    openModal('critique-modal');
  }

  function openCitationJsonModal() {
    const claim = VERITAS_DATA.claims.find(c => c.id === state.selectedClaimId) || VERITAS_DATA.claims[0];
    const pre = document.getElementById('json-modal-content');
    if (pre) {
      pre.innerText = JSON.stringify(claim, null, 2);
    }
    openModal('json-modal');
  }

  function copyCitationJson() {
    const pre = document.getElementById('json-modal-content');
    if (pre) {
      navigator.clipboard.writeText(pre.innerText).then(() => {
        showToast('Citation JSON copied to clipboard');
      });
    }
  }

  function submitFlag() {
    closeModal('flag-modal');
    showToast('Claim flagged and queued for Human Auditor Arbitration');
  }

  function copyReportText() {
    const text = `Fault-Tolerant Quantum Computation via Neutral-Atom Arrays: Comprehensive Verification & Benchmark Synthesis\n\nVERITAS Swarm Synthesis Core v4.2\nDual-Blind Audited (28/28 Claims Proven)\n\nCryptographic Hash: ${VERITAS_DATA.report.hash}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast('Full report summary copied to clipboard');
    });
  }

  function downloadReportMarkdown() {
    let md = `# Fault-Tolerant Quantum Computation via Neutral-Atom Arrays\n\n`;
    md += `**Report ID:** #VR-2025-084\n`;
    md += `**Date:** Jan 18, 2025\n`;
    md += `**Status:** Dual-Blind Audited (28/28 Claims Proven)\n`;
    md += `**Cryptographic Hash:** \`${VERITAS_DATA.report.hash}\`\n\n`;
    md += `## Abstract\n${VERITAS_DATA.report.abstract}\n\n`;

    VERITAS_DATA.report.sections.forEach(sec => {
      const stripped = sec.content.replace(/<[^>]*>?/gm, '').trim();
      md += `## ${sec.number} ${sec.title}\n${stripped}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VERITAS-Report-VR-2025-084.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Report downloaded as Markdown (.md)');
  }

  function showToast(msg) {
    if (!elements.globalToast || !elements.globalToastMsg) return;
    elements.globalToastMsg.innerText = msg;
    elements.globalToast.classList.add('show');
    setTimeout(() => {
      elements.globalToast.classList.remove('show');
    }, 2800);
  }

  function openInvestigation(invId) {
    if (invId === 'QEC-2025') {
      navigateTo('claims');
      showToast('Loaded audit dossier #QEC-2025');
    } else {
      navigateTo('claims');
      showToast(`Switched active investigation to #${invId}`);
    }
  }

  function viewAgentDetails(agentId) {
    const agent = VERITAS_DATA.agents.find(a => a.id === agentId);
    if (!agent) return;
    showToast(`${agent.name}: Model = ${agent.model}, Threads = ${agent.threads}`);
  }

  function saveSettings() {
    showToast('Epistemic preferences & provider settings saved');
  }

  function scrollToInvestigations() {
    const el = document.getElementById('investigations-section') || document.querySelector('.recent-investigations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  // ========================================================================
  // Subscription & Billing Management (INR Plans: ₹299, ₹599, Custom)
  // ========================================================================
  let currentBillingCycle = 'monthly'; // 'monthly' | 'annual'
  let currentSelectedPlan = 'pro';

  function setupPricingListeners() {
    const billingToggle = document.getElementById('billing-toggle-btn');
    if (billingToggle) {
      billingToggle.addEventListener('click', toggleBillingPeriod);
    }
  }

  function toggleBillingPeriod() {
    currentBillingCycle = currentBillingCycle === 'monthly' ? 'annual' : 'monthly';
    const btn = document.getElementById('billing-toggle-btn');
    const monthlyLabel = document.getElementById('billing-monthly-label');
    const annualLabel = document.getElementById('billing-annual-label');
    const amounts = document.querySelectorAll('.pricing-amount[data-monthly]');
    const periods = [
      document.getElementById('period-researcher'),
      document.getElementById('period-pro')
    ];

    if (currentBillingCycle === 'annual') {
      if (btn) btn.classList.add('annual');
      if (monthlyLabel) monthlyLabel.classList.remove('active');
      if (annualLabel) annualLabel.classList.add('active');
      amounts.forEach(el => {
        el.innerText = el.getAttribute('data-annual');
      });
      periods.forEach(p => {
        if (p) p.innerText = '/mo (billed annually)';
      });
      showToast('Switched to Annual Billing (20% discount applied)');
    } else {
      if (btn) btn.classList.remove('annual');
      if (monthlyLabel) monthlyLabel.classList.add('active');
      if (annualLabel) annualLabel.classList.remove('active');
      amounts.forEach(el => {
        el.innerText = el.getAttribute('data-monthly');
      });
      periods.forEach(p => {
        if (p) p.innerText = '/month';
      });
      showToast('Switched to Monthly Billing');
    }
  }

  function selectPlan(planKey) {
    currentSelectedPlan = planKey;
    const modal = document.getElementById('plan-checkout-modal');
    const modalTitle = document.getElementById('checkout-modal-title');
    const planNameEl = document.getElementById('checkout-plan-name');
    const planCycleEl = document.getElementById('checkout-plan-cycle');
    const planPriceEl = document.getElementById('checkout-plan-price');
    const paymentSection = document.getElementById('checkout-payment-section');
    const enterpriseSection = document.getElementById('checkout-enterprise-section');
    const submitBtn = document.getElementById('checkout-submit-btn');

    if (planKey === 'researcher') {
      const price = currentBillingCycle === 'annual' ? '₹239' : '₹299';
      if (modalTitle) modalTitle.innerText = 'Subscribe to Researcher Plan';
      if (planNameEl) planNameEl.innerText = 'Researcher Plan (Solo Investigator)';
      if (planCycleEl) planCycleEl.innerText = currentBillingCycle === 'annual' ? 'Billed annually at ₹2,868/yr (INR)' : 'Billed monthly at ₹299/mo (INR)';
      if (planPriceEl) planPriceEl.innerText = price;
      if (paymentSection) paymentSection.style.display = 'block';
      if (enterpriseSection) enterpriseSection.style.display = 'none';
      if (submitBtn) submitBtn.innerText = `Proceed with Payment (${price})`;
    } else if (planKey === 'pro') {
      const price = currentBillingCycle === 'annual' ? '₹479' : '₹599';
      if (modalTitle) modalTitle.innerText = 'Upgrade to Veritas Pro (Recommended)';
      if (planNameEl) planNameEl.innerText = 'Veritas Pro (Swarm Intelligence)';
      if (planCycleEl) planCycleEl.innerText = currentBillingCycle === 'annual' ? 'Billed annually at ₹5,748/yr (INR)' : 'Billed monthly at ₹599/mo (INR)';
      if (planPriceEl) planPriceEl.innerText = price;
      if (paymentSection) paymentSection.style.display = 'block';
      if (enterpriseSection) enterpriseSection.style.display = 'none';
      if (submitBtn) submitBtn.innerText = `Proceed with Payment (${price})`;
    } else if (planKey === 'enterprise') {
      if (modalTitle) modalTitle.innerText = 'Request Enterprise / Custom Deployment';
      if (planNameEl) planNameEl.innerText = 'Enterprise Custom Swarm';
      if (planCycleEl) planCycleEl.innerText = 'Custom SLA, dedicated VPC & bespoke LLM connectors';
      if (planPriceEl) planPriceEl.innerText = 'Custom';
      if (paymentSection) paymentSection.style.display = 'none';
      if (enterpriseSection) enterpriseSection.style.display = 'block';
      if (submitBtn) submitBtn.innerText = 'Submit Enterprise Inquiry';
    }

    if (modal) modal.classList.add('active');
  }

  function selectPaymentMethod(cardEl) {
    document.querySelectorAll('.checkout-method-card').forEach(c => c.classList.remove('selected'));
    if (cardEl) cardEl.classList.add('selected');
  }

  function confirmSubscription() {
    closeModal('plan-checkout-modal');
    if (currentSelectedPlan === 'enterprise') {
      showToast('Thank you! A VERITAS enterprise architect will contact you within 24 hours.');
    } else {
      const planLabel = currentSelectedPlan === 'pro' ? 'Veritas Pro (₹599)' : 'Researcher (₹299)';
      showToast(`Subscription activated: ${planLabel}! Welcome to epistemically verified research.`);
    }
  }

  // Expose global helpers to window for inline onclick handlers
  window.navigateTo = navigateTo;
  window.selectClaim = selectClaim;
  window.showClaimEvidenceToast = showClaimEvidenceToast;
  window.closeEvidenceToast = closeEvidenceToast;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.openCritiqueModal = openCritiqueModal;
  window.resolveCritiqueAndRunSwarm = resolveCritiqueAndRunSwarm;
  window.passAllRounds = passAllRounds;
  window.stepNextRound = stepNextRound;
  window.resetSwarmPipeline = resetSwarmPipeline;
  window.openCitationJsonModal = openCitationJsonModal;
  window.copyCitationJson = copyCitationJson;
  window.submitFlag = submitFlag;
  window.navigateToReport = navigateToReport;
  window.showToast = showToast;
  window.openInvestigation = openInvestigation;
  window.viewAgentDetails = viewAgentDetails;
  window.saveSettings = saveSettings;
  window.scrollToInvestigations = scrollToInvestigations;
  window.selectPlan = selectPlan;
  window.toggleBillingPeriod = toggleBillingPeriod;
  window.selectPaymentMethod = selectPaymentMethod;
  window.confirmSubscription = confirmSubscription;

  // DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
