import React from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import ScoreCard from '../components/shared/ScoreCard';
import ScoreTrendChart from '../components/dashboard/ScoreTrendChart';
import DepartmentTable from '../components/dashboard/DepartmentTable';
import AISummaryCard from '../components/dashboard/AISummaryCard';
import { Leaf, Users, Shield, BarChart3 } from 'lucide-react';

const CARDS = [
  { label: 'Environmental', key: 'environmental', icon: Leaf,      trend: +13, accentColor: '#16a34a' },
  { label: 'Social',        key: 'social',        icon: Users,     trend: +15, accentColor: '#2563eb' },
  { label: 'Governance',    key: 'governance',    icon: Shield,    trend: +12, accentColor: '#7c3aed' },
  { label: 'Overall ESG',   key: 'overall',       icon: BarChart3, trend: +13, accentColor: '#374151' },
];

export default function DashboardPage() {
  const { esgScores } = useGlobalState();
  return (
    <div className="space-y-6">
      {/* Score cards */}
      <div className="grid grid-cols-4 gap-4">
        {CARDS.map(c => (
          <ScoreCard
            key={c.key}
            label={c.label}
            score={esgScores[c.key]}
            icon={c.icon}
            trend={c.trend}
            accentColor={c.accentColor}
          />
        ))}
      </div>

      {/* Chart + AI chat */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <ScoreTrendChart />
        </div>
        <div className="col-span-2">
          <AISummaryCard />
        </div>
      </div>

      {/* Rankings */}
      <DepartmentTable />
    </div>
  );
}
