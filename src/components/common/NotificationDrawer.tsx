import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, WifiOff, Smartphone, Clock } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFailure: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToFailure,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Critical Regression in Production Run #9021',
      description: 'UPI Intent App Switch killed by Xiaomi MIUI on 2GB RAM budget phones. Estimated ~2.42M users affected.',
      time: '12 mins ago',
      type: 'critical',
    },
    {
      id: 'n2',
      title: 'Vernacular Translation Alert',
      description: 'Tamil text overflow detected on 360px viewport causing "Proceed to Pay" button to clip offscreen.',
      time: '2 hours ago',
      type: 'warning',
    },
    {
      id: 'n3',
      title: 'NPCI Bank Switch Timeout Resolved',
      description: 'Soundbox reconciler backoff fix verified under 3G congested cell simulator.',
      time: 'Yesterday',
      type: 'success',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Notifications & Alerts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onNavigateToFailure();
                onClose();
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    n.type === 'critical'
                      ? 'bg-rose-100 text-rose-700'
                      : n.type === 'warning'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {n.type.toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400">{n.time}</span>
              </div>
              <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">{n.description}</p>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
          <span className="text-[11px] text-slate-500 font-mono">
            Synced with Mumbai & Hyderabad Edge Runners
          </span>
        </div>
      </div>
    </div>
  );
};
