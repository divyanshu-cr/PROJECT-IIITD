import React, { useState } from 'react';
import {
  Users2,
  TrendingDown,
  DollarSign,
  ShieldCheck,
  Smartphone,
  Wifi,
  MapPin,
  Languages,
  Sparkles,
} from 'lucide-react';
import { indiaDemographics } from '../../data/mockData';
import { FailureItem, Project } from '../../types';

interface ImpactAnalysisViewProps {
  currentProject: Project;
  failures: FailureItem[];
}

export const ImpactAnalysisView: React.FC<ImpactAnalysisViewProps> = ({
  currentProject,
  failures,
}) => {
  // Interactive sliders
  const [activeUsersMau, setActiveUsersMau] = useState<number>(3500000); // 3.5 Million MAU
  const [avgOrderValueInr, setAvgOrderValueInr] = useState<number>(420); // ₹420
  const [checkoutDropRatePercent, setCheckoutDropRatePercent] = useState<number>(8.5); // 8.5%

  // Open failures
  const openFailures = failures.filter(
    (f) => f.projectId === currentProject.id && f.status !== 'verified_resolved'
  );

  // Financial calculations
  const monthlyTransactions = activeUsersMau * 2.8; // 2.8 orders/user/month
  const ordersLostPerMonth = Math.round(monthlyTransactions * (checkoutDropRatePercent / 100));
  const gmvAtRiskInr = ordersLostPerMonth * avgOrderValueInr;
  const gmvAtRiskCrores = (gmvAtRiskInr / 10000000).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-600 uppercase">
              <Users2 className="w-3.5 h-3.5" />
              <span>Impact Analysis · India Demographics & Revenue Risk</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
              Real-World User Exposure Modeling
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed mt-1">
              Translate technical failures (OOM kills, socket drops, font clips) into affected Indian citizens, abandoned checkouts, and financial exposure.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Business Impact Calculator */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Interactive Revenue & Retention Risk Simulator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Adjust your application scale to see estimated revenue leakage from unresolved Indian edge cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: MAU */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Monthly Active Users (MAU)</span>
              <span className="font-mono font-bold text-indigo-600 tabular-nums">
                {(activeUsersMau / 1000000).toFixed(1)} Million
              </span>
            </div>
            <input
              type="range"
              min="100000"
              max="15000000"
              step="100000"
              value={activeUsersMau}
              onChange={(e) => setActiveUsersMau(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>100K (Early Stage)</span>
              <span>3.5M (Growth)</span>
              <span>15M+ (Unicorn)</span>
            </div>
          </div>

          {/* Slider 2: Average Order Value */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Avg Transaction Value (AOV)</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                ₹{avgOrderValueInr}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2500"
              step="50"
              value={avgOrderValueInr}
              onChange={(e) => setAvgOrderValueInr(Number(e.target.value))}
              className="w-full accent-slate-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹50 (Quick Comm)</span>
              <span>₹420 (Grocery/Ride)</span>
              <span>₹2,500 (EdTech/Fin)</span>
            </div>
          </div>

          {/* Slider 3: Drop Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Indian Edge Failure Drop Rate</span>
              <span className="font-mono font-bold text-rose-600 tabular-nums">
                {checkoutDropRatePercent}%
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              step="0.5"
              value={checkoutDropRatePercent}
              onChange={(e) => setCheckoutDropRatePercent(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>2% (Low Impact)</span>
              <span>8.5% (Current KiranaQuick)</span>
              <span>25% (Catastrophic)</span>
            </div>
          </div>
        </div>

        {/* Calculated Financial Risk Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-950">
            <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">
              Estimated Monthly GMV at Risk
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono tabular-nums">
                ₹{gmvAtRiskCrores}
              </span>
              <span className="text-xs font-semibold">Crores / mo</span>
            </div>
            <p className="text-[11px] text-rose-700 mt-1">
              Due to UPI timeouts & 2GB RAM process terminations
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">
              Unfulfilled Orders / Month
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono tabular-nums">
                {(ordersLostPerMonth / 1000).toFixed(0)}K
              </span>
              <span className="text-xs font-semibold">Abandoned</span>
            </div>
            <p className="text-[11px] text-amber-700 mt-1">
              Users who attempted to pay but dropped out
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
              30-Day Retention Upside
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-mono tabular-nums">
                +14.2%
              </span>
              <span className="text-xs font-semibold">Tier 2/3 Towns</span>
            </div>
            <p className="text-[11px] text-emerald-700 mt-1">
              Gained by deploying top recommended code fixes
            </p>
          </div>
        </div>
      </div>

      {/* India Demographics & Market Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Telecom Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wifi className="w-4 h-4 text-sky-600" />
              <span>Indian Telecom Operator Breakdown</span>
            </h3>
            <span className="text-[11px] text-slate-400">TRAI 2026 Data</span>
          </div>

          <div className="space-y-3">
            {indiaDemographics.telecomMarketShare.map((op) => (
              <div key={op.name} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{op.name}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {op.share}% ({op.usersMillion}M Subscribers)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${op.share}%`, backgroundColor: op.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 pt-1">
            Note: Jio & Vi users in non-metro circles experience 3x higher packet loss during 8 PM - 11 PM OTT peaks.
          </p>
        </div>

        {/* City Tier Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>City Tier & Geography Exposure</span>
            </h3>
            <span className="text-[11px] text-slate-400">Total User Base</span>
          </div>

          <div className="space-y-3">
            {indiaDemographics.cityTiers.map((city) => (
              <div key={city.tier} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{city.tier}</span>
                  <span className="font-mono text-indigo-600 tabular-nums">{city.share}% share</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Network Reality: {city.networkQuality}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Device Price Tiers */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-rose-600" />
              <span>Device Price Bands in India</span>
            </h3>
            <span className="text-[11px] text-slate-400">Hardware Tier</span>
          </div>

          <div className="space-y-3">
            {indiaDemographics.devicePriceTiers.map((tier) => (
              <div key={tier.segment} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 text-xs">
                <div className="flex justify-between font-semibold text-slate-900">
                  <span>{tier.segment}</span>
                  <span className="font-mono text-rose-600 tabular-nums">{tier.share}% share</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Constraint Profile: {tier.characteristics}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Indic Language Script Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Languages className="w-4 h-4 text-amber-600" />
              <span>Language Script Breakdown</span>
            </h3>
            <span className="text-[11px] text-slate-400">Vernacular Demand</span>
          </div>

          <div className="space-y-2.5">
            {indiaDemographics.languagePreference.map((lang) => (
              <div key={lang.script} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-800">{lang.script}</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{lang.share}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${lang.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
