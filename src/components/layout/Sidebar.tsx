import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  PlayCircle,
  AlertOctagon,
  Users2,
  Radio,
  FileCheck2,
  FileText,
  Settings,
  Sparkles,
  Zap,
  Database,
} from 'lucide-react';
import { SUPABASE_PROJECT_ID } from '../../lib/supabase';

interface SidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  unresolvedCount: number;
  criticalCount: number;
  onOpenOnboarding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  unresolvedCount,
  criticalCount,
  onOpenOnboarding,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'test-runs', label: 'Test Runs', icon: PlayCircle },
    {
      id: 'failure-explorer',
      label: 'Failure Explorer',
      icon: AlertOctagon,
      count: unresolvedCount,
      critical: criticalCount > 0,
    },
    { id: 'impact-analysis', label: 'Impact Analysis', icon: Users2 },
    { id: 'conditions-lab', label: 'India Conditions Lab', icon: Radio, highlight: true },
    { id: 'test-scenarios', label: 'Test Scenarios', icon: FileCheck2 },
    { id: 'reports', label: 'Reports & CI/CD', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-14 px-5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-bold text-sm shadow">
            भ
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-base tracking-tight leading-none">BharatTest</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">Reliability Platform</span>
          </div>
        </div>
      </div>

      {/* Workspace & Supabase Connection Indicator */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300 truncate">Swiggy & Kirana Core</span>
          <span className="text-emerald-400 font-mono text-[10px]">Active Org</span>
        </div>
        <button
          onClick={() => onSelectView('settings')}
          className="w-full mt-1.5 flex items-center justify-between text-[10px] text-slate-400 hover:text-slate-200 transition-colors p-1 -mx-1 rounded hover:bg-slate-800/50"
          title="Supabase Database Connected"
        >
          <span className="text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Supabase: {SUPABASE_PROJECT_ID.slice(0, 10)}...
          </span>
          <span className="text-slate-500 font-mono">Connected</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Testing Suite
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>

              {item.highlight && !isActive && (
                <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-1.5 py-0.2 rounded font-mono">
                  LAB
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span
                  className={`text-[11px] font-mono font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white text-indigo-700'
                      : item.critical
                      ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Setup Banner */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/30">
        <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
            <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Setup Wizard</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Configure new mobile build or web URL with Indian network profiles.
          </p>
          <button
            onClick={onOpenOnboarding}
            className="w-full mt-2.5 py-1.5 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold transition-colors"
          >
            Launch Setup Wizard
          </button>
        </div>
      </div>
    </aside>
  );
};
