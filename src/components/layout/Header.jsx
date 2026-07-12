import React from 'react';
import { Bell, Search, TrendingUp } from 'lucide-react';
import { useGlobalState } from '../../context/GlobalStateContext';

const PAGE_TITLES = {
  dashboard:     { title: 'Dashboard',         subtitle: 'ESG performance overview'                    },
  environmental: { title: 'Environmental',     subtitle: 'Carbon tracking & sustainability goals'       },
  social:        { title: 'Social Impact',     subtitle: 'CSR activities & employee participation'     },
  governance:    { title: 'Governance',        subtitle: 'Compliance & policy management'               },
  gamification:  { title: 'Gamification',      subtitle: 'Challenges, leaderboard & rewards'           },
};

export default function Header({ activeTab }) {
  const { esgScores } = useGlobalState();
  const overallScore = esgScores.overall;
  const { title, subtitle } = PAGE_TITLES[activeTab] || PAGE_TITLES.dashboard;

  return (
    <header
      className="bg-white px-8 py-4 flex items-center justify-between sticky top-0 z-10"
      style={{ borderBottom: '1px solid #e5e7eb' }}
    >
      {/* Page title */}
      <div>
        <h1 className="text-base font-semibold" style={{ color: '#111827' }}>{title}</h1>
        <p className="text-sm" style={{ color: '#9ca3af' }}>{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* ESG score chip */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
        >
          <TrendingUp size={12} strokeWidth={2} />
          Overall ESG: {overallScore}/100
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            strokeWidth={1.5}
            style={{ color: '#9ca3af' }}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm rounded-lg pl-8 pr-4 py-1.5 outline-none w-44"
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              color: '#111827',
            }}
          />
        </div>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
        >
          <Bell size={15} strokeWidth={1.5} style={{ color: '#6b7280' }} />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: '#ef4444' }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
        >
          A
        </div>
      </div>
    </header>
  );
}
