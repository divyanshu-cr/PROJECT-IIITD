import React, { useState } from 'react';
import { X, Check, ArrowRight, ArrowLeft, Smartphone, Globe, Server, Radio, Cpu, Languages } from 'lucide-react';
import { Project, PlatformType, EnvironmentType } from '../../types';

interface OnboardingWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (newProject: Project) => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);

  // Form State
  const [workspaceName, setWorkspaceName] = useState('Swiggy Core Consumer Team');
  const [workspaceRegion, setWorkspaceRegion] = useState('Mumbai (ap-south-1)');
  
  const [projectName, setProjectName] = useState('KiranaQuick Consumer App');
  const [platform, setPlatform] = useState<PlatformType>('android');
  const [environment, setEnvironment] = useState<EnvironmentType>('production');
  const [version, setVersion] = useState('v3.15.0');
  
  const [connectionMethod, setConnectionMethod] = useState<'apk_upload' | 'web_url' | 'api_endpoint'>('apk_upload');
  const [appIdentifier, setAppIdentifier] = useState('in.kiranaquick.consumer');
  const [uploadedFileName, setUploadedFileName] = useState('kiranaquick-v3.15.0-release.apk');

  const [selectedProfiles, setSelectedProfiles] = useState({
    network: 'Jio 4G Peak Congestion (Tier 2/3)',
    device: 'Xiaomi Redmi 9A (2GB RAM)',
    locale: 'Hindi (हिंदी)',
    aggressiveOemKiller: true,
  });

  if (!isOpen) return null;

  const handleFinish = () => {
    const createdProject: Project = {
      id: `proj-${Date.now()}`,
      name: projectName,
      platform: platform,
      environment: environment,
      version: version,
      packageIdOrUrl: appIdentifier,
      owner: 'Current User',
      lastRunAt: 'Just now',
      unresolvedIssuesCount: 2,
      criticalIssuesCount: 1,
      reliabilityScore: 72,
      affectedUsersEstimate: 1450000,
      description: `Configured on ${new Date().toLocaleDateString()} for Indian reliability testing.`,
      connectionType: connectionMethod,
    };
    onComplete(createdProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-[11px] font-mono text-indigo-600 font-semibold uppercase tracking-wider">
              BharatTest Setup Wizard · Step {step} of 5
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              {step === 1 && 'Create Workspace & Regional Cloud Node'}
              {step === 2 && 'Define Application Details'}
              {step === 3 && 'Choose Connection Method'}
              {step === 4 && 'Configure Initial Indian Testing Profiles'}
              {step === 5 && 'Verify & Launch Initial Test'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1">
          <div
            className="bg-indigo-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Workspaces group your team, applications, and regional Indian latency profiles together.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Zepto Core Checkout, PhonePe QR squad"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Indian Testing Cloud Node</label>
                <select
                  value={workspaceRegion}
                  onChange={(e) => setWorkspaceRegion(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Mumbai (ap-south-1)">Mumbai (ap-south-1) · Primary Gateway & Edge Router</option>
                  <option value="Hyderabad (ap-south-2)">Hyderabad (ap-south-2) · Secondary Mirror</option>
                  <option value="Delhi-NCR Edge Pod">Delhi-NCR Edge Pod · North India Transit Simulator</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Application Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. KiranaQuick Mobile"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Platform Target</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as PlatformType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="android">Android (APK / AAB / Bundle)</option>
                    <option value="web">Web Application / Mobile Web PWA</option>
                    <option value="ios">iOS (IPA TestFlight)</option>
                    <option value="api">Fintech / Backend API Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Deployment Environment</label>
                  <select
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value as EnvironmentType)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="production">Production</option>
                    <option value="staging">Staging / UAT</option>
                    <option value="development">Development</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Release Version / Build Tag</label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. v3.15.0 (Build 4122)"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-700">Choose Connection Method</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setConnectionMethod('apk_upload')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    connectionMethod === 'apk_upload'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs font-bold text-slate-900">APK / AAB Build</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Upload Android binary</p>
                </button>

                <button
                  type="button"
                  onClick={() => setConnectionMethod('web_url')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    connectionMethod === 'web_url'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Globe className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs font-bold text-slate-900">Web URL</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Staging or Prod link</p>
                </button>

                <button
                  type="button"
                  onClick={() => setConnectionMethod('api_endpoint')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    connectionMethod === 'api_endpoint'
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <Server className="w-5 h-5 text-indigo-600 mb-2" />
                  <p className="text-xs font-bold text-slate-900">API Endpoint</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">REST / Webhooks</p>
                </button>
              </div>

              {connectionMethod === 'apk_upload' ? (
                <div className="border border-dashed border-slate-300 rounded-xl p-5 bg-slate-50 text-center">
                  <Smartphone className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-700">Drop your APK / AAB or click to attach</p>
                  <p className="text-[11px] text-slate-500 mt-1">Currently attached: <span className="font-mono text-slate-700">{uploadedFileName}</span> (42.8 MB)</p>
                  <div className="mt-3">
                    <input
                      type="text"
                      value={appIdentifier}
                      onChange={(e) => setAppIdentifier(e.target.value)}
                      placeholder="Package ID: e.g. in.kiranaquick.consumer"
                      className="w-full max-w-sm px-3 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Application URL</label>
                  <input
                    type="url"
                    value={appIdentifier}
                    onChange={(e) => setAppIdentifier(e.target.value)}
                    placeholder="https://staging.myapp.in"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600">
                Select the baseline Indian network and hardware profiles to run against:
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Radio className="w-4 h-4 text-sky-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Network Impairment Profile</p>
                      <p className="text-[11px] text-slate-500">Jio 4G Peak Congestion (650ms Latency · 12% Packet Loss)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">Active</span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-indigo-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Virtual Hardware Profile</p>
                      <p className="text-[11px] text-slate-500">Xiaomi Redmi 9A (2GB RAM, Helio G25, 360px Viewport)</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">Active</span>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Languages className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-xs font-semibold text-slate-900">Indic Language Localization</p>
                      <p className="text-[11px] text-slate-500">Hindi (हिंदी) + Tamil (தமிழ்) Character Expansion Check</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ready to Launch First Test</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                BharatTest will test <span className="font-semibold text-slate-800">{projectName}</span> ({version}) across Indian 4G congestion, 2GB budget RAM constraints, and Indic font scaling.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-1 text-slate-700">
                <p><span className="text-slate-400">Target:</span> {appIdentifier}</p>
                <p><span className="text-slate-400">Environment:</span> {environment} ({platform})</p>
                <p><span className="text-slate-400">Initial Scenario:</span> UPI Intent App Switch & Vernacular Overflow</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-3.5 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow flex items-center gap-1.5"
            >
              <span>Launch Initial Test</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
