import React from 'react';
import Leaderboard from '../components/gamification/Leaderboard';
import ActiveChallenges from '../components/gamification/ActiveChallenges';
import BadgesShowcase from '../components/gamification/BadgesShowcase';
import RewardsCatalog from '../components/gamification/RewardsCatalog';

function KpiCard({ label, value, sub, valueColor }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium" style={{ color: '#9ca3af', letterSpacing: '0.04em' }}>
        {label.toUpperCase()}
      </p>
      <p className="text-2xl font-semibold mt-1.5" style={{ color: valueColor || '#111827' }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>{sub}</p>
    </div>
  );
}

export default function GamificationPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Total players"     value="847"   sub="Active this month"       />
        <KpiCard label="XP distributed"   value="2.1M"  sub="Across all employees"    valueColor="#16a34a" />
        <KpiCard label="Badges unlocked"  value="4,230" sub="Across all employees"    />
        <KpiCard label="Rewards redeemed" value="312"   sub="This quarter"            />
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <Leaderboard />
        </div>
        <div className="col-span-2">
          <ActiveChallenges />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <BadgesShowcase />
        <RewardsCatalog />
      </div>
    </div>
  );
}
