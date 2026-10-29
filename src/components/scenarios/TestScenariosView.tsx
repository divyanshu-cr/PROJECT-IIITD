import React, { useState } from 'react';
import {
  FileCheck2,
  Plus,
  Play,
  Search,
  CheckCircle2,
  Layers,
  Clock,
  Smartphone,
  Wifi,
  Languages,
  X,
} from 'lucide-react';
import { testScenarios } from '../../data/mockData';
import { TestScenario } from '../../types';

interface TestScenariosViewProps {
  onOpenRunTestModal: () => void;
}

export const TestScenariosView: React.FC<TestScenariosViewProps> = ({
  onOpenRunTestModal,
}) => {
  const [scenarios, setScenarios] = useState<TestScenario[]>(testScenarios);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Scenario State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Payment Reliability');
  const [description, setDescription] = useState('');
  const [flow, setFlow] = useState('');
  const [runtime, setRuntime] = useState(30);

  const filtered = scenarios.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newScenario: TestScenario = {
      id: `scen-${Date.now()}`,
      name,
      category,
      description,
      targetUserFlow: flow || 'Custom User Journey',
      recommendedProfiles: {
        networkId: 'net-jio-congested',
        deviceId: 'dev-redmi-9a',
        localeId: 'loc-hi',
      },
      assertionsCount: 8,
      estimatedRuntimeSec: runtime,
    };

    setScenarios([newScenario, ...scenarios]);
    setShowCreateModal(false);
    setName('');
    setDescription('');
    setFlow('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Test Scenarios · Bharat Automated Suites</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Indian User Journey Suites
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Standardized, repeatable test suites targeting UPI switches, Indic script rendering, and 3G transit sync.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Custom Scenario</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-5 pt-4 border-t border-slate-100 max-w-sm">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scenarios by title, category, flow..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((scen) => (
          <div
            key={scen.id}
            className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[11px]">
                  {scen.category}
                </span>
                <span className="font-mono text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ~{scen.estimatedRuntimeSec}s
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {scen.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {scen.description}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                  Target User Flow
                </span>
                <p className="font-mono text-[11px] text-slate-800 mt-0.5">{scen.targetUserFlow}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500 text-[11px]">
                {scen.assertionsCount} Automated Assertions
              </span>

              <button
                onClick={onOpenRunTestModal}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Scenario</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Custom Scenario Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-900">Create Custom Indian Test Scenario</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Scenario Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aadhaar OTP SMS Auto-Read under 100kbps 2G"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Payment Reliability">Payment Reliability</option>
                  <option value="Localization & UX">Localization & UX</option>
                  <option value="Network Resilience">Network Resilience</option>
                  <option value="Fintech SLA">Fintech SLA</option>
                  <option value="Memory & OOM">Memory & OOM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target User Journey Flow</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Login -> Request OTP -> SMS Permission -> Background Switch -> Verify"
                  value={flow}
                  onChange={(e) => setFlow(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain which edge case or failure mode this scenario targets."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Save Scenario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
