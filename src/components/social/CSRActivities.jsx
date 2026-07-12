import React from 'react';
import { csrActivities } from '../../data/mockData';
import StatusPill from '../shared/StatusPill';

const CATEGORY_DOT = {
  Environment: '#16a34a',
  Education:   '#2563eb',
  Health:      '#dc2626',
  Diversity:   '#7c3aed',
  Community:   '#d97706',
};

export default function CSRActivities() {
  return (
    <div className="card">
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>CSR Activities</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{csrActivities.length} activities this quarter</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Activity', 'Category', 'Points', 'Status'].map(h => (
                <th
                  key={h}
                  className={`py-3 text-xs font-medium ${h === 'Points' || h === 'Status' ? 'text-center px-4' : 'text-left px-6'}`}
                  style={{ color: '#9ca3af', letterSpacing: '0.04em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csrActivities.map((a, i) => (
              <tr
                key={a.id}
                className="tr-hover"
                style={{ borderBottom: i < csrActivities.length - 1 ? '1px solid #f9fafb' : 'none' }}
              >
                <td className="px-6 py-3 font-medium text-sm" style={{ color: '#111827' }}>{a.name}</td>
                <td className="px-6 py-3">
                  <span className="flex items-center gap-2 text-sm" style={{ color: '#6b7280' }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: CATEGORY_DOT[a.category] || '#9ca3af' }}
                    />
                    {a.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="text-sm font-medium" style={{ color: '#16a34a' }}>+{a.points}</span>
                </td>
                <td className="px-4 py-3 text-center"><StatusPill status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
