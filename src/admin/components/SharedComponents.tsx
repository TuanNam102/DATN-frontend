import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <div
      className={[
        'bg-white/55 backdrop-blur-lg border border-white/60',
        'shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'purple' | 'blue' | 'green' | 'amber' | 'slate' | 'red';
}

export const Badge = ({ children, tone = 'purple' }: BadgeProps) => {
  const toneClasses =
    tone === 'purple'
      ? 'bg-[#D56844]/15 text-[#D56844] border-[#D56844]/25'
      : tone === 'blue'
        ? 'bg-blue-500/15 text-blue-700 border-blue-400/25'
        : tone === 'green'
          ? 'bg-emerald-500/15 text-emerald-700 border-emerald-400/25'
          : tone === 'amber'
            ? 'bg-amber-500/15 text-amber-800 border-amber-400/25'
            : tone === 'red'
              ? 'bg-red-500/15 text-red-700 border-red-400/25'
              : 'bg-slate-500/10 text-slate-700 border-slate-400/25';

  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold',
        'backdrop-blur-md',
        toneClasses,
      ].join(' ')}
    >
      {children}
    </span>
  );
};

interface IconPillProps {
  icon: React.ElementType;
  tone?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
}

export const IconPill = ({ icon, tone = 'purple' }: IconPillProps) => {
  const Icon = icon;
  const toneClasses =
    tone === 'purple'
      ? 'bg-[#D56844]/12 text-[#D56844] border-[#D56844]/25'
      : tone === 'blue'
        ? 'bg-blue-600/12 text-blue-700 border-blue-400/25'
        : tone === 'green'
          ? 'bg-emerald-600/12 text-emerald-700 border-emerald-400/25'
          : tone === 'amber'
            ? 'bg-amber-600/12 text-amber-700 border-amber-400/25'
            : 'bg-red-600/12 text-red-700 border-red-400/25';
  return (
    <span className={['h-10 w-10 rounded-xl border flex items-center justify-center', toneClasses].join(' ')}>
      <Icon className="h-5 w-5" />
    </span>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  tone?: 'purple' | 'blue' | 'green' | 'amber' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, icon: Icon, tone, trend }: StatCardProps) => {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-600">{title}</div>
          <div className="mt-2 text-3xl font-bold text-slate-900">{value}</div>
          {trend && (
            <div className={`mt-2 flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
        <IconPill icon={Icon} tone={tone} />
      </div>
    </GlassCard>
  );
};

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarItem = ({ icon, label, active = false, onClick }: SidebarItemProps) => {
  const Icon = icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full h-11 rounded-xl px-3 flex items-center gap-2.5 text-sm font-medium transition-all duration-200 ease-out',
        active
          ? 'bg-[#D56844] text-white shadow-lg'
          : 'text-[#555555] hover:bg-[rgba(213,104,68,0.08)] hover:text-[#D56844]'
      ].join(' ')}
    >
      <Icon className={['h-5 w-5', active ? 'text-white' : 'text-[#888888]'].join(' ')} />
      <span className="truncate">{label}</span>
    </button>
  );
};
