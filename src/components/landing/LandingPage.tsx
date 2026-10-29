import React from 'react';
import {
  ArrowRight,
  ShieldAlert,
  Smartphone,
  WifiOff,
  Languages,
  CreditCard,
  Cpu,
  Layers,
  CheckCircle2,
  Terminal,
  ExternalLink,
  Zap,
  Lock,
  Compass,
} from 'lucide-react';

interface LandingPageProps {
  onStartTesting: () => void;
  onExploreDemo: () => void;
  onOpenConditionsLab: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartTesting,
  onExploreDemo,
  onOpenConditionsLab,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Top Bar for Landing Page */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow">
            भ
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">BharatTest</span>
          <span className="text-xs text-slate-500 hidden sm:inline-block">· Test for India. Fix what matters.</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#problem" className="hover:text-indigo-600 transition-colors">The India Blindspot</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
          <a href="#testing-matrix" className="hover:text-indigo-600 transition-colors">Testing Matrix</a>
          <a href="#integrations" className="hover:text-indigo-600 transition-colors">Integrations</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onExploreDemo}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Explore Demo
          </button>
          <button
            onClick={onStartTesting}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>Start Testing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span>Built for developers building for the Next 500M Indian Users</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 text-balance leading-tight">
            Your app works in testing.{' '}
            <span className="text-indigo-600">Will it work across India?</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            Discover the failures that emerge on real devices, unreliable networks, regional language settings, and everyday Indian usage patterns. Prioritize every issue by the users it affects.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartTesting}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-semibold shadow-md transition-all flex items-center gap-2"
            >
              <span>Start Testing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreDemo}
              className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <span>Explore Live Demo (KiranaQuick)</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-3">
            <span>Zero SDK overhead</span>
            <span>·</span>
            <span>Simulates 2GB RAM & 3G Congestion</span>
            <span>·</span>
            <span>Actionable Code Diff Fixes</span>
          </div>
        </div>

        {/* Dashboard Preview Frame */}
        <div className="mt-14 rounded-2xl border border-slate-200/80 bg-slate-900 shadow-2xl overflow-hidden p-2 sm:p-3">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-slate-400">BharatTest Observability Engine · Session #9021</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400">Simulating: Jio 4G Tier 2 Congestion (650ms Latency)</span>
          </div>

          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950">
            <img
              src="/src/assets/images/bharattest_hero_preview_1793257659113.jpg"
              alt="BharatTest Indian App Reliability Platform Dashboard"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-4 max-w-xl shadow-lg backdrop-blur text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-rose-400 font-semibold uppercase">Critical Indian Failure Detected</span>
                  <span className="text-xs font-mono text-amber-300">Affects ~2,420,000 Users</span>
                </div>
                <h2 className="text-white font-semibold text-sm mt-1">
                  UPI Intent Switch SIGKILL on Xiaomi MIUI (2GB RAM Budget Tier)
                </h2>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Aggressive OEM RAM cleaner terminates parent app during GPay/PhonePe authorization, dropping the session upon return.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={onExploreDemo}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                  >
                    View Root Cause & Code Fix <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section: Why Conventional Testing Fails in India */}
      <section id="problem" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider">The India Blindspot</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Why tests pass in Bangalore offices but break in Kanpur, Madurai, and Patna.
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Standard automated tests run on M3 MacBooks, high-speed Wi-Fi, and 8GB pixel emulators. But 78% of your real Indian users operate in entirely different conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900">Low-Memory & Aggressive OEM Killers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Budget phones (Redmi 9A, Realme C31) have 2GB RAM. MIUI & ColorOS aggressively terminate background processes during OTP SMS or UPI app switching.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900">3G & Congested Cell Fading</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Evening cell tower congestion, train transit signal blindspots, and basement elevators cause 8–15s socket stalls that trigger premature client timeouts.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900">Indic Font Expansion & Truncation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tamil and Telugu translations are 40% to 50% longer than English. On 360px screens with accessibility font scaling, primary checkout CTAs clip offscreen.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900">NPCI UPI Gateway Latency Spikes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                During festive sales and peak dinner rush, bank switches take up to 25s. Apps with rigid 10s timeouts mark transactions "Failed" while user accounts are debited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (3 Steps) */}
      <section id="how-it-works" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
            A 3-step harness for real-world Indian reliability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">Connect Your App</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your Android APK/AAB or connect a live Web URL / staging endpoint. No proprietary SDK installation or invasive code instrumentation required.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
              $ npx bharattest connect --url https://staging.app.in
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">Run India-Specific Tests</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Execute battle-tested scenarios across real network profiles (Jio 4G congested, IRCTC transit), 2GB RAM budget device virtualizations, and Indic scripts.
            </p>
            <div className="pt-2 text-[11px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
              Profiles: 650ms Latency · 12% Loss · 360px Viewport
            </div>
          </div>

          <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">Fix Highest-Impact Failures</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              View prioritized bugs ranked by estimated affected Indian users. Copy drop-in code fixes, inspect HAR traces, and verify resolution in one click.
            </p>
            <div className="pt-2 text-[11px] font-mono text-emerald-600 bg-emerald-50 p-2.5 rounded border border-emerald-100">
              Priority #1: Affects 2,420,000 users (42.6% share)
            </div>
          </div>
        </div>
      </section>

      {/* India Testing Matrix */}
      <section id="testing-matrix" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">The India Matrix</span>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-2">
                Simulate the real conditions of Bharat
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                Covering telecom carriers, budget hardware, vernacular scripts, and payment gateway anomalies across Tier 1, 2, and 3 geographies.
              </p>
            </div>
            <button
              onClick={onOpenConditionsLab}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>Explore India Conditions Lab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-sky-400" />
                <span>Telecom Impairment</span>
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Jio 4G Tier 2 Evening Peak</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> IRCTC Train Moving Fades</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Airtel 3G Indoor Chawl Shadow</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Basement Lift Signal Dropouts</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Device Virtualization</span>
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Xiaomi Redmi 9A (2GB RAM)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> JioPhone Next (Pragati OS)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Samsung Galaxy M12 (One UI Core)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Aggressive MIUI Battery Saver</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Languages className="w-4 h-4 text-amber-400" />
                <span>Vernacular Localization</span>
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Hindi (देवनागरी) +32% Expansion</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Tamil (தமிழ்) +48% Glyph Stack</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Telugu (తెలుగు) +42% Length</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Indian Lakhs/Crores Formats</li>
              </ul>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 p-5 rounded-xl space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Payment & Auth Edge Cases</span>
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> UPI App Switch Intent Kill</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> NPCI Webhook Socket Delay</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> DigiLocker Webview OOM Crash</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> SMS OTP Auto-read Intent Race</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations & Supported App Types */}
      <section id="integrations" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs font-mono font-semibold text-indigo-600 uppercase tracking-wider">Ecosystem</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mt-2">
            Seamless integration with your existing dev stack
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Plug BharatTest into GitHub Actions, GitLab CI, Bitrise, or your local terminal to catch regressions before they reach the Play Store or web production.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-sm font-bold text-slate-800">Native Android</span>
            <p className="text-[11px] text-slate-500 mt-1">APK, AAB (Kotlin, Java)</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-sm font-bold text-slate-800">React Native & Flutter</span>
            <p className="text-[11px] text-slate-500 mt-1">Cross-platform bundles</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-sm font-bold text-slate-800">Modern Web & PWA</span>
            <p className="text-[11px] text-slate-500 mt-1">Next.js, Vite, React</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white text-center">
            <span className="text-sm font-bold text-slate-800">Fintech APIs</span>
            <p className="text-[11px] text-slate-500 mt-1">REST, Webhooks, gRPC</p>
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="py-16 bg-slate-100 border-t border-slate-200 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Enterprise Security & Indian Data Residency</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                All virtual test runs execute in isolated, sandboxed containers hosted in Mumbai & Hyderabad cloud regions. We never retain customer credentials, UPI tokens, or PII.
              </p>
            </div>
          </div>
          <button
            onClick={onStartTesting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            Launch BharatTest Console
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white px-6 lg:px-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">BharatTest</span>
            <span>· Test for India. Fix what matters.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onExploreDemo} className="hover:text-slate-900 transition-colors">Demo App</button>
            <button onClick={onOpenConditionsLab} className="hover:text-slate-900 transition-colors">Conditions Lab</button>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">Documentation</a>
            <span>© 2026 BharatTest Labs India.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
