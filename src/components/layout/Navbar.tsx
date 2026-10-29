import React from 'react';
import { Play, Bell, HelpCircle, ChevronDown, Check, Globe } from 'lucide-react';
import { Project } from '../../types';

interface NavbarProps {
  currentProject: Project;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  activeView: string;
  onOpenRunTestModal: () => void;
  onOpenNotifications: () => void;
  onOpenHelp: () => void;
  userRole: string;
  onChangeUserRole: (role: string) => void;
  isLandingPage: boolean;
  onToggleLandingPage: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProject,
  projects,
  onSelectProject,
  activeView,
  onOpenRunTestModal,
  onOpenNotifications,
  onOpenHelp,
  userRole,
  onChangeUserRole,
  isLandingPage,
  onToggleLandingPage,
}) => {
  const [showProjectDropdown, setShowProjectDropdown] = React.useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  const roles = [
    { id: 'Developer', label: 'Developer (Arjun Verma)', subtitle: 'Full Debug & Code Fixes' },
    { id: 'QA Lead', label: 'QA Lead (Pooja Iyer)', subtitle: 'Test Runner & Lab Admin' },
    { id: 'Engineering Manager', label: 'Eng Manager (Kavita Nair)', subtitle: 'SLA & Rollout Governance' },
    { id: 'Product Lead', label: 'Product Lead (Siddharth Rao)', subtitle: 'Impact & Demographics' },
  ];

  return (
    <header className="h-14 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-5 gap-4">
      {/* Zone 1: Context & Project Selector */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onToggleLandingPage}
          className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          title="Toggle between Landing Page and App Console"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>{isLandingPage ? 'Enter Platform' : 'View Product Site'}</span>
        </button>

        {!isLandingPage && (
          <div className="flex items-center gap-2 text-xs text-slate-500 min-w-0">
            <span className="font-medium text-slate-400">Project /</span>
            <div className="relative">
              <button
                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                className="flex items-center gap-1.5 font-semibold text-slate-900 hover:text-indigo-600 transition-colors py-1 px-2 rounded hover:bg-slate-50 whitespace-nowrap"
              >
                <span className="truncate max-w-[200px]">{currentProject.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProjectDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProjectDropdown(false)}
                  />
                  <div className="absolute left-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1.5">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Switch Project
                    </div>
                    {projects.map((proj) => (
                      <button
                        key={proj.id}
                        onClick={() => {
                          onSelectProject(proj);
                          setShowProjectDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                      >
                        <div className="truncate pr-2">
                          <p className="font-medium text-slate-800 truncate">{proj.name}</p>
                          <p className="text-[11px] text-slate-400 capitalize">{proj.platform} · {proj.environment}</p>
                        </div>
                        {proj.id === currentProject.id && (
                          <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Zone 2: Navigation Links / Current Breadcrumb Title */}
      <div className="hidden lg:flex items-center gap-3 text-xs font-medium text-slate-600">
        {!isLandingPage ? (
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Section:</span>
            <span className="font-semibold text-slate-900 capitalize">{activeView.replace('-', ' ')}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">Real-World India Reliability Suite</span>
          </div>
        ) : (
          <span className="text-slate-500 text-xs">Empowering 100M+ Indian users through resilient software</span>
        )}
      </div>

      {/* Zone 3: Actions & Account Profile */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenHelp}
          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          title="Indian Conditions Knowledge Base & Benchmarks"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          title="Notifications & Regressions"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        {/* User Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors text-left"
          >
            <img
              src="/src/assets/images/avatar_engineer_lead_1793257659185.jpg"
              alt="User Avatar"
              className="w-7 h-7 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">{userRole}</p>
              <p className="text-[10px] text-slate-400 leading-none mt-1">BharatQA Team</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowRoleDropdown(false)} />
              <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50 py-1.5">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Switch Persona / Role
                </div>
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onChangeUserRole(r.id);
                      setShowRoleDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{r.label}</p>
                      <p className="text-[11px] text-slate-400">{r.subtitle}</p>
                    </div>
                    {userRole === r.id && (
                      <Check className="w-4 h-4 text-indigo-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onOpenRunTestModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap ml-1"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run Test</span>
        </button>
      </div>
    </header>
  );
};
