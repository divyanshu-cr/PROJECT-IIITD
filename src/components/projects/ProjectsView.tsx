import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  Smartphone,
  Globe,
  Server,
  ArrowRight,
  Play,
  Edit2,
  Archive,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Trash2,
  X,
} from 'lucide-react';
import { EnvironmentType, PlatformType, Project } from '../../types';

interface ProjectsViewProps {
  projects: Project[];
  currentProjectId: string;
  onSelectProject: (project: Project) => void;
  onCreateProject: (project: Project) => void;
  onOpenRunTestModal: () => void;
  onNavigateToView: (view: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  currentProjectId,
  onSelectProject,
  onCreateProject,
  onOpenRunTestModal,
  onNavigateToView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [envFilter, setEnvFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Project Form State
  const [newName, setNewName] = useState('');
  const [newPlatform, setNewPlatform] = useState<PlatformType>('android');
  const [newEnv, setNewEnv] = useState<EnvironmentType>('production');
  const [newVersion, setNewVersion] = useState('v1.0.0');
  const [newIdentifier, setNewIdentifier] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.packageIdOrUrl.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || p.platform === platformFilter;
    const matchesEnv = envFilter === 'all' || p.environment === envFilter;
    return matchesSearch && matchesPlatform && matchesEnv;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: newName,
      platform: newPlatform,
      environment: newEnv,
      version: newVersion || 'v1.0.0',
      packageIdOrUrl: newIdentifier || (newPlatform === 'web' ? 'https://app.in' : 'com.example.app'),
      owner: 'Current User',
      lastRunAt: 'Never',
      unresolvedIssuesCount: 0,
      criticalIssuesCount: 0,
      reliabilityScore: 85,
      affectedUsersEstimate: 0,
      description: newDesc || 'Configured for Indian reliability testing.',
      connectionType: newPlatform === 'android' ? 'apk_upload' : newPlatform === 'web' ? 'web_url' : 'api_endpoint',
    };

    onCreateProject(newProj);
    setShowCreateModal(false);
    setNewName('');
    setNewIdentifier('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Project Management · Registered Applications</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Applications & Testing Targets
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Manage Android builds, Web staging environments, and API targets configured for Indian edge test suites.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search projects by name, URL, package..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Platforms</option>
              <option value="android">Android</option>
              <option value="web">Web</option>
              <option value="ios">iOS</option>
              <option value="api">API</option>
            </select>

            <select
              value={envFilter}
              onChange={(e) => setEnvFilter(e.target.value)}
              className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
            >
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.map((project) => {
          const isSelected = project.id === currentProjectId;

          return (
            <div
              key={project.id}
              className={`bg-white rounded-xl border transition-all p-5 flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-indigo-600 ring-1 ring-indigo-600 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 capitalize px-2 py-0.5 rounded bg-slate-100 text-[11px] flex items-center gap-1">
                      {project.platform === 'android' && <Smartphone className="w-3 h-3 text-emerald-600" />}
                      {project.platform === 'web' && <Globe className="w-3 h-3 text-sky-600" />}
                      {project.platform === 'api' && <Server className="w-3 h-3 text-amber-600" />}
                      {project.platform}
                    </span>
                    <span className="font-medium text-slate-500 capitalize text-[11px]">
                      {project.environment}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="text-slate-400">Index:</span>
                    <span
                      className={`font-bold ${
                        project.reliabilityScore >= 80
                          ? 'text-emerald-600'
                          : project.reliabilityScore >= 65
                          ? 'text-amber-600'
                          : 'text-rose-600'
                      }`}
                    >
                      {project.reliabilityScore}/100
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {project.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[11px] font-mono text-slate-600 truncate">
                  Target: {project.packageIdOrUrl}
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Critical Edge Issues</span>
                  <span className="font-bold font-mono text-rose-600">
                    {project.criticalIssuesCount}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Unresolved Bugs</span>
                  <span className="font-bold font-mono text-slate-800">
                    {project.unresolvedIssuesCount}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Affected Exposure</span>
                  <span className="font-bold font-mono text-slate-900">
                    ~{(project.affectedUsersEstimate / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              {/* Card Footer & Actions */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-slate-400 text-[11px]">
                  Last run: {project.lastRunAt}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectProject(project);
                      onNavigateToView('overview');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                      isSelected
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? 'Active Project' : 'Select'}
                  </button>

                  <button
                    onClick={() => {
                      onSelectProject(project);
                      onOpenRunTestModal();
                    }}
                    className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors"
                    title="Run Test on Project"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Add New Application Target</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Configure real-world Indian testing runner profile.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zepto Storefront Android"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as PlatformType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="android">Android (APK / AAB)</option>
                    <option value="web">Web / Mobile Web</option>
                    <option value="ios">iOS TestFlight</option>
                    <option value="api">Fintech API</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Environment</label>
                  <select
                    value={newEnv}
                    onChange={(e) => setNewEnv(e.target.value as EnvironmentType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="production">Production</option>
                    <option value="staging">Staging</option>
                    <option value="development">Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {newPlatform === 'web' ? 'Application URL' : 'Package ID / Binary Target'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={newPlatform === 'web' ? 'https://staging.app.in' : 'com.company.app'}
                  value={newIdentifier}
                  onChange={(e) => setNewIdentifier(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Version / Release Tag</label>
                <input
                  type="text"
                  placeholder="v2.4.0 (Build 302)"
                  value={newVersion}
                  onChange={(e) => setNewVersion(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Target Scope</label>
                <textarea
                  rows={2}
                  placeholder="Primary user flows to evaluate across Indian 4G congestion and budget devices."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
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
                  Register Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
