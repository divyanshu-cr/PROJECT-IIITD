import React from 'react';
import {
  AlertTriangle,
  Play,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Wifi,
  Languages,
  Users,
  TrendingDown,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import { FailureItem, Project, TestRun } from '../../types';

interface OverviewDashboardProps {
  project: Project;
  failures: FailureItem[];
  testRuns: TestRun[];
  onOpenRunTestModal: () => void;
  onSelectFailure: (failure: FailureItem) => void;
  onNavigateToView: (view: string) => void;
  onVerifyFix: (failureId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  project,
  failures,
  testRuns,
  onOpenRunTestModal,
  onSelectFailure,
  onNavigateToView,
  onVerifyFix,
}) => {
  const projectFailures = failures.filter((f) => f.projectId === project.id);
  const openFailures = projectFailures.filter((f) => f.status !== 'verified_resolved');
  const criticalCount = openFailures.filter((f) => f.severity === 'critical').length;
  const totalAffectedUsers = openFailures.reduce((acc, curr) => acc + curr.affectedUsersEstimate, 0);

  // Sort failures by affected users descending
  const sortedFailures = [...openFailures].sort((a, b) => b.affectedUsersEstimate - a.affectedUsersEstimate);

  return (
    <div className="space-y-6">
      {/* Top Banner: Core Project Reliability Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-900">{project.name}</span>
              <span>·</span>
              <span className="capitalize">{project.platform} ({project.environment})</span>
              <span>·</span>
              <span className="font-mono">{project.version}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Indian Real-World Reliability Status
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Evaluating application stability across 2GB RAM budget hardware, congested Tier-2/3 cell towers, NPCI UPI bank delays, and Indic vernacular translations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right pr-3 border-r border-slate-200">
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {project.reliabilityScore}
                <span className="text-xs font-normal text-slate-400">/100</span>
              </div>
              <span className="text-[11px] font-semibold text-amber-600">Bharat Index</span>
            </div>

            <button
              onClick={onOpenRunTestModal}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Indian Test Suite</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Quantitative Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Estimated Users at Risk</span>
            <Users className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {(totalAffectedUsers / 1000000).toFixed(2)}M
            </span>
            <span className="text-xs font-medium text-rose-600">Active Indian users</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Across Tier 2/3 towns and budget handsets
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Critical Edge Failures</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-rose-600 tabular-nums">
              {criticalCount}
            </span>
            <span className="text-xs font-medium text-slate-500">/ {openFailures.length} total issues</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Highest: UPI Intent Activity Termination
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Network Resilience Pass Rate</span>
            <Wifi className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              58.3%
            </span>
            <span className="text-xs font-medium text-amber-600">Degraded on 3G</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Fails under 650ms latency + 12% packet loss
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Indic UI Clipping Risk</span>
            <Languages className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              1 Alert
            </span>
            <span className="text-xs font-medium text-rose-600">Tamil & Telugu</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Checkout CTA overflows on 360px viewport
          </p>
        </div>
      </div>

      {/* Primary Section: Prioritized Failures by Real-World Impact */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Discovered Failures — Ranked by Estimated Affected Users
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Fixing issues from top to bottom maximizes restored user trust and transaction success rate.
            </p>
          </div>
          <button
            onClick={() => onNavigateToView('failure-explorer')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            <span>Explore All in Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedFailures.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              Zero unresolved failures! Your application is fully compliant across configured Indian conditions.
            </div>
          ) : (
            sortedFailures.map((failure, idx) => (
              <div
                key={failure.id}
                className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 min-w-0 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        failure.severity === 'critical'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {failure.severity.toUpperCase()}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="font-medium text-slate-600">{failure.category}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 font-mono text-[11px]">{failure.conditionsHit.device}</span>
                  </div>

                  <h3
                    onClick={() => onSelectFailure(failure)}
                    className="text-sm font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors"
                  >
                    {failure.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-1 leading-relaxed">
                    {failure.rootCause}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 sm:self-center">
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-rose-600 tabular-nums">
                      ~{(failure.affectedUsersEstimate / 1000000).toFixed(2)}M
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {failure.affectedUserPercent}% Indian Users
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectFailure(failure)}
                      className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                    >
                      View Fix
                    </button>
                    <button
                      onClick={() => onVerifyFix(failure.id)}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Verify Fix
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Two Column Layout: Real-World Conditions Status & Recent Runs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conditions Matrix Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              India Conditions Matrix Status
            </h3>
            <button
              onClick={() => onNavigateToView('conditions-lab')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Open Lab Workbench</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Jio 4G Peak Congestion (Tier 2/3)</p>
                  <p className="text-[11px] text-slate-500">650ms Latency · 12% Loss · 340 kbps</p>
                </div>
              </div>
              <span className="font-mono text-rose-700 font-semibold text-[11px]">2 Failures</span>
            </div>

            <div className="p-3 rounded-lg border border-rose-200 bg-rose-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Xiaomi Redmi 9A (2GB RAM + MIUI Killer)</p>
                  <p className="text-[11px] text-slate-500">OOM on UPI Switch · 360px Viewport</p>
                </div>
              </div>
              <span className="font-mono text-rose-700 font-semibold text-[11px]">Critical Drop</span>
            </div>

            <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Tamil & Telugu Font Expansion (+48%)</p>
                  <p className="text-[11px] text-slate-500">Button overflow detected on checkout view</p>
                </div>
              </div>
              <span className="font-mono text-amber-700 font-semibold text-[11px]">UI Clipping</span>
            </div>

            <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900">Metro Fiber / 5G High-Speed (Urban Baseline)</p>
                  <p className="text-[11px] text-slate-500">28ms Latency · 0% Loss · 45 Mbps</p>
                </div>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">Pass</span>
            </div>
          </div>
        </div>

        {/* Recent Test Runs Preview */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Recent Indian Test Runs
            </h3>
            <button
              onClick={() => onNavigateToView('test-runs')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View All Runs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {testRuns.slice(0, 3).map((run) => (
              <div
                key={run.id}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900 truncate max-w-[240px]">
                    {run.scenarioName}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-semibold px-2 py-0.5 rounded ${
                      run.status === 'failed'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {run.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>{run.startedAt}</span>
                  <span>·</span>
                  <span>{run.durationSeconds}s duration</span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">{run.passedChecks}/{run.totalChecks} checks</span>
                </div>
                {run.failuresDetected.length > 0 && (
                  <div className="mt-2 text-[11px] font-mono text-rose-600 bg-rose-50 px-2 py-1 rounded border border-rose-100">
                    ⚠ {run.failuresDetected.length} failure(s) exposed ~{(run.affectedUsersRisk / 1000000).toFixed(2)}M users to checkout drops
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
