import React, { useState } from 'react';
import {
  Radio,
  Wifi,
  Smartphone,
  Languages,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { deviceProfiles, localeProfiles, networkProfiles } from '../../data/mockData';
import { DeviceProfile, LocaleProfile, NetworkProfile } from '../../types';

interface IndiaConditionsLabProps {
  onLaunchTestWithConfig: (config: {
    network: NetworkProfile;
    device: DeviceProfile;
    locale: LocaleProfile;
  }) => void;
}

export const IndiaConditionsLabView: React.FC<IndiaConditionsLabProps> = ({
  onLaunchTestWithConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'network' | 'device' | 'vernacular' | 'timeline'>('network');

  // Selected state
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkProfile>(networkProfiles[0]);
  const [customLatency, setCustomLatency] = useState(selectedNetwork.latencyMs);
  const [customPacketLoss, setCustomPacketLoss] = useState(selectedNetwork.packetLossPercent);
  const [customBandwidth, setCustomBandwidth] = useState(selectedNetwork.downloadKbps);
  const [customTimeout, setCustomTimeout] = useState(selectedNetwork.timeoutCutoffSec);

  const [selectedDevice, setSelectedDevice] = useState<DeviceProfile>(deviceProfiles[0]);
  const [customOemKiller, setCustomOemKiller] = useState(selectedDevice.hasAggressiveOemKiller);
  const [customFontScale, setCustomFontScale] = useState(selectedDevice.defaultFontScale);
  const [thermalThrottling, setThermalThrottling] = useState(true);

  const [selectedLocale, setSelectedLocale] = useState<LocaleProfile>(localeProfiles[1]); // Tamil by default
  const [vernacularTestString, setVernacularTestString] = useState(
    'உங்கள் ஆர்டரை உறுதிசெய்து பாதுகாப்பாகப் பணம் செலுத்தவும்'
  );
  const [buttonWidthPx, setButtonWidthPx] = useState(160);

  // Simulation Timeline State
  const [timelineSecond, setTimelineSecond] = useState(15);
  const [isPlayingTimeline, setIsPlayingTimeline] = useState(false);

  // Sync sliders when preset network changes
  const handleSelectNetwork = (net: NetworkProfile) => {
    setSelectedNetwork(net);
    setCustomLatency(net.latencyMs);
    setCustomPacketLoss(net.packetLossPercent);
    setCustomBandwidth(net.downloadKbps);
    setCustomTimeout(net.timeoutCutoffSec);
  };

  const handleSelectDevice = (dev: DeviceProfile) => {
    setSelectedDevice(dev);
    setCustomOemKiller(dev.hasAggressiveOemKiller);
    setCustomFontScale(dev.defaultFontScale);
  };

  // Timeline events
  const timelineEvents = [
    { sec: 0, title: 'App Launch', state: 'Good 4G signal (35ms)' },
    { sec: 8, title: 'Cell Handover', state: 'Tower handover jitter (+420ms)' },
    { sec: 14, title: 'Transit Blackout', state: 'Complete radio drop (0 kbps) for 8s' },
    { sec: 22, title: 'Socket Recovery', state: 'Reconnecting on degraded 2G cell' },
    { sec: 32, title: 'UPI Intent Trigger', state: 'Activity backgrounded, RAM pressure check' },
    { sec: 40, title: 'Session Rebirth', state: 'State reconciliation verification' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold font-mono uppercase">
              <Radio className="w-3.5 h-3.5" />
              <span>India Conditions Lab · Realistic Simulation Workbench</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Test Environment Matrix
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed mt-1">
              Configure real Indian telecom impairments, budget Android hardware constraints, and Indic vernacular text expansion to uncover real user failures.
            </p>
          </div>

          <button
            onClick={() =>
              onLaunchTestWithConfig({
                network: {
                  ...selectedNetwork,
                  latencyMs: customLatency,
                  packetLossPercent: customPacketLoss,
                  downloadKbps: customBandwidth,
                  timeoutCutoffSec: customTimeout,
                },
                device: {
                  ...selectedDevice,
                  hasAggressiveOemKiller: customOemKiller,
                  defaultFontScale: customFontScale,
                },
                locale: selectedLocale,
              })
            }
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Test with Active Config</span>
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-6 border-b border-slate-200 pb-px overflow-x-auto">
          <button
            onClick={() => setActiveTab('network')}
            className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'network'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Wifi className="w-4 h-4" />
            <span>A. Network Conditions ({selectedNetwork.carrier})</span>
          </button>

          <button
            onClick={() => setActiveTab('device')}
            className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'device'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>B. Budget Device Profiles ({selectedDevice.name})</span>
          </button>

          <button
            onClick={() => setActiveTab('vernacular')}
            className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'vernacular'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Languages className="w-4 h-4" />
            <span>C. Indic Script & Font Overflow ({selectedLocale.name})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-4 py-2 text-xs font-semibold transition-colors border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>D. Network Simulation Timeline</span>
          </button>
        </div>
      </div>

      {/* TAB A: Network Conditions */}
      {activeTab === 'network' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preset Profiles List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Indian Telecom Presets
            </h3>
            <div className="space-y-2">
              {networkProfiles.map((net) => (
                <button
                  key={net.id}
                  onClick={() => handleSelectNetwork(net)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedNetwork.id === net.id
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{net.name}</span>
                    <span className="font-mono text-[11px] font-semibold text-slate-500">
                      {net.generation}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {net.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-3 text-[11px] font-mono text-slate-500">
                    <span>{net.latencyMs}ms latency</span>
                    <span>·</span>
                    <span>{net.packetLossPercent}% loss</span>
                    <span>·</span>
                    <span>{net.downloadKbps} kbps</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Parameters Workbench */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">
                  Fine-Tune Impairment Parameters
                </h3>
                <button
                  onClick={() => handleSelectNetwork(selectedNetwork)}
                  className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Preset Defaults</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Adjust synthetic latency, jitter, packet drop rates, and bandwidth limits to model specific rural/transit routes.
              </p>
            </div>

            <div className="space-y-5">
              {/* Latency Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Round-Trip Latency (RTT)</span>
                  <span className="font-mono font-bold text-indigo-600 tabular-nums">{customLatency} ms</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={customLatency}
                  onChange={(e) => setCustomLatency(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>20ms (Bangalore Fiber)</span>
                  <span>650ms (Tier-2 Peak)</span>
                  <span>2000ms (Severe Congestion)</span>
                </div>
              </div>

              {/* Packet Loss Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Packet Loss Rate</span>
                  <span className="font-mono font-bold text-rose-600 tabular-nums">{customPacketLoss}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={customPacketLoss}
                  onChange={(e) => setCustomPacketLoss(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0% (Ideal)</span>
                  <span>12% (Typical 3G/4G Cell Jam)</span>
                  <span>50% (Train Fading / Chawl)</span>
                </div>
              </div>

              {/* Bandwidth Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Downlink Bandwidth Throttle</span>
                  <span className="font-mono font-bold text-amber-600 tabular-nums">
                    {customBandwidth >= 1000 ? `${(customBandwidth / 1000).toFixed(1)} Mbps` : `${customBandwidth} kbps`}
                  </span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="50000"
                  step="32"
                  value={customBandwidth}
                  onChange={(e) => setCustomBandwidth(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>32 kbps (2G Edge)</span>
                  <span>340 kbps (Budget 4G)</span>
                  <span>50 Mbps (5G)</span>
                </div>
              </div>

              {/* Client Socket Timeout */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Client HTTP Socket Timeout</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{customTimeout} seconds</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={customTimeout}
                  onChange={(e) => setCustomTimeout(Number(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  NPCI recommends a minimum 30s timeout window for UPI payments on Indian networks.
                </p>
              </div>
            </div>

            {/* Impact Projection Callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                <span>Simulated Indian Real-World Outcome</span>
              </p>
              <p className="text-slate-600 leading-relaxed">
                Under {customLatency}ms latency and {customPacketLoss}% packet drop, average grocery app checkout roundtrip increases from 1.2s to 14.8s. Webhooks configured with &lt;15s timeout will experience frequent 504 drops.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB B: Device Conditions */}
      {activeTab === 'device' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Device List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Top Indian Handsets by Market Share
            </h3>
            <div className="space-y-2">
              {deviceProfiles.map((dev) => (
                <button
                  key={dev.id}
                  onClick={() => handleSelectDevice(dev)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedDevice.id === dev.id
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{dev.name}</span>
                    <span className="font-mono text-[11px] font-semibold text-indigo-600">
                      {dev.marketShareInIndiaPercent}% India Share
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {dev.brand} · {dev.soc}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-600">
                    <span>{dev.ramGb}GB RAM ({dev.osVersion})</span>
                    <span>{dev.viewportWidthPx}px width</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Device Profile Configuration */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Hardware Virtualization & OEM Killer Simulation
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Indian sub-₹10,000 devices feature custom vendor battery savers (MIUI, ColorOS, FunTouch) that terminate background apps within 5 seconds of task switching.
              </p>
            </div>

            <div className="space-y-4">
              {/* OEM Killer Toggle */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Aggressive OEM Process Killer (MIUI / ColorOS)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 max-w-md">
                    Issues SIGKILL to background activity during SMS OTP intent switch or UPI external authorization.
                  </p>
                </div>
                <button
                  onClick={() => setCustomOemKiller(!customOemKiller)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    customOemKiller ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      customOemKiller ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Thermal Throttling Toggle */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Thermal Throttling (38°C Summer Ambient)
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 max-w-md">
                    Clamps CPU clock speed by 35% after 2 minutes of continuous catalog rendering to prevent overheating.
                  </p>
                </div>
                <button
                  onClick={() => setThermalThrottling(!thermalThrottling)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    thermalThrottling ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      thermalThrottling ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Android System Font Scaling */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">System Accessibility Font Scaling</span>
                  <span className="font-mono font-bold text-indigo-600 tabular-nums">
                    {customFontScale.toFixed(2)}x ({(customFontScale * 100).toFixed(0)}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="1.5"
                  step="0.05"
                  value={customFontScale}
                  onChange={(e) => setCustomFontScale(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500">
                  42% of Indian smartphone users over 35 years old increase system font scale to 1.2x - 1.3x.
                </p>
              </div>
            </div>

            {/* Spec Sheet Overview */}
            <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200/60 text-xs space-y-2">
              <h4 className="font-bold text-indigo-950">Active Virtual Device Specifications</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-700">
                <div>
                  <span className="text-[10px] text-slate-400 block">Available RAM</span>
                  <span className="font-mono font-semibold">{selectedDevice.ramGb} GB LPDDR4x</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Viewport Width</span>
                  <span className="font-mono font-semibold">{selectedDevice.viewportWidthPx} px</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Chipset</span>
                  <span className="font-mono font-semibold">{selectedDevice.soc}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">OS Runtime</span>
                  <span className="font-mono font-semibold">{selectedDevice.osVersion}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB C: Indic Vernacular & UI Overflow Workbench */}
      {activeTab === 'vernacular' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Locales Selector */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Indic Language Scripts
            </h3>
            <div className="space-y-2">
              {localeProfiles.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocale(loc);
                    setVernacularTestString(loc.sampleText);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                    selectedLocale.id === loc.id
                      ? 'border-indigo-600 bg-indigo-50/40 ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{loc.name}</span>
                    <span className="font-mono text-[11px] font-semibold text-rose-600">
                      +{loc.expansionFactor}% Length
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {loc.nativeScript} ({loc.languageCode})
                  </p>
                  <p className="text-xs text-slate-700 mt-2 font-medium truncate">
                    {loc.sampleText}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Overflow Simulator */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Interactive Indic Text Clipping & Expansion Sandbox
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Test how Indic scripts (with complex syllabic conjuncts) behave when placed in rigid buttons or bottom sheets on narrow 320px - 360px viewports.
              </p>
            </div>

            {/* Test String Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Test Translation String ({selectedLocale.name})
              </label>
              <input
                type="text"
                value={vernacularTestString}
                onChange={(e) => setVernacularTestString(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Button Width Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Target Container Width</span>
                <span className="font-mono font-bold text-indigo-600 tabular-nums">{buttonWidthPx} px</span>
              </div>
              <input
                type="range"
                min="120"
                max="360"
                step="10"
                value={buttonWidthPx}
                onChange={(e) => setButtonWidthPx(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>120px (Rigid Sticky CTA)</span>
                <span>240px (Half Sheet)</span>
                <span>360px (Full Width Redmi 9A)</span>
              </div>
            </div>

            {/* Live Interactive Rendering Comparison */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Live Viewport Render (Width: {buttonWidthPx}px)
              </h4>

              {/* Rendering with rigid overflow */}
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-medium">
                  Standard Fixed-Height CTA (h-10 truncate):
                </span>
                <div
                  style={{ width: `${buttonWidthPx}px` }}
                  className="h-10 bg-indigo-600 text-white rounded-lg flex items-center justify-center px-3 text-xs font-semibold shadow-sm transition-all overflow-hidden"
                >
                  <span className="truncate">{vernacularTestString}</span>
                </div>
                {vernacularTestString.length > 25 && buttonWidthPx < 220 && (
                  <p className="text-[11px] text-rose-600 font-mono mt-1">
                    ⚠ Truncation detected: User cannot read crucial verb in {selectedLocale.name}!
                  </p>
                )}
              </div>

              {/* Responsive Wrap Layout (Bharat Recommended) */}
              <div className="space-y-1 pt-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  BharatTest Resilient Layout (auto-wrap min-h-11):
                </span>
                <div
                  style={{ width: `${buttonWidthPx}px` }}
                  className="min-h-[44px] py-2 px-3 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xs font-semibold shadow-sm transition-all text-center leading-snug"
                >
                  <span>{vernacularTestString}</span>
                </div>
                <p className="text-[11px] text-emerald-700 font-mono mt-1">
                  ✓ Preserves complete text across font sizes with WCAG min touch target (44px).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB D: Network Simulation Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Network Impairment Simulation Timeline (0s - 45s Scenario)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Models dynamic connectivity swings during an authentic Indian train commute or elevator ride.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingTimeline(!isPlayingTimeline)}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPlayingTimeline ? 'Pause Scrub' : 'Play Timeline'}</span>
              </button>
              <button
                onClick={() => setTimelineSecond(0)}
                className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Timeline Bar with Scrubber */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>0s: Checkout Start</span>
              <span className="font-bold text-indigo-600">Current: {timelineSecond}s</span>
              <span>45s: Complete</span>
            </div>

            <input
              type="range"
              min="0"
              max="45"
              value={timelineSecond}
              onChange={(e) => setTimelineSecond(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Timeline Milestones Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {timelineEvents.map((evt) => {
              const isPastOrActive = timelineSecond >= evt.sec;
              const isCurrent = timelineSecond >= evt.sec && timelineSecond < evt.sec + 8;
              return (
                <div
                  key={evt.sec}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-500/20'
                      : isPastOrActive
                      ? 'border-slate-300 bg-slate-50 text-slate-700'
                      : 'border-slate-200 bg-white opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-slate-900">{evt.sec}s Mark</span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-semibold text-indigo-600 uppercase">
                        Current Stage
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{evt.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{evt.state}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
