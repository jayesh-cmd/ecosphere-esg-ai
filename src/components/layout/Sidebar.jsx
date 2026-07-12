import React from 'react';
import {
  BarChart3, Leaf, Users, Shield, Trophy, ChevronRight, FileText, Settings
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',     label: 'Dashboard',    icon: BarChart3 },
  { id: 'environmental', label: 'Environmental', icon: Leaf      },
  { id: 'social',        label: 'Social',        icon: Users     },
  { id: 'governance',    label: 'Governance',    icon: Shield    },
  { id: 'gamification',  label: 'Gamification',  icon: Trophy    },
  { id: 'reports',       label: 'Reports',       icon: FileText  },
  { id: 'settings',      label: 'Settings',      icon: Settings  },
];

export default function Sidebar({ activeTab, onTabChange }) {
  return (
    <aside
      style={{ borderRight: '1px solid #e5e7eb' }}
      className="w-56 min-h-screen bg-white flex flex-col shrink-0"
    >
      {/* Wordmark */}
      <div
        className="px-5 py-5"
        style={{ borderBottom: '1px solid #e5e7eb' }}
      >
        <p className="font-semibold text-sm" style={{ color: '#111827' }}>EcoSphere</p>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>ESG Platform</p>
      </div>


      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-xs font-medium px-2 mb-3" style={{ color: '#9ca3af', letterSpacing: '0.05em' }}>
          MENU
        </p>
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm font-medium text-left"
              style={{
                background: isActive ? '#f0fdf4' : 'transparent',
                color: isActive ? '#15803d' : '#6b7280',
              }}
            >
              <Icon
                size={15}
                strokeWidth={isActive ? 2 : 1.5}
                color={isActive ? '#16a34a' : '#9ca3af'}
              />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={13} color="#16a34a" strokeWidth={1.5} />}
            </button>
          );
        })}
      </nav>

      {/* Status indicator */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid #e5e7eb' }}>
        <div className="flex items-center gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full pulse-dot"
            style={{ background: '#16a34a' }}
          />
          <span className="text-xs" style={{ color: '#6b7280' }}>Live sync active</span>
        </div>
      </div>
    </aside>
  );
}
