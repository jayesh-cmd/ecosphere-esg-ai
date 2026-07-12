import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, TrendingUp, AlertTriangle, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { useGlobalState } from '../../context/GlobalStateContext';

const PAGE_TITLES = {
  dashboard:     { title: 'Dashboard',         subtitle: 'ESG performance overview'                    },
  environmental: { title: 'Environmental',     subtitle: 'Carbon tracking & sustainability goals'       },
  social:        { title: 'Social Impact',     subtitle: 'CSR activities & employee participation'     },
  governance:    { title: 'Governance',        subtitle: 'Compliance & policy management'               },
  gamification:  { title: 'Gamification',      subtitle: 'Challenges, leaderboard & rewards'           },
  reports:       { title: 'Reports',           subtitle: 'Generate and export custom ESG reports'      },
  settings:      { title: 'Settings',          subtitle: 'Manage app configuration and parameters'     },
};

const MOCK_NOTIFICATIONS = [
  { id: 1, icon: AlertTriangle, color: '#dc2626', bg: '#fef2f2', border: '#fecaca', time: '10m ago', text: 'New compliance issue raised in Logistics' },
  { id: 2, icon: CheckCircle2,  color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', time: '1h ago',  text: 'CSR participation approved for Priya Sharma' },
  { id: 3, icon: AlertCircle,   color: '#d97706', bg: '#fffbeb', border: '#fde68a', time: '3h ago',  text: 'Policy acknowledgement reminder — 3 employees pending' },
  { id: 4, icon: Award,         color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', time: '5h ago',  text: "Badge unlocked: Vikram Singh earned 'Eco Warrior'" },
];

export default function Header({ activeTab }) {
  const { esgScores } = useGlobalState();
  const overallScore = esgScores.overall;
  const { title, subtitle } = PAGE_TITLES[activeTab] || PAGE_TITLES.dashboard;
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setHasUnread(false);
  };

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

      <div className="flex items-center gap-3 relative">
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleBellClick}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
            style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
          >
            <Bell size={15} strokeWidth={1.5} style={{ color: '#6b7280' }} />
            {hasUnread && (
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                style={{ background: '#ef4444' }}
              />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div 
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border overflow-hidden z-20"
              style={{ borderColor: '#e5e7eb' }}
            >
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {MOCK_NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 flex gap-3 items-start transition-colors cursor-pointer last:border-0">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: notif.bg, color: notif.color, border: `1px solid ${notif.border}` }}
                    >
                      <notif.icon size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 leading-snug">{notif.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

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
