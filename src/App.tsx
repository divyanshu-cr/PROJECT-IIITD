/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { OverviewDashboard } from './components/overview/OverviewDashboard';
import { ProjectsView } from './components/projects/ProjectsView';
import { TestRunsView } from './components/test-runs/TestRunsView';
import { LiveTestRunnerModal } from './components/test-runs/LiveTestRunnerModal';
import { FailureExplorerView } from './components/failure-explorer/FailureExplorerView';
import { ImpactAnalysisView } from './components/impact-analysis/ImpactAnalysisView';
import { IndiaConditionsLabView } from './components/conditions-lab/IndiaConditionsLabView';
import { TestScenariosView } from './components/scenarios/TestScenariosView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { HelpDocModal } from './components/common/HelpDocModal';
import { initialFailures, initialProjects, initialTestRuns } from './data/mockData';
import { FailureItem, Project, TestRun } from './types';
import {
  fetchProjectsFromSupabase,
  saveProjectToSupabase,
  saveTestRunToSupabase,
  updateFailureStatusInSupabase,
} from './lib/supabase';

export default function App() {
  // Navigation & Page State
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [activeView, setActiveView] = useState('overview');

  // Application Data State
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentProject, setCurrentProject] = useState<Project>(initialProjects[0]);
  const [failures, setFailures] = useState<FailureItem[]>(initialFailures);
  const [testRuns, setTestRuns] = useState<TestRun[]>(initialTestRuns);
  const [selectedFailureId, setSelectedFailureId] = useState<string | null>(null);

  // User & Persona State
  const [userRole, setUserRole] = useState('Developer');

  // Modals & Drawers
  const [isRunTestModalOpen, setIsRunTestModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Attempt initial fetch from Supabase if table is present
  useEffect(() => {
    async function loadSupabaseData() {
      const remoteProjects = await fetchProjectsFromSupabase();
      if (remoteProjects && remoteProjects.length > 0) {
        setProjects(remoteProjects);
        setCurrentProject(remoteProjects[0]);
      }
    }
    loadSupabaseData();
  }, []);

  // Counts for sidebar badges
  const projectFailures = failures.filter((f) => f.projectId === currentProject.id);
  const openFailures = projectFailures.filter((f) => f.status !== 'verified_resolved');
  const criticalCount = openFailures.filter((f) => f.severity === 'critical').length;

  // Handlers
  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
    setSelectedFailureId(null);
  };

  const handleCreateProject = (newProject: Project) => {
    setProjects([newProject, ...projects]);
    setCurrentProject(newProject);
    setActiveView('overview');

    // Asynchronously sync to Supabase database
    saveProjectToSupabase(newProject).catch((err) => {
      console.warn('Could not persist project to Supabase:', err);
    });
  };

  const handleVerifyFix = (failureId: string) => {
    setFailures((prev) =>
      prev.map((f) => {
        if (f.id === failureId) {
          return {
            ...f,
            status: 'verified_resolved' as const,
            lastVerifiedAt: 'Just now',
          };
        }
        return f;
      })
    );

    // Boost project reliability score upon verified resolution
    setCurrentProject((prev) => ({
      ...prev,
      reliabilityScore: Math.min(prev.reliabilityScore + 9, 98),
      unresolvedIssuesCount: Math.max(prev.unresolvedIssuesCount - 1, 0),
      criticalIssuesCount: Math.max(prev.criticalIssuesCount - 1, 0),
    }));

    // Update in Supabase database
    updateFailureStatusInSupabase(failureId, 'verified_resolved').catch((err) => {
      console.warn('Could not update failure status in Supabase:', err);
    });
  };

  const handleTestComplete = (newRun: TestRun) => {
    setTestRuns([newRun, ...testRuns]);
    // update current project last run
    setCurrentProject((prev) => ({
      ...prev,
      lastRunAt: 'Just now',
    }));

    // Asynchronously save test run to Supabase
    saveTestRunToSupabase(newRun).catch((err) => {
      console.warn('Could not persist test run to Supabase:', err);
    });
  };

  const handleSelectFailureFromOverview = (failure: FailureItem) => {
    setSelectedFailureId(failure.id);
    setActiveView('failure-explorer');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navbar */}
      <Navbar
        currentProject={currentProject}
        projects={projects}
        onSelectProject={handleSelectProject}
        activeView={activeView}
        onOpenRunTestModal={() => setIsRunTestModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        userRole={userRole}
        onChangeUserRole={setUserRole}
        isLandingPage={isLandingPage}
        onToggleLandingPage={() => setIsLandingPage(!isLandingPage)}
      />

      {isLandingPage ? (
        /* Landing Page Mode */
        <LandingPage
          onStartTesting={() => {
            setIsLandingPage(false);
            setIsOnboardingOpen(true);
          }}
          onExploreDemo={() => {
            setIsLandingPage(false);
            setActiveView('overview');
          }}
          onOpenConditionsLab={() => {
            setIsLandingPage(false);
            setActiveView('conditions-lab');
          }}
        />
      ) : (
        /* App Console Mode */
        <div className="flex flex-1 min-h-[calc(100vh-3.5rem)]">
          {/* Left Persistent Sidebar */}
          <Sidebar
            activeView={activeView}
            onSelectView={setActiveView}
            unresolvedCount={openFailures.length}
            criticalCount={criticalCount}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
            {activeView === 'overview' && (
              <OverviewDashboard
                project={currentProject}
                failures={failures}
                testRuns={testRuns}
                onOpenRunTestModal={() => setIsRunTestModalOpen(true)}
                onSelectFailure={handleSelectFailureFromOverview}
                onNavigateToView={setActiveView}
                onVerifyFix={handleVerifyFix}
              />
            )}

            {activeView === 'projects' && (
              <ProjectsView
                projects={projects}
                currentProjectId={currentProject.id}
                onSelectProject={handleSelectProject}
                onCreateProject={handleCreateProject}
                onOpenRunTestModal={() => setIsRunTestModalOpen(true)}
                onNavigateToView={setActiveView}
              />
            )}

            {activeView === 'test-runs' && (
              <TestRunsView
                testRuns={testRuns}
                currentProject={currentProject}
                onOpenRunTestModal={() => setIsRunTestModalOpen(true)}
                onNavigateToFailureExplorer={() => setActiveView('failure-explorer')}
              />
            )}

            {activeView === 'failure-explorer' && (
              <FailureExplorerView
                failures={failures}
                currentProject={currentProject}
                selectedFailureId={selectedFailureId}
                onSelectFailureId={setSelectedFailureId}
                onVerifyFix={handleVerifyFix}
              />
            )}

            {activeView === 'impact-analysis' && (
              <ImpactAnalysisView
                currentProject={currentProject}
                failures={failures}
              />
            )}

            {activeView === 'conditions-lab' && (
              <IndiaConditionsLabView
                onLaunchTestWithConfig={(config) => {
                  setIsRunTestModalOpen(true);
                }}
              />
            )}

            {activeView === 'test-scenarios' && (
              <TestScenariosView
                onOpenRunTestModal={() => setIsRunTestModalOpen(true)}
              />
            )}

            {activeView === 'reports' && (
              <ReportsView
                currentProject={currentProject}
                failures={failures}
                testRuns={testRuns}
              />
            )}

            {activeView === 'settings' && (
              <SettingsView
                projects={projects}
                testRuns={testRuns}
                failures={failures}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Interactive Modals & Drawers */}
      <LiveTestRunnerModal
        isOpen={isRunTestModalOpen}
        onClose={() => setIsRunTestModalOpen(false)}
        projects={projects}
        currentProject={currentProject}
        onTestComplete={handleTestComplete}
      />

      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleCreateProject}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToFailure={() => {
          setIsLandingPage(false);
          setActiveView('failure-explorer');
        }}
      />

      <HelpDocModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
