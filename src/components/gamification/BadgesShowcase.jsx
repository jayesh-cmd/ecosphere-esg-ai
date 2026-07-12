import React from 'react';
import { badges } from '../../data/mockData';

export default function BadgesShowcase() {
  const unlocked = badges.filter(b => b.unlocked).length;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Badges</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{unlocked} of {badges.length} earned</p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: '#f9fafb', color: '#6b7280', border: '1px solid #e5e7eb' }}
        >
          {badges.length - unlocked} locked
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {badges.map(badge => (
          <div
            key={badge.id}
            title={badge.unlockCondition}
            className="card-hover rounded-lg p-3 text-center cursor-default"
            style={{
              border: '1px solid #e5e7eb',
              background: badge.unlocked ? '#ffffff' : '#f9fafb',
              opacity: badge.unlocked ? 1 : 0.45,
            }}
          >
            <div className="text-2xl mb-1.5" style={{ filter: badge.unlocked ? 'none' : 'grayscale(1)' }}>
              {badge.icon}
            </div>
            <p
              className="text-xs font-medium leading-tight"
              style={{ color: badge.unlocked ? '#111827' : '#9ca3af' }}
            >
              {badge.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
