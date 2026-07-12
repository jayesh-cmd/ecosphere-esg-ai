import React from 'react';

/**
 * Flat score card — big number, label, thin progress bar.
 * No rings, no gradients, no glow. Single accent color for positive.
 */
export default function ScoreCard({ label, score, icon: Icon, trend, accentColor }) {
  const grade =
    score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' :
    score >= 60 ? 'B' : 'C';

  const gradeColor =
    score >= 80 ? '#16a34a' : score >= 65 ? '#d97706' : '#dc2626';

  const barColor =
    score >= 80 ? '#16a34a' : score >= 65 ? '#d97706' : '#dc2626';

  return (
    <div
      className="card card-hover p-5 flex flex-col gap-4"
      style={accentColor ? { borderLeft: `3px solid ${accentColor}` } : {}}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium" style={{ color: '#9ca3af', letterSpacing: '0.04em' }}>
            {label.toUpperCase()}
          </p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-4xl font-semibold tracking-tight" style={{ color: '#111827' }}>
              {score}
            </span>
            <span className="text-sm" style={{ color: '#9ca3af' }}>/100</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          {Icon && (
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
            >
              <Icon size={15} strokeWidth={1.5} style={{ color: '#6b7280' }} />
            </div>
          )}
          <span className="text-xs font-semibold" style={{ color: gradeColor }}>
            Grade {grade}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div
          className="h-1 rounded-full overflow-hidden"
          style={{ background: '#f3f4f6' }}
        >
          <div
            className="h-full rounded-full bar-animate"
            style={{ width: `${score}%`, background: barColor }}
          />
        </div>
        {trend !== undefined && (
          <p className="text-xs mt-1.5" style={{ color: '#9ca3af' }}>
            {trend >= 0
              ? <span style={{ color: '#16a34a' }}>↑ +{trend} pts this quarter</span>
              : <span style={{ color: '#dc2626' }}>↓ {trend} pts this quarter</span>
            }
          </p>
        )}
      </div>
    </div>
  );
}
