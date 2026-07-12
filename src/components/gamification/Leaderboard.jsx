import React from 'react';
import { leaderboard } from '../../data/mockData';

const RANK_MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function Leaderboard() {
  return (
    <div className="card">
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Leaderboard</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Top performers by XP earned</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Rank', 'Employee', 'Department', 'Level', 'Badges', 'XP'].map(h => (
                <th
                  key={h}
                  className={`py-3 text-xs font-medium ${h === 'Rank' || h === 'Employee' || h === 'Department' ? 'text-left px-6' : 'text-center px-4'}`}
                  style={{ color: '#9ca3af', letterSpacing: '0.04em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((p, i) => (
              <tr
                key={p.rank}
                className="tr-hover"
                style={{ borderBottom: i < leaderboard.length - 1 ? '1px solid #f9fafb' : 'none' }}
              >
                <td className="px-6 py-3">
                  <span className="text-base">
                    {RANK_MEDAL[p.rank] || <span className="text-sm font-medium" style={{ color: '#9ca3af' }}>#{p.rank}</span>}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ background: '#f3f4f6', color: '#374151' }}
                    >
                      {p.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-sm" style={{ color: '#111827' }}>{p.employee}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-xs" style={{ color: '#6b7280' }}>{p.department}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded"
                    style={{
                      background: p.level === 'Diamond' ? '#eff6ff' : p.level === 'Platinum' ? '#f9fafb' : p.level === 'Gold' ? '#fefce8' : '#f9fafb',
                      color: p.level === 'Diamond' ? '#1d4ed8' : p.level === 'Platinum' ? '#4b5563' : p.level === 'Gold' ? '#854d0e' : '#6b7280',
                      border: `1px solid ${p.level === 'Diamond' ? '#bfdbfe' : p.level === 'Gold' ? '#fde68a' : '#e5e7eb'}`,
                    }}
                  >
                    {p.level}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-sm" style={{ color: '#374151' }}>{p.badges}</td>
                <td className="px-4 py-3 text-center font-semibold text-sm" style={{ color: '#111827' }}>
                  {p.xp.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
