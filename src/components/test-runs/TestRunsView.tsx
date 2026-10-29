import React, { useState } from 'react';
import {
  PlayCircle,
  Play,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Smartphone,
  Wifi,
  Languages,
  Terminal,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Project, TestRun } from '../../types';

interface TestRunsViewProps {
  testRuns: TestRun[];
  currentProject: Project;
  onOpenRunTestModal: () => void;
  onNavigateToFailureExplorer: () => void;
}

export const TestRunsView: React.FC<TestRunsViewProps> = ({
  testRuns,
  currentProject,
  onOpenRunTestModal,
  onNavigateToFailureExplorer,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'failed' | 'passed'>('all');
  const [selectedRunId, setSelectedRunId] = useState<string>(testRuns[0]?.id || '');

  const filteredRuns = testRuns.filter((r) => {
    if (statusFilter === 'all') return true;
    return r.status === statusFilter;
  });

  const activeRun = testRuns.find((r) => r.id === selectedRunId) || filteredRuns[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Test Runs · Execution Audit Log</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Indian Scenario Test History
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              History of automated executions across Indian telecom constraints, 2GB RAM budget handsets, and Indic locales.
            </p>
          </div>

          <button
            onClick={onOpenRunTestModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch New Test Run</span>
          </button>
        </div>

        {/* Filters */}
        <div className="mt-5 flex items-center gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Runs ({testRuns.length})
          </button>
          <button
            onClick={() => setStatusFilter('failed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'failed'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            Failed ({testRuns.filter((r) => r.status === 'failed').length})
          </button>
          <button
            onClick={() => setStatusFilter('passed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              statusFilter === 'passed'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Passed ({testRuns.filter((r) => r.status === 'passed').length})
          </button>
        </div>
      </div>

      {/* Two Pane Run List & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Runs List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredRuns.map((run) => {
            const isSelected = activeRun?.id === run.id;
            const isFailed = run.status === 'failed';

            return (
              <button
                key={run.id}
                onClick={() => setSelectedRunId(run.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-white ring-1 ring-indigo-600 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {isFailed ? (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span className="font-mono font-bold text-slate-900">{run.id}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{run.startedAt}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">
                  {run.scenarioName}
                </h3>

                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Target: {run.projectName}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                  <span>{run.passedChecks}/{run.totalChecks} Checks Passed</span>
                  <span>{run.durationSeconds}s runtime</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Run Details Panel (7 cols) */}
        {activeRun ? (
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                      activeRun.status === 'failed'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {activeRun.status.toUpperCase()}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="font-semibold text-slate-800">{activeRun.id}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500">{activeRun.startedAt}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  {activeRun.scenarioName}
                </h2>
              </div>

              {activeRun.affectedUsersRisk > 0 && (
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block font-medium">User Risk Exposure</span>
                  <span className="text-base font-bold font-mono text-rose-600 tabular-nums">
                    ~{(activeRun.affectedUsersRisk / 1000000).toFixed(2)}M Users
                  </span>
                </div>
              )}
            </div>

            {/* Conditions Applied Card */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                Simulated Indian Conditions Matrix
              </h3>
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Network Profile</span>
                  <span className="font-semibold text-slate-800">{activeRun.conditionsApplied.networkProfile}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Virtual Handset</span>
                  <span className="font-semibold text-slate-800">{activeRun.conditionsApplied.deviceProfile}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Locale Script</span>
                  <span className="font-semibold text-slate-800">{activeRun.conditionsApplied.locale}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Location Tier</span>
                  <span className="font-semibold text-slate-800">{activeRun.conditionsApplied.tier}</span>
                </div>
              </div>
            </div>

            {/* Terminal Logs Waterfall */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                <span>Execution Trace & Assertion Waterfall</span>
              </h3>

              <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 space-y-1.5 max-h-64 overflow-y-auto shadow-inner">
                {activeRun.logSummary.map((log, idx) => (
                  <p
                    key={idx}
                    className={`text-[11px] leading-relaxed ${
                      log.includes('CRITICAL') || log.includes('FAILED')
                        ? 'text-rose-400 font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Duration: {activeRun.durationSeconds}s
              </span>

              <div className="flex items-center gap-2">
                {activeRun.failuresDetected.length > 0 && (
                  <button
                    onClick={onNavigateToFailureExplorer}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>View {activeRun.failuresDetected.length} Root Cause Bugs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={onOpenRunTestModal}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Rerun Test
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
