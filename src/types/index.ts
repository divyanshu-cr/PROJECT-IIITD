export type PlatformType = 'android' | 'ios' | 'web' | 'api';
export type EnvironmentType = 'production' | 'staging' | 'development';
export type SeverityType = 'critical' | 'high' | 'medium' | 'low';
export type TestStatusType = 'passed' | 'failed' | 'running' | 'queued' | 'warning';

export interface Project {
  id: string;
  name: string;
  platform: PlatformType;
  environment: EnvironmentType;
  version: string;
  packageIdOrUrl: string;
  owner: string;
  lastRunAt: string;
  unresolvedIssuesCount: number;
  criticalIssuesCount: number;
  reliabilityScore: number; // 0 - 100
  affectedUsersEstimate: number;
  description: string;
  connectionType: 'apk_upload' | 'web_url' | 'api_endpoint' | 'repo_webhook';
}

export interface NetworkProfile {
  id: string;
  name: string;
  description: string;
  carrier: 'Jio' | 'Airtel' | 'Vi' | 'BSNL' | 'Mixed';
  generation: '2G' | '3G' | '4G' | '5G' | 'Wi-Fi Intermittent';
  latencyMs: number;
  packetLossPercent: number;
  downloadKbps: number;
  uploadKbps: number;
  jitterMs: number;
  timeoutCutoffSec: number;
  isTransitMode?: boolean;
}

export interface DeviceProfile {
  id: string;
  name: string;
  brand: string;
  tier: 'budget' | 'entry' | 'mid' | 'flagship';
  ramGb: number;
  soc: string;
  osVersion: string;
  screenResolution: string;
  viewportWidthPx: number;
  marketShareInIndiaPercent: number;
  hasAggressiveOemKiller: boolean; // MIUI, ColorOS, FunTouch OS
  defaultFontScale: number; // e.g. 1.25x for accessibility
}

export interface LocaleProfile {
  id: string;
  name: string;
  nativeScript: string;
  languageCode: string;
  expansionFactor: number; // percentage expansion over English
  sampleText: string;
  numberFormat: 'Indian Lakhs/Crores' | 'International Millions';
}

export interface FailureItem {
  id: string;
  projectId: string;
  title: string;
  severity: SeverityType;
  category: 'Network Resilience' | 'Low-Memory & OOM' | 'Vernacular Overflow' | 'Payment & Webhook' | 'Offline & Sync' | 'Permissions & Location';
  affectedUsersEstimate: number;
  affectedUserPercent: number; // % of total Indian user base
  rootCause: string;
  conditionsHit: {
    network: string;
    device: string;
    locale: string;
    locationTier: 'Tier 1' | 'Tier 2/3' | 'Rural / Transit';
  };
  reproductionSteps: string[];
  harSummary?: {
    endpoint: string;
    durationMs: number;
    status: number;
    errorType: string;
  };
  codeFix: {
    filename: string;
    language: string;
    beforeCode: string;
    afterCode: string;
    explanation: string;
  };
  status: 'open' | 'fixing' | 'verified_resolved';
  firstDetectedAt: string;
  lastVerifiedAt?: string;
}

export interface TestRun {
  id: string;
  projectId: string;
  projectName: string;
  scenarioName: string;
  status: TestStatusType;
  startedAt: string;
  durationSeconds: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  conditionsApplied: {
    networkProfile: string;
    deviceProfile: string;
    locale: string;
    tier: string;
  };
  failuresDetected: string[]; // Failure IDs
  affectedUsersRisk: number;
  logSummary: string[];
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  category: string;
  targetUserFlow: string;
  recommendedProfiles: {
    networkId: string;
    deviceId: string;
    localeId: string;
  };
  assertionsCount: number;
  estimatedRuntimeSec: number;
}
