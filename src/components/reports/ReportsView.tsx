import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  GitBranch,
  Printer,
} from 'lucide-react';
import { FailureItem, Project, TestRun } from '../../types';

interface ReportsViewProps {
  currentProject: Project;
  failures: FailureItem[];
  testRuns: TestRun[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  currentProject,
  failures,
  testRuns,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedCiTab, setSelectedCiTab] = useState<'github' | 'gitlab' | 'cli'>('github');

  const openFailures = failures.filter(
    (f) => f.projectId === currentProject.id && f.status !== 'verified_resolved'
  );

  const totalAffectedUsers = openFailures.reduce((acc, f) => acc + f.affectedUsersEstimate, 0);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownloadJson = () => {
    const reportData = {
      project: currentProject.name,
      platform: currentProject.platform,
      version: currentProject.version,
      generatedAt: new Date().toISOString(),
      bharatReliabilityIndex: currentProject.reliabilityScore,
      totalAffectedUsersAtRisk: totalAffectedUsers,
      failures: openFailures,
      recentTestRuns: testRuns,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bharattest-reliability-report-${currentProject.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const githubActionsYaml = `name: BharatTest Indian Reliability Gate

on:
  push:
    branches: [ main, staging ]
  pull_request:
    branches: [ main ]

jobs:
  bharattest-audit:
    name: Run Bharat Real-World Impairment Test
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Execute BharatTest Runner
        env:
          BHARATTEST_API_KEY: \${{ secrets.BHARATTEST_API_KEY }}
          PROJECT_ID: "${currentProject.id}"
        run: |
          npx bharattest run \\
            --project "\$PROJECT_ID" \\
            --profiles "jio-4g-congested,redmi-9a-2gb,tamil-expansion" \\
            --fail-on-critical \\
            --max-allowed-exposure 500000`;

  const gitlabCiYaml = `stages:
  - test

bharattest_audit:
  stage: test
  image: node:20-alpine
  script:
    - npx bharattest run --project "${currentProject.id}" --fail-on-critical
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == "main"'`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <FileText className="w-3.5 h-3.5" />
              <span>Reliability Audit & CI/CD Gate</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Executive Reports & Pipeline Integration
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Export comprehensive stakeholder audit reports and guard pull requests against Indian edge regressions.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Executive Report Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              Application Under Audit
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {currentProject.name} ({currentProject.version})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Target: {currentProject.packageIdOrUrl} · Environment: {currentProject.environment}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Bharat Reliability Score</span>
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {currentProject.reliabilityScore}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </span>
          </div>
        </div>

        {/* Section Ratings */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">Telecom Resilience</span>
            <span className="font-bold text-amber-600 font-mono text-sm">62/100</span>
            <p className="text-[10px] text-slate-500 mt-1">High latency timeout risk</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">2GB RAM Budget Devices</span>
            <span className="font-bold text-rose-600 font-mono text-sm">54/100</span>
            <p className="text-[10px] text-slate-500 mt-1">Process kill on UPI switch</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">Indic Vernacular UX</span>
            <span className="font-bold text-amber-600 font-mono text-sm">70/100</span>
            <p className="text-[10px] text-slate-500 mt-1">Tamil text truncation</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-400 block font-medium">Offline & SQLite Sync</span>
            <span className="font-bold text-emerald-600 font-mono text-sm">88/100</span>
            <p className="text-[10px] text-slate-500 mt-1">Cache persistence passes</p>
          </div>
        </div>

        {/* Executive Finding Callout */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <span className="font-bold text-slate-900 block">Executive Summary & Rollout Recommendation:</span>
          <p className="text-slate-600 leading-relaxed">
            Deployment to Google Play Store or Production web domain is currently rated <span className="font-bold text-rose-600">HIGH RISK</span> for Tier 2/3 users. An estimated <span className="font-bold font-mono">~{(totalAffectedUsers / 1000000).toFixed(2)} Million users</span> on budget handsets (Xiaomi Redmi 9A, Realme C31) will experience cart abandonment during PhonePe/GPay authorization. Resolving Issue #fail-1 and Issue #fail-2 restores safe release threshold.
          </p>
        </div>
      </div>

      {/* CI/CD Guardrail Configuration */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-indigo-600" />
              <span>CI/CD Automation Pipeline</span>
            </h3>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setSelectedCiTab('github')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                  selectedCiTab === 'github' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                GitHub Actions
              </button>
              <button
                onClick={() => setSelectedCiTab('gitlab')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                  selectedCiTab === 'gitlab' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                GitLab CI
              </button>
              <button
                onClick={() => setSelectedCiTab('cli')}
                className={`px-3 py-1 font-semibold rounded-md transition-colors ${
                  selectedCiTab === 'cli' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Local CLI
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automatically block pull requests that introduce failures under Indian network congestion or 2GB RAM.
          </p>
        </div>

        {/* Code Box */}
        <div className="relative rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
          <button
            onClick={() =>
              handleCopy(
                selectedCiTab === 'github'
                  ? githubActionsYaml
                  : selectedCiTab === 'gitlab'
                  ? gitlabCiYaml
                  : `npx bharattest run --project "${currentProject.id}" --fail-on-critical`,
                selectedCiTab
              )
            }
            className="absolute right-3 top-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
          >
            {copiedType === selectedCiTab ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <pre className="text-[11px] leading-relaxed text-slate-300">
            {selectedCiTab === 'github' && githubActionsYaml}
            {selectedCiTab === 'gitlab' && gitlabCiYaml}
            {selectedCiTab === 'cli' &&
              `# Run BharatTest locally in pre-push hook\nnpx bharattest run \\\n  --project "${currentProject.id}" \\\n  --profiles "jio-4g-congested,redmi-9a-2gb" \\\n  --fail-on-critical`}
          </pre>
        </div>
      </div>
    </div>
  );
};
