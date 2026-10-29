import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Users,
  Key,
  Bell,
  Smartphone,
  Shield,
  Copy,
  Check,
  Plus,
  Trash2,
  Database,
  RefreshCw,
  ExternalLink,
  Code,
  ShieldCheck,
  AlertCircle,
  Download,
  CheckCircle2,
} from 'lucide-react';
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  SUPABASE_SQL_SCHEMA,
  testSupabaseConnection,
  saveProjectToSupabase,
  saveTestRunToSupabase,
  SupabaseConnectionStatus,
} from '../../lib/supabase';
import { Project, TestRun, FailureItem } from '../../types';

interface SettingsViewProps {
  projects?: Project[];
  testRuns?: TestRun[];
  failures?: FailureItem[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  projects = [],
  testRuns = [],
  failures = [],
}) => {
  const [activeTab, setActiveTab] = useState<'database' | 'workspace' | 'team' | 'api-keys' | 'integrations'>('database');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('https://hooks.slack.com/services/T01/B02/bharat-alerts');
  const [jiraIntegrationEnabled, setJiraIntegrationEnabled] = useState(true);

  // Supabase state
  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseConnectionStatus | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Arjun Verma', email: 'arjun.v@company.in', role: 'Developer', access: 'Admin' },
    { id: '2', name: 'Pooja Iyer', email: 'pooja.i@company.in', role: 'QA Lead', access: 'Write' },
    { id: '3', name: 'Kavita Nair', email: 'kavita.n@company.in', role: 'Eng Manager', access: 'Write' },
    { id: '4', name: 'Siddharth Rao', email: 'siddharth.r@company.in', role: 'Product Lead', access: 'Read' },
  ]);

  // Run connection test on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsTestingConnection(true);
    const status = await testSupabaseConnection();
    setSupabaseStatus(status);
    setIsTestingConnection(false);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('bht_live_948a201bfa9824c09381eefc');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleDownloadSql = () => {
    const blob = new Blob([SUPABASE_SQL_SCHEMA], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `supabase_schema_${SUPABASE_PROJECT_ID}.sql`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(SUPABASE_ANON_KEY);
    setCopiedApiKey(true);
    setTimeout(() => setCopiedApiKey(false), 2000);
  };

  const handleSyncDataToSupabase = async () => {
    setIsSyncing(true);
    setSyncFeedback('Syncing projects and test records to Supabase...');

    let projectSuccessCount = 0;
    for (const proj of projects) {
      const ok = await saveProjectToSupabase(proj);
      if (ok) projectSuccessCount++;
    }

    let runSuccessCount = 0;
    for (const run of testRuns) {
      const ok = await saveTestRunToSupabase(run);
      if (ok) runSuccessCount++;
    }

    setIsSyncing(false);
    if (projectSuccessCount > 0 || runSuccessCount > 0) {
      setSyncFeedback(
        `Successfully synced ${projectSuccessCount} projects and ${runSuccessCount} test runs to Supabase table storage!`
      );
    } else {
      setSyncFeedback(
        'Connection established! If tables are not yet created, run the SQL schema migration in Supabase SQL editor below.'
      );
    }

    // Refresh connection status
    checkConnection();
  };

  const sqlEditorUrl = `https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Workspace & Platform Configuration</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            BharatTest Settings
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Manage your Supabase database schema, organization members, Indian cloud runners, and API keys.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-5 border-b border-slate-200 pb-px overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'database'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Database (Supabase)</span>
          </button>
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'workspace'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Workspace & Region
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'team'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Team Members ({teamMembers.length})
          </button>
          <button
            onClick={() => setActiveTab('api-keys')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'api-keys'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            API Keys & CLI Tokens
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'integrations'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Webhooks & Alerts
          </button>
        </div>
      </div>

      {/* Tab: Database (Supabase) */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Supabase Database Integration</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Connected to Supabase PostgreSQL project for persistent storage of test runs, failures, and projects.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={checkConnection}
                disabled={isTestingConnection}
                className="px-3.5 py-1.5 border border-slate-300 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin text-indigo-600' : ''}`} />
                <span>{isTestingConnection ? 'Checking...' : 'Check Schema Status'}</span>
              </button>

              <button
                onClick={handleSyncDataToSupabase}
                disabled={isSyncing}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Database className="w-3.5 h-3.5" />
                <span>{isSyncing ? 'Syncing...' : 'Sync Data to Supabase'}</span>
              </button>
            </div>
          </div>

          {/* Quick Setup Guide Card */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-50/80 to-sky-50/80 border border-indigo-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                  Execute SQL Schema in Supabase (30 Seconds)
                </h4>
              </div>
              <a
                href={sqlEditorUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
              >
                <span>Open Supabase SQL Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-indigo-900/80 leading-relaxed">
              PostgreSQL security restrictions require schema DDL (`CREATE TABLE`) to be executed via your Supabase SQL editor or direct admin connection. Follow these simple steps:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-white/80 p-3 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-800 block mb-0.5">Step 1: Copy Script</span>
                <p className="text-slate-600 text-[11px]">Click the button below to copy the full SQL DDL script.</p>
                <button
                  onClick={handleCopySql}
                  className="mt-2 w-full py-1 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  {copiedSql ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSql ? 'Copied to Clipboard!' : 'Copy SQL Schema'}</span>
                </button>
              </div>

              <div className="bg-white/80 p-3 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-800 block mb-0.5">Step 2: Run in Supabase</span>
                <p className="text-slate-600 text-[11px]">Paste into Supabase SQL Editor and click the green <strong>"Run"</strong> button.</p>
                <a
                  href={sqlEditorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 w-full py-1 px-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <span>Go to SQL Editor</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-white/80 p-3 rounded-lg border border-indigo-100">
                <span className="font-bold text-slate-800 block mb-0.5">Step 3: Verify & Sync</span>
                <p className="text-slate-600 text-[11px]">Return here and click Check Status to verify live tables.</p>
                <button
                  onClick={checkConnection}
                  className="mt-2 w-full py-1 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Check Status</span>
                </button>
              </div>
            </div>
          </div>

          {/* Connection & Table Status Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    supabaseStatus?.isConnected ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-900">
                  {supabaseStatus?.isConnected ? 'Supabase REST Endpoint Connected' : 'Connecting to Supabase...'}
                </span>
                {supabaseStatus?.latencyMs && (
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    {supabaseStatus.latencyMs}ms RTT
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Last checked: {supabaseStatus?.lastCheckedAt || 'Just now'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Project ID</span>
                <span className="font-mono font-semibold text-slate-800">{SUPABASE_PROJECT_ID}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">API Endpoint</span>
                <span className="font-mono font-semibold text-slate-800 truncate block">{SUPABASE_URL}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Supabase Table Schema Status</span>
                <span className="font-mono font-semibold text-slate-800">
                  {supabaseStatus?.tablesFound && supabaseStatus.tablesFound.length > 0 ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {supabaseStatus.tablesFound.join(', ')} (Active)
                    </span>
                  ) : (
                    <span className="text-amber-700">Awaiting SQL execution in Supabase</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Credentials Display (From User Request) */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                readOnly
                value={SUPABASE_URL}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-slate-50 text-slate-700"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Supabase API Key (Publishable / Anon)
                </label>
                <button
                  onClick={handleCopyApiKey}
                  className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-medium"
                >
                  {copiedApiKey ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedApiKey ? 'Copied Key!' : 'Copy Key'}</span>
                </button>
              </div>
              <input
                type="text"
                readOnly
                value={SUPABASE_ANON_KEY}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-slate-50 text-slate-700"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Configured for project <span className="font-mono font-medium text-slate-700">{SUPABASE_PROJECT_ID}</span>.
              </p>
            </div>
          </div>

          {syncFeedback && (
            <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{syncFeedback}</span>
            </div>
          )}

          {/* Supabase SQL Schema Box */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Complete SQL Schema & Seed Script (supabase_schema.sql)</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Creates tables `projects`, `test_runs`, `failures`, configures RLS security policies, and inserts realistic Indian test data.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadSql}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .sql</span>
                </button>

                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'SQL Copied!' : 'Copy Full SQL Script'}</span>
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-300 max-h-64 overflow-y-auto shadow-inner">
              <pre className="text-[11px] leading-relaxed whitespace-pre-wrap">{SUPABASE_SQL_SCHEMA}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Workspace */}
      {activeTab === 'workspace' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="max-w-xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue="Swiggy Core Consumer Team"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Default Cloud Region for Impairment Runners</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500">
                <option>Mumbai (ap-south-1) · Direct Peering with Airtel & Jio IX</option>
                <option>Hyderabad (ap-south-2)</option>
                <option>Delhi NCR Edge Container Cluster</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Critical User Exposure Threshold (SLA)</label>
              <input
                type="text"
                defaultValue="1,000,000 Indian Users"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Any failure exposing more than this user volume automatically blocks release deployment.
              </p>
            </div>

            <div className="pt-2">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors">
                Save Workspace Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Team */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Workspace Members</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Roles govern permissions to trigger Indian stress runs and mark code fixes as verified.
              </p>
            </div>
            <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Invite Teammate</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
            {teamMembers.map((m) => (
              <div key={m.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-slate-900">{m.name}</p>
                  <p className="text-[11px] text-slate-500">{m.email} · {m.role}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {m.access}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: API Keys */}
      {activeTab === 'api-keys' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Automation API Tokens</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Use these tokens in GitHub Actions, GitLab CI, or fastlane pipelines.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">Production CLI Token</span>
              <span className="text-[11px] text-emerald-600 font-mono">Active</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="password"
                readOnly
                value="bht_live_948a201bfa9824c09381eefc"
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono bg-white text-slate-700"
              />
              <button
                onClick={handleCopyKey}
                className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              Created on Oct 24, 2026. Never expose this key in public client repositories.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Integrations */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Incident & Alert Webhooks</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Broadcast critical Indian regressions immediately to your engineering channels.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Slack Webhook (#bharat-reliability-alerts)</span>
                <span className="text-emerald-600 font-mono text-[11px]">Connected</span>
              </div>
              <input
                type="url"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-mono text-slate-700"
              />
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Automated Jira Issue Creation</h4>
                <p className="text-[11px] text-slate-500">
                  Automatically file P0/P1 bugs in Jira sprint backlog when affected user estimate &gt; 500,000.
                </p>
              </div>
              <button
                onClick={() => setJiraIntegrationEnabled(!jiraIntegrationEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  jiraIntegrationEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    jiraIntegrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
