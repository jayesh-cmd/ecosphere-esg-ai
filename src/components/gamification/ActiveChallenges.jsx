import React, { useState } from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import StatusPill from '../shared/StatusPill';

const DIFF_STYLE = {
  Easy:   { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  Medium: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
  Hard:   { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
};

export default function ActiveChallenges() {
  const { activeChallenges: initialChallenges } = useGlobalState();
  const [challenges, setChallenges] = useState(initialChallenges);

  const toggleJoin = id => {
    setChallenges(prev =>
      prev.map(c => {
        if (c.id !== id || c.status === 'Completed') return c;
        if (c.joined) return { ...c, status: 'Completed' };
        return { ...c, joined: true };
      })
    );
  };

  return (
    <div className="card">
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Active Challenges</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
          {challenges.filter(c => c.status === 'Active').length} ongoing challenges
        </p>
      </div>

      <div>
        {challenges.map((c, i) => {
          const diff = DIFF_STYLE[c.difficulty] || DIFF_STYLE.Easy;
          return (
            <div
              key={c.id}
              className="px-6 py-4 flex items-center gap-4 tr-hover"
              style={{ borderBottom: i < challenges.length - 1 ? '1px solid #f9fafb' : 'none' }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-medium" style={{ color: c.status === 'Completed' ? '#9ca3af' : '#111827' }}>
                    {c.title}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
                  >
                    {c.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium" style={{ color: '#16a34a' }}>+{c.xpReward} XP</span>
                  <StatusPill status={c.status} />
                </div>
              </div>

              <button
                onClick={() => toggleJoin(c.id)}
                disabled={c.status === 'Completed'}
                className="shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-lg disabled:cursor-default"
                style={
                  c.status === 'Completed'
                    ? { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }
                    : c.joined
                    ? { background: '#111827', color: '#ffffff', border: 'none' }
                    : { background: '#ffffff', color: '#374151', border: '1px solid #e5e7eb' }
                }
              >
                {c.status === 'Completed' ? '✓ Done' : c.joined ? 'Mark complete' : 'Join'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
