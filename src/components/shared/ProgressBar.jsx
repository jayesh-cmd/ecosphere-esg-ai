import React from 'react';

export default function ProgressBar({ value, max = 100, label, showValue = true, color }) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = color || (pct >= 70 ? '#16a34a' : pct >= 45 ? '#d97706' : '#dc2626');

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm" style={{ color: '#374151' }}>{label}</span>}
          {showValue && (
            <span className="text-xs font-medium" style={{ color: '#6b7280' }}>{value}%</span>
          )}
        </div>
      )}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#f3f4f6' }}>
        <div
          className="h-full rounded-full bar-animate"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>
    </div>
  );
}
