import React, { useState } from 'react';
import {
  AlertOctagon,
  Search,
  Filter,
  CheckCircle2,
  Play,
  RotateCcw,
  Code,
  FileText,
  Clock,
  Smartphone,
  Wifi,
  Languages,
  Check,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { FailureItem, Project } from '../../types';

interface FailureExplorerViewProps {
  failures: FailureItem[];
  currentProject: Project;
  selectedFailureId: string | null;
  onSelectFailureId: (id: string) => void;
  onVerifyFix: (failureId: string) => void;
}

export const FailureExplorerView: React.FC<FailureExplorerViewProps> = ({
  failures,
  currentProject,
  selectedFailureId,
  onSelectFailureId,
  onVerifyFix,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  // Filter failures by project
  const projectFailures = failures.filter((f) => f.projectId === currentProject.id);

  // Filter by search, category, severity
  const filteredFailures = projectFailures.filter((f) => {
    const matchesSearch =
      f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.rootCause.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || f.severity === severityFilter;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  // Sort by affected users descending
  const sortedFailures = [...filteredFailures].sort(
    (a, b) => b.affectedUsersEstimate - a.affectedUsersEstimate
  );

  const activeFailure =
    failures.find((f) => f.id === selectedFailureId) ||
    sortedFailures[0] ||
    failures[0];

  const handleVerify = (failureId: string) => {
    setIsVerifying(true);
    setVerificationFeedback('Spinning up emulated Indian environment sandbox...');

    setTimeout(() => {
      setVerificationFeedback('Replaying reproduction steps under 650ms latency & 2GB RAM...');
    }, 1000);

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationFeedback('Verification Passed! Zero process kills and clean state reconciliation.');
      onVerifyFix(failureId);
    }, 2400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-600 uppercase">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Failure Explorer · Impact-Ranked Diagnostics</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Indian Failure Diagnostics & Code Fixes
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Every failure is ranked by the real Indian users it prevents from completing their flow.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredFailures.length}</span> issues
            </span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search failure title, root cause, device..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Categories</option>
              <option value="Low-Memory & OOM">Low-Memory & OOM</option>
              <option value="Vernacular Overflow">Vernacular Overflow</option>
              <option value="Payment & Webhook">Payment & Webhook</option>
              <option value="Offline & Sync">Offline & Sync</option>
            </select>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Pane Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List Pane (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Prioritized Failures</span>
            <span>Sorted by Affected Users</span>
          </div>

          <div className="space-y-2">
            {sortedFailures.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                No failures match current filters.
              </div>
            ) : (
              sortedFailures.map((failure, idx) => {
                const isSelected = activeFailure?.id === failure.id;
                const isResolved = failure.status === 'verified_resolved';

                return (
                  <button
                    key={failure.id}
                    onClick={() => {
                      onSelectFailureId(failure.id);
                      setVerificationFeedback(null);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-white shadow-sm ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-400">#{idx + 1}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            failure.severity === 'critical'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {failure.severity.toUpperCase()}
                        </span>
                        {isResolved && (
                          <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3" /> Resolved
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-rose-600 tabular-nums">
                          ~{(failure.affectedUsersEstimate / 1000000).toFixed(2)}M
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2">
                      {failure.title}
                    </h3>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span className="truncate max-w-[180px]">{failure.conditionsHit.device}</span>
                      <span>{failure.affectedUserPercent}% users</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane (7 cols) */}
        {activeFailure ? (
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            {/* Top Bar with Impact & Verification */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      activeFailure.severity === 'critical'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {activeFailure.severity.toUpperCase()}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-medium">{activeFailure.category}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400">Detected {activeFailure.firstDetectedAt}</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {activeFailure.title}
                </h2>
              </div>

              <div className="text-right shrink-0">
                <div className="text-lg font-bold font-mono text-rose-600 tabular-nums">
                  ~{(activeFailure.affectedUsersEstimate / 1000000).toFixed(2)}M
                </div>
                <span className="text-[11px] text-slate-500">
                  {activeFailure.affectedUserPercent}% of Indian Userbase
                </span>
              </div>
            </div>

            {/* Affected Indian Dimensions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Telecom Condition</span>
                <span className="font-semibold text-slate-800 line-clamp-1">{activeFailure.conditionsHit.network}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Hardware Model</span>
                <span className="font-semibold text-slate-800 line-clamp-1">{activeFailure.conditionsHit.device}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Language Script</span>
                <span className="font-semibold text-slate-800 line-clamp-1">{activeFailure.conditionsHit.locale}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Location Tier</span>
                <span className="font-semibold text-slate-800">{activeFailure.conditionsHit.locationTier}</span>
              </div>
            </div>

            {/* Root Cause Analysis */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                Why this happens in India
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl">
                {activeFailure.rootCause}
              </p>
            </div>

            {/* Reproduction Steps */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                Reproduction Steps
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-600 pl-1">
                {activeFailure.reproductionSteps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    <span className="text-slate-800 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* HAR / Network Trace Summary */}
            {activeFailure.harSummary && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                  Network Diagnostics Trace
                </h3>
                <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Endpoint:</span>
                    <span className="text-emerald-400">{activeFailure.harSummary.endpoint}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Roundtrip:</span>
                    <span className="text-amber-400">{activeFailure.harSummary.durationMs}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Error Payload:</span>
                    <span className="text-rose-400">{activeFailure.harSummary.errorType}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Code Fix Diff Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Recommended Code Fix ({activeFailure.codeFix.filename})</span>
                </h3>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden font-mono text-xs">
                {/* Incorrect Code */}
                <div className="bg-rose-50/70 border-b border-rose-200/60 p-3">
                  <div className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-1.5">
                    Current Code (Vulnerable to Process Kill / Timeout):
                  </div>
                  <pre className="text-rose-900 whitespace-pre-wrap text-[11px] overflow-x-auto">
                    {activeFailure.codeFix.beforeCode}
                  </pre>
                </div>

                {/* Resilient Code */}
                <div className="bg-emerald-50/70 p-3">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1.5">
                    BharatTest Verified Solution:
                  </div>
                  <pre className="text-emerald-950 whitespace-pre-wrap text-[11px] overflow-x-auto">
                    {activeFailure.codeFix.afterCode}
                  </pre>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic mt-1">
                {activeFailure.codeFix.explanation}
              </p>
            </div>

            {/* Action Bar & Verification Feedback */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {verificationFeedback && (
                <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs rounded-xl flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{verificationFeedback}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Status:{' '}
                  <span className="font-semibold text-slate-800 capitalize">
                    {activeFailure.status.replace('_', ' ')}
                  </span>
                </span>

                <button
                  onClick={() => handleVerify(activeFailure.id)}
                  disabled={isVerifying}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all shadow-sm ${
                    isVerifying
                      ? 'bg-slate-400 text-white cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white active:bg-indigo-800'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isVerifying ? 'Verifying in Lab...' : 'Verify Fix in Lab'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
