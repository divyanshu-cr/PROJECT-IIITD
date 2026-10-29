import React from 'react';
import { X, HelpCircle, BookOpen, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface HelpDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpDocModal: React.FC<HelpDocModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Bharat Reliability Engineering Handbook
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">
              1. The 2GB RAM / MIUI Process Killer Challenge
            </h4>
            <p>
              Over 39% of active smartphones in Tier 2 and Tier 3 Indian towns feature 2GB to 3GB RAM. Heavy OEM skins (Xiaomi MIUI, Realme UI, Vivo FunTouch OS) enforce aggressive background task management. When an app delegates payment to PhonePe, Google Pay, or Paytm via an Android Intent, the parent app process is frequently terminated with SIGKILL if system free memory drops below 180MB.
            </p>
            <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900">
              <strong>Rule:</strong> Never store active checkout tokens or shopping carts solely in in-memory singletons or view models. Always commit order IDs to persistent Room or EncryptedSharedPreferences prior to launching external intents.
            </div>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">
              2. NPCI UPI Gateway SLA & Network Jitter
            </h4>
            <p>
              While urban Wi-Fi achieves sub-2-second UPI confirmations, congested cell towers during evening peak retail hours (7 PM to 10 PM) experience round-trip latencies of 650ms–1400ms. Banking switch ACKs can take up to 28 seconds.
            </p>
            <div className="p-2.5 rounded bg-indigo-50 border border-indigo-200 text-indigo-900">
              <strong>Recommendation:</strong> Configure client timeouts to a minimum of 35 seconds with exponential backoff polling, and provide optimistic "Checking with Bank Switch..." states rather than immediate failure alerts.
            </div>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">
              3. Indic Vernacular Character Expansion Math
            </h4>
            <p>
              Translations in Tamil (தமிழ்), Telugu (తెలుగు), and Bengali (বাংলা) require significantly more horizontal space than English due to syllabic conjunct ligatures. In Tamil, strings average +48% greater length. On standard 360px width budget screens with 1.25x accessibility scaling, rigid button widths will truncate verbs and push critical payment CTAs below the fold.
            </p>
          </section>
        </div>

        <div className="px-6 py-3 border-t border-slate-200 flex justify-end bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
