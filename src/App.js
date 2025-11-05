import React, { useState } from 'react';
import { FileText, Database, Users, Workflow, Settings, GitBranch, Cloud, Layers, ChevronRight, ChevronDown, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ITSMArchitecture = () => {
  const [selectedView, setSelectedView] = useState('overview');
  const [expandedADR, setExpandedADR] = useState(null);

  const architectureLayers = {
    overview: {
      title: "High-Level Architecture Overview",
      description: "Three-phase evolution from current state to enterprise ITSM",
      layers: [
        { name: "Presentation Layer", color: "#3B82F6", items: ["Microsoft Teams", "SharePoint Portal", "Power Apps"] },
        { name: "Integration Layer", color: "#8B5CF6", items: ["Microsoft Copilot", "Power Automate", "GitHub Actions"] },
        { name: "Business Logic Layer", color: "#10B981", items: ["Workflow Engine", "AI Processing", "Rule Engine"] },
        { name: "Data Layer", color: "#F59E0B", items: ["SharePoint Lists", "Dataverse", "GitHub Repos"] },
        { name: "Knowledge Layer", color: "#EF4444", items: ["Markdown Docs", "Wiki", "Training Materials"] }
      ]
    },
    phase1: {
      title: "Phase 1: Foundation (Weeks 1-4)",
      description: "Immediate quick wins with minimal infrastructure",
      components: [
        { name: "SharePoint Document Library", type: "storage", x: 20, y: 60, color: "#F59E0B" },
        { name: "Markdown Documentation", type: "docs", x: 20, y: 20, color: "#EF4444" },
        { name: "GitHub Repository", type: "version", x: 60, y: 20, color: "#6366F1" },
        { name: "Basic Power Automate Flows", type: "automation", x: 60, y: 60, color: "#8B5CF6" }
      ],
      flows: [
        { from: "Markdown Documentation", to: "GitHub Repository", label: "Version Control" },
        { from: "GitHub Repository", to: "SharePoint Document Library", label: "Auto Sync" },
        { from: "SharePoint Document Library", to: "Basic Power Automate Flows", label: "Trigger Events" }
      ]
    },
    phase2: {
      title: "Phase 2: Structured System (Months 2-3)",
      description: "Implement structured ticketing and AI-assisted workflows",
      components: [
        { name: "SharePoint Ticket List", type: "data", x: 15, y: 50, color: "#F59E0B" },
        { name: "Copilot Integration", type: "ai", x: 50, y: 20, color: "#3B82F6" },
        { name: "Power Automate Workflows", type: "automation", x: 50, y: 50, color: "#8B5CF6" },
        { name: "Knowledge Base", type: "kb", x: 15, y: 20, color: "#EF4444" },
        { name: "User Portal (Power Apps)", type: "ui", x: 85, y: 35, color: "#3B82F6" }
      ],
      flows: [
        { from: "User Portal (Power Apps)", to: "SharePoint Ticket List", label: "Submit Ticket" },
        { from: "SharePoint Ticket List", to: "Power Automate Workflows", label: "Route & Notify" },
        { from: "Power Automate Workflows", to: "Copilot Integration", label: "AI Suggestions" },
        { from: "Knowledge Base", to: "Copilot Integration", label: "Context Data" }
      ]
    },
    phase3: {
      title: "Phase 3: Enterprise ITSM (Months 4-6)",
      description: "Full ITIL-aligned framework with advanced automation",
      components: [
        { name: "Microsoft Dataverse", type: "data", x: 50, y: 70, color: "#F59E0B" },
        { name: "ServiceNow / Jira", type: "itsm", x: 50, y: 50, color: "#10B981" },
        { name: "Advanced Copilot Studio", type: "ai", x: 30, y: 30, color: "#3B82F6" },
        { name: "Power BI Analytics", type: "analytics", x: 70, y: 30, color: "#EC4899" },
        { name: "Azure DevOps", type: "devops", x: 20, y: 10, color: "#6366F1" },
        { name: "Teams Integration", type: "ui", x: 80, y: 10, color: "#3B82F6" }
      ],
      flows: [
        { from: "Teams Integration", to: "ServiceNow / Jira", label: "Unified Interface" },
        { from: "ServiceNow / Jira", to: "Microsoft Dataverse", label: "Store Data" },
        { from: "Microsoft Dataverse", to: "Advanced Copilot Studio", label: "AI Processing" },
        { from: "Microsoft Dataverse", to: "Power BI Analytics", label: "Reporting" },
        { from: "Azure DevOps", to: "ServiceNow / Jira", label: "CI/CD Integration" }
      ]
    },
    dataFlow: {
      title: "Data Flow Architecture",
      description: "How information moves through the system",
      stages: [
        { name: "Input", color: "#3B82F6", items: ["Email", "Teams Chat", "Portal Form", "Phone Call"] },
        { name: "Processing", color: "#8B5CF6", items: ["Parsing", "Classification", "AI Analysis", "Routing"] },
        { name: "Storage", color: "#F59E0B", items: ["Ticket DB", "Knowledge Base", "Audit Logs", "Attachments"] },
        { name: "Action", color: "#10B981", items: ["Assignment", "Notifications", "Escalation", "Resolution"] },
        { name: "Output", color: "#EF4444", items: ["User Updates", "Reports", "Knowledge Articles", "Metrics"] }
      ]
    }
  };

  const adrs = [
    {
      id: "ADR-001",
      title: "Use Microsoft Ecosystem for ITSM Foundation",
      status: "Accepted",
      context: "Company already uses Microsoft 365. Need to minimize training and integration complexity.",
      decision: "Build on SharePoint, Power Platform, and GitHub rather than standalone ITSM tools initially.",
      consequences: {
        positive: ["Lower licensing costs", "Familiar user interface", "Native integration", "Gradual learning curve"],
        negative: ["May need migration later", "Limited out-of-box ITSM features", "Customization required"],
        risks: ["Vendor lock-in", "Scalability concerns at enterprise level"]
      },
      alternatives: ["ServiceNow immediately", "Open-source ITSM (OTRS, osTicket)", "Jira Service Management"]
    },
    {
      id: "ADR-002",
      title: "Markdown as Source of Truth for Documentation",
      status: "Accepted",
      context: "Owner already creating docs in Markdown. Need version control and easy editing.",
      decision: "Store all documentation as Markdown in GitHub, sync to SharePoint for consumption.",
      consequences: {
        positive: ["Version control built-in", "Easy to edit", "Platform agnostic", "Developer friendly"],
        negative: ["Requires Git knowledge", "Sync complexity", "Limited rich formatting"],
        risks: ["Sync failures between GitHub and SharePoint"]
      },
      alternatives: ["SharePoint Wiki directly", "Confluence", "Notion"]
    },
    {
      id: "ADR-003",
      title: "Three-Phase Implementation Approach",
      status: "Accepted",
      context: "Need quick wins while building toward enterprise solution. Owner currently doing everything manually.",
      decision: "Phase 1 (1 month): Documentation & basic automation. Phase 2 (2-3 months): Structured ticketing. Phase 3 (4-6 months): Full ITSM.",
      consequences: {
        positive: ["Immediate value", "Manageable complexity", "Learn as you grow", "Budget flexibility"],
        negative: ["Longer total timeline", "Multiple migrations", "Duplicate effort possible"],
        risks: ["Phase 1 becomes permanent", "Resistance to change between phases"]
      },
      alternatives: ["Big bang implementation", "Buy enterprise ITSM immediately", "Stay manual longer"]
    },
    {
      id: "ADR-004",
      title: "Copilot for AI-Assisted Resolution",
      status: "Proposed",
      context: "Need to speed up ticket resolution and assist new employees. Copilot can leverage knowledge base.",
      decision: "Integrate Microsoft Copilot to suggest solutions based on historical tickets and documentation.",
      consequences: {
        positive: ["Faster resolution", "Better onboarding", "Learn from patterns", "Natural language interface"],
        negative: ["Additional licensing cost", "Training data needed", "Privacy considerations"],
        risks: ["Incorrect suggestions", "Over-reliance on AI", "Hallucination issues"]
      },
      alternatives: ["Manual search only", "Custom ML model", "Rule-based expert system"]
    },
    {
      id: "ADR-005",
      title: "SharePoint Lists for Initial Ticket Management",
      status: "Accepted",
      context: "Need structured ticket storage without complex database setup. Team familiar with SharePoint.",
      decision: "Use SharePoint Lists with custom columns for ticket tracking in Phase 1-2.",
      consequences: {
        positive: ["No additional tools", "Easy to set up", "Familiar interface", "Good for small volume"],
        negative: ["Performance limits at scale", "Limited reporting", "No workflow engine", "List view limitations"],
        risks: ["Outgrow capacity", "Complex queries slow", "Need migration to Dataverse"]
      },
      alternatives: ["Microsoft Dataverse immediately", "Azure SQL Database", "Excel tracking"]
    },
    {
      id: "ADR-006",
      title: "Power Automate for Workflow Automation",
      status: "Accepted",
      context: "Need automated ticket routing, notifications, and status updates without coding.",
      decision: "Use Power Automate cloud flows for all workflow automation.",
      consequences: {
        positive: ["Low-code platform", "Many connectors", "Integrated with M365", "Easy maintenance"],
        negative: ["Flow limits", "Complex logic challenging", "Premium connectors cost"],
        risks: ["Flow failures", "Maintenance burden", "Performance at high volume"]
      },
      alternatives: ["Azure Logic Apps", "Custom .NET code", "Third-party automation (Zapier)"]
    },
    {
      id: "ADR-007",
      title: "GitHub for Version Control and CI/CD",
      status: "Accepted",
      context: "Need version control for docs, scripts, and eventually code. Team may grow development capability.",
      decision: "Use GitHub for all documentation, automation scripts, and future development with Actions for CI/CD.",
      consequences: {
        positive: ["Industry standard", "Great collaboration", "Free private repos", "Actions for automation"],
        negative: ["Learning curve", "Requires Git knowledge", "Sync complexity with SharePoint"],
        risks: ["Access control complexity", "Accidental exposure of sensitive data"]
      },
      alternatives: ["Azure DevOps Repos", "GitLab", "Keep in SharePoint only"]
    },
    {
      id: "ADR-008",
      title: "Power Apps for User-Facing Portal",
      status: "Proposed",
      context: "Need simple interface for employees to submit tickets and view status. Team familiar with Microsoft tools.",
      decision: "Build canvas app in Power Apps for ticket submission and tracking in Phase 2.",
      consequences: {
        positive: ["Rapid development", "Mobile friendly", "Integrated auth", "Customizable"],
        negative: ["Learning curve for builder", "Performance considerations", "Premium licensing needed"],
        risks: ["User adoption", "Maintenance complexity", "App limits"]
      },
      alternatives: ["SharePoint forms only", "Microsoft Forms", "Custom web app", "Teams app"]
    }
  ];

  const technologies = [
    { name: "SharePoint Online", purpose: "Document storage, ticket lists, knowledge base", phase: "1-3", cost: "Included in M365" },
    { name: "Microsoft Copilot", purpose: "AI-assisted ticket resolution and suggestions", phase: "2-3", cost: "$30/user/month" },
    { name: "Power Automate", purpose: "Workflow automation, notifications, routing", phase: "1-3", cost: "$15/user/month (Premium)" },
    { name: "Power Apps", purpose: "Custom user portal for ticket submission", phase: "2-3", cost: "$20/user/month (Premium)" },
    { name: "GitHub", purpose: "Version control for docs and scripts", phase: "1-3", cost: "Free (Team plan $4/user)" },
    { name: "Microsoft Dataverse", purpose: "Structured data storage (Phase 3)", phase: "3", cost: "Included with Power Apps" },
    { name: "Power BI", purpose: "Analytics and reporting dashboards", phase: "3", cost: "$10/user/month" },
    { name: "Azure DevOps", purpose: "Advanced CI/CD and project management", phase: "3", cost: "Free tier available" }
  ];

  const renderLayerDiagram = (view) => {
    const data = architectureLayers[view];
    
    if (view === 'overview') {
      return (
        <div className="space-y-2">
          {data.layers.map((layer, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div 
                className="w-48 px-4 py-3 rounded text-white font-medium text-sm"
                style={{ backgroundColor: layer.color }}
              >
                {layer.name}
              </div>
              <div className="flex-1 flex gap-2 flex-wrap">
                {layer.items.map((item, i) => (
                  <div key={i} className="px-3 py-1 bg-gray-100 rounded text-sm border border-gray-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    if (view === 'dataFlow') {
      return (
        <div className="flex gap-3 items-center justify-between">
          {data.stages.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className="flex-1">
                <div 
                  className="text-white font-bold text-center py-2 rounded-t"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.name}
                </div>
                <div className="bg-gray-50 border border-t-0 rounded-b p-3 space-y-2 min-h-[120px]">
                  {stage.items.map((item, i) => (
                    <div key={i} className="text-xs bg-white p-2 rounded border">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {idx < data.stages.length - 1 && (
                <ChevronRight className="text-gray-400 flex-shrink-0" size={24} />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    // Phase diagrams
    return (
      <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-gray-200 p-4">
        {data.components.map((comp, idx) => (
          <div
            key={idx}
            className="absolute px-4 py-3 rounded-lg shadow-lg text-white text-xs font-medium text-center border-2 border-white"
            style={{
              backgroundColor: comp.color,
              left: `${comp.x}%`,
              top: `${comp.y}%`,
              transform: 'translate(-50%, -50%)',
              minWidth: '120px'
            }}
          >
            {comp.name}
          </div>
        ))}
        {data.flows.map((flow, idx) => {
          const fromComp = data.components.find(c => c.name === flow.from);
          const toComp = data.components.find(c => c.name === flow.to);
          return (
            <div
              key={idx}
              className="absolute text-xs bg-yellow-100 px-2 py-1 rounded border border-yellow-400 text-gray-700 font-medium"
              style={{
                left: `${(fromComp.x + toComp.x) / 2}%`,
                top: `${(fromComp.y + toComp.y) / 2}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {flow.label}
            </div>
          );
        })}
      </div>
    );
  };

  const renderADR = (adr) => {
    const isExpanded = expandedADR === adr.id;
    const statusColor = adr.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    
    return (
      <div key={adr.id} className="border rounded-lg bg-white shadow-sm">
        <button
          onClick={() => setExpandedADR(isExpanded ? null : adr.id)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <span className="font-mono text-sm text-gray-600">{adr.id}</span>
            <span className="font-semibold">{adr.title}</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${statusColor}`}>
              {adr.status}
            </span>
          </div>
        </button>
        
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4 border-t">
            <div className="pt-4">
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Context</h4>
              <p className="text-sm text-gray-600">{adr.context}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Decision</h4>
              <p className="text-sm text-gray-600">{adr.decision}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Consequences</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="flex items-center gap-1 text-green-700 font-medium text-xs mb-2">
                    <CheckCircle size={14} /> Positive
                  </div>
                  <ul className="text-xs space-y-1">
                    {adr.consequences.positive.map((item, i) => (
                      <li key={i} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-orange-700 font-medium text-xs mb-2">
                    <AlertCircle size={14} /> Negative
                  </div>
                  <ul className="text-xs space-y-1">
                    {adr.consequences.negative.map((item, i) => (
                      <li key={i} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-red-700 font-medium text-xs mb-2">
                    <AlertCircle size={14} /> Risks
                  </div>
                  <ul className="text-xs space-y-1">
                    {adr.consequences.risks.map((item, i) => (
                      <li key={i} className="text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm text-gray-700 mb-2">Alternatives Considered</h4>
              <div className="flex gap-2 flex-wrap">
                {adr.alternatives.map((alt, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    {alt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ITSM Architecture & Decision Framework</h1>
        <p className="text-gray-600">Modular architecture design with phased implementation approach</p>
      </div>

      <div className="mb-6 flex gap-2 border-b pb-4">
        <button
          onClick={() => setSelectedView('overview')}
          className={`px-4 py-2 rounded-t font-medium ${selectedView === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Layers size={18} className="inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setSelectedView('phase1')}
          className={`px-4 py-2 rounded-t font-medium ${selectedView === 'phase1' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Phase 1
        </button>
        <button
          onClick={() => setSelectedView('phase2')}
          className={`px-4 py-2 rounded-t font-medium ${selectedView === 'phase2' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Phase 2
        </button>
        <button
          onClick={() => setSelectedView('phase3')}
          className={`px-4 py-2 rounded-t font-medium ${selectedView === 'phase3' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Phase 3
        </button>
        <button
          onClick={() => setSelectedView('dataFlow')}
          className={`px-4 py-2 rounded-t font-medium ${selectedView === 'dataFlow' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Workflow size={18} className="inline mr-2" />
          Data Flow
        </button>
      </div>

      <div className="mb-8 bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-2">{architectureLayers[selectedView].title}</h2>
        <p className="text-gray-600 mb-6">{architectureLayers[selectedView].description}</p>
        {renderLayerDiagram(selectedView)}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FileText size={24} />
          Architecture Decision Records (ADRs)
        </h2>
        <div className="space-y-3">
          {adrs.map(adr => renderADR(adr))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Settings size={24} />
          Technology Stack & Licensing
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Technology</th>
                <th className="border px-4 py-2 text-left">Purpose</th>
                <th className="border px-4 py-2 text-left">Phase</th>
                <th className="border px-4 py-2 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              {technologies.map((tech, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">{tech.name}</td>
                  <td className="border px-4 py-2 text-sm">{tech.purpose}</td>
                  <td className="border px-4 py-2 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      Phase {tech.phase}
                    </span>
                  </td>
                  <td className="border px-4 py-2 text-sm">{tech.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
          <Info size={20} />
          Implementation Recommendations
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li><strong>Start Simple:</strong> Begin with Phase 1 using existing M365 licenses to prove value quickly</li>
          <li><strong>Document Everything:</strong> Keep Markdown docs in GitHub from day one - this becomes your knowledge base</li>
          <li><strong>Train as You Build:</strong> Each phase provides learning opportunities for new employees</li>
          <li><strong>Measure Success:</strong> Track ticket volume, resolution time, and owner time saved</li>
          <li><strong>Plan Migration Path:</strong> Design Phase 1-2 with Phase 3 in mind to minimize rework</li>
          <li><strong>Consider Professional ITSM:</strong> Evaluate ServiceNow, Jira Service Management, or Freshservice for Phase 3</li>
        </ul>
      </div>
    </div>
  );
};

export default ITSMArchitecture;
