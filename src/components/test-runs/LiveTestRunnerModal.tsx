import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Wifi,
  Languages,
  Cpu,
  Terminal,
  Activity,
  Check,
} from 'lucide-react';
import { deviceProfiles, localeProfiles, networkProfiles, testScenarios } from '../../data/mockData';
import { DeviceProfile, LocaleProfile, NetworkProfile, Project, TestRun, TestScenario } from '../../types';

interface LiveTestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  currentProject: Project;
  onTestComplete: (newRun: TestRun) => void;
}

export const LiveTestRunnerModal: React.FC<LiveTestRunnerModalProps> = ({
  isOpen,
  onClose,
  projects,
  currentProject,
  onTestComplete,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState(currentProject.id);
  const [selectedScenarioId, setSelectedScenarioId] = useState(testScenarios[0].id);
  const [selectedNetworkId, setSelectedNetworkId] = useState(networkProfiles[0].id);
  const [selectedDeviceId, setSelectedDeviceId] = useState(deviceProfiles[0].id);
  const [selectedLocaleId, setSelectedLocaleId] = useState(localeProfiles[0].id);

  // Simulation execution state
  const [isRunning, setIsRunning] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentStepText, setCurrentStepText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [activeTelemetry, setActiveTelemetry] = useState({
    latency: 28,
    memoryUsedMb: 620,
    cpuPercent: 18,
    packetLoss: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [simulationResult, setSimulationResult] = useState<'passed' | 'failed' | null>(null);

  if (!isOpen) return null;

  const targetProject = projects.find((p) => p.id === selectedProjectId) || currentProject;
  const targetScenario = testScenarios.find((s) => s.id === selectedScenarioId) || testScenarios[0];
  const targetNetwork = networkProfiles.find((n) => n.id === selectedNetworkId) || networkProfiles[0];
  const targetDevice = deviceProfiles.find((d) => d.id === selectedDeviceId) || deviceProfiles[0];
  const targetLocale = localeProfiles.find((l) => l.id === selectedLocaleId) || localeProfiles[0];

  const handleStartSimulation = () => {
    setIsRunning(true);
    setIsFinished(false);
    setProgressPercent(5);
    setLogs([]);
    setCurrentStepText('Bootstrapping emulated Android container...');

    const logSteps = [
      {
        delay: 500,
        pct: 18,
        log: `[00:01] Container spawned: ${targetDevice.name} (${targetDevice.ramGb}GB RAM, ${targetDevice.osVersion})`,
        step: 'Initializing device sandbox...',
        telem: { latency: 45, memoryUsedMb: 720, cpuPercent: 24, packetLoss: 0 },
      },
      {
        delay: 1200,
        pct: 35,
        log: `[00:04] Applying Indian impairment profile: ${targetNetwork.name} (RTT: ${targetNetwork.latencyMs}ms, Loss: ${targetNetwork.packetLossPercent}%)`,
        step: 'Injecting network throttles & cell jitter...',
        telem: { latency: targetNetwork.latencyMs, memoryUsedMb: 940, cpuPercent: 42, packetLoss: targetNetwork.packetLossPercent },
      },
      {
        delay: 2000,
        pct: 54,
        log: `[00:09] Setting locale to ${targetLocale.name} with font scale ${targetDevice.defaultFontScale}x`,
        step: 'Executing user scenario flows...',
        telem: { latency: targetNetwork.latencyMs + 80, memoryUsedMb: 1420, cpuPercent: 78, packetLoss: targetNetwork.packetLossPercent },
      },
      {
        delay: 3000,
        pct: 75,
        log: `[00:16] Triggering external intent: upi://pay (GPay/PhonePe App Switch)`,
        step: 'Simulating app background switch & memory pressure...',
        telem: { latency: targetNetwork.latencyMs, memoryUsedMb: 1880, cpuPercent: 96, packetLoss: targetNetwork.packetLossPercent },
      },
      {
        delay: 4000,
        pct: 88,
        log: `[00:22] CRITICAL: Available RAM < 120MB. OEM ActivityManager issued SIGKILL to background app!`,
        step: 'Testing state bundle recovery on return...',
        telem: { latency: targetNetwork.latencyMs, memoryUsedMb: 1980, cpuPercent: 99, packetLoss: targetNetwork.packetLossPercent },
      },
      {
        delay: 5000,
        pct: 100,
        log: `[00:28] ASSERTION FAILED: Cart and transaction token lost on app rebirth. Affected users: ~2.42M.`,
        step: 'Simulation completed with failure detection.',
        telem: { latency: targetNetwork.latencyMs, memoryUsedMb: 600, cpuPercent: 12, packetLoss: targetNetwork.packetLossPercent },
      },
    ];

    logSteps.forEach((s) => {
      setTimeout(() => {
        setProgressPercent(s.pct);
        setLogs((prev) => [...prev, s.log]);
        setCurrentStepText(s.step);
        setActiveTelemetry(s.telem);

        if (s.pct === 100) {
          setIsRunning(false);
          setIsFinished(true);
          setSimulationResult('failed');

          // Generate new test run
          const newRun: TestRun = {
            id: `run-${Date.now().toString().slice(-4)}`,
            projectId: targetProject.id,
            projectName: targetProject.name,
            scenarioName: targetScenario.name,
            status: 'failed',
            startedAt: 'Just now',
            durationSeconds: 28,
            totalChecks: 14,
            passedChecks: 10,
            failedChecks: 4,
            conditionsApplied: {
              networkProfile: targetNetwork.name,
              deviceProfile: targetDevice.name,
              locale: targetLocale.name,
              tier: 'Tier 2/3',
            },
            failuresDetected: ['fail-1'],
            affectedUsersRisk: 2420000,
            logSummary: [
              `[00:01] Container spawned: ${targetDevice.name}`,
              `[00:04] Applying Indian impairment profile: ${targetNetwork.name}`,
              `[00:16] Triggering external intent: upi://pay`,
              `[00:22] CRITICAL: Available RAM < 120MB. OEM ActivityManager issued SIGKILL`,
              `[00:28] Cart and transaction token lost on app rebirth.`,
            ],
          };
          onTestComplete(newRun);
        }
      }, s.delay);
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setProgressPercent(0);
    setLogs([]);
    setSimulationResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Real-Time Indian Conditions Runner</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Launch Test Simulation Harness
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!isRunning && !isFinished ? (
            /* Configuration Step */
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Project Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Application Under Test
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.platform} · {p.version})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Scenario Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Test Scenario Suite
                  </label>
                  <select
                    value={selectedScenarioId}
                    onChange={(e) => setSelectedScenarioId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
                  >
                    {testScenarios.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditions Row */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Indian Environmental Constraints
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                      <Wifi className="w-3.5 h-3.5 text-sky-600" />
                      <span>Network Profile</span>
                    </label>
                    <select
                      value={selectedNetworkId}
                      onChange={(e) => setSelectedNetworkId(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                    >
                      {networkProfiles.map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {targetNetwork.latencyMs}ms RTT · {targetNetwork.packetLossPercent}% Loss
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-rose-600" />
                      <span>Device Hardware</span>
                    </label>
                    <select
                      value={selectedDeviceId}
                      onChange={(e) => setSelectedDeviceId(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                    >
                      {deviceProfiles.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {targetDevice.ramGb}GB RAM · {targetDevice.viewportWidthPx}px Viewport
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                      <Languages className="w-3.5 h-3.5 text-amber-600" />
                      <span>Language Locale</span>
                    </label>
                    <select
                      value={selectedLocaleId}
                      onChange={(e) => setSelectedLocaleId(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                    >
                      {localeProfiles.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-400 mt-1">
                      +{targetLocale.expansionFactor}% font expansion
                    </p>
                  </div>
                </div>
              </div>

              {/* Scenario Explanation */}
              <div className="p-3.5 rounded-xl bg-indigo-50/50 border border-indigo-200/60 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-indigo-950 block">Target Flow: {targetScenario.targetUserFlow}</span>
                <p className="text-slate-600">{targetScenario.description}</p>
              </div>
            </div>
          ) : (
            /* Live Execution & Telemetry View */
            <div className="space-y-5">
              {/* Progress and status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-900">{currentStepText}</span>
                  <span className="font-mono font-bold text-indigo-600 tabular-nums">
                    {progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Live Virtual Telemetry Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Synthetic Latency</span>
                  <span className="font-mono font-bold text-indigo-600 text-sm tabular-nums">
                    {activeTelemetry.latency} ms
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Memory Usage</span>
                  <span
                    className={`font-mono font-bold text-sm tabular-nums ${
                      activeTelemetry.memoryUsedMb > 1800 ? 'text-rose-600' : 'text-slate-900'
                    }`}
                  >
                    {activeTelemetry.memoryUsedMb} MB / 2048 MB
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">CPU Utilization</span>
                  <span className="font-mono font-bold text-amber-600 text-sm tabular-nums">
                    {activeTelemetry.cpuPercent}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Packet Loss</span>
                  <span className="font-mono font-bold text-rose-600 text-sm tabular-nums">
                    {activeTelemetry.packetLoss}%
                  </span>
                </div>
              </div>

              {/* Terminal Log Stream */}
              <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 h-52 overflow-y-auto space-y-1.5 shadow-inner">
                <div className="text-[11px] text-slate-500 pb-1 border-b border-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>BHARAT-TEST-RUNNER // PID #14820</span>
                  </span>
                  <span className="text-emerald-400">STATUS: {isRunning ? 'EXECUTING' : 'FINISHED'}</span>
                </div>

                {logs.map((log, lIdx) => (
                  <p
                    key={lIdx}
                    className={`text-[11px] leading-relaxed ${
                      log.includes('CRITICAL') || log.includes('FAILED')
                        ? 'text-rose-400 font-bold'
                        : log.includes('Applying') || log.includes('Setting')
                        ? 'text-indigo-300'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </p>
                ))}

                {isRunning && (
                  <div className="flex items-center gap-2 text-indigo-400 text-[11px] pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    <span>Awaiting process signal...</span>
                  </div>
                )}
              </div>

              {/* Finished Verdict Banner */}
              {isFinished && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-rose-800 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Failure Detected: Critical Process SIGKILL on 2GB RAM</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-rose-700">
                      ~2,420,000 Users Affected
                    </span>
                  </div>
                  <p className="text-rose-800 leading-relaxed">
                    The external UPI app switch caused Xiaomi MIUI RAM cleaner to forcefully kill KiranaQuick.
                    The failure was automatically recorded in your project Failure Explorer with drop-in Kotlin fix.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            {isFinished ? 'Close Runner' : 'Cancel'}
          </button>

          {!isRunning && !isFinished ? (
            <button
              onClick={handleStartSimulation}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Real-Time Simulation</span>
            </button>
          ) : isFinished ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rerun Test</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                View in Failure Explorer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
