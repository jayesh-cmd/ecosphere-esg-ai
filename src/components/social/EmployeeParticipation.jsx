import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import StatusPill from '../shared/StatusPill';

export default function EmployeeParticipation() {
  const { employeeParticipation } = useGlobalState();
  const data = [...employeeParticipation].reverse();

  return (
    <div className="card">
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Employee Participation</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{data.length} records</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Employee', 'Activity', 'Status', 'Points'].map(h => (
                <th
                  key={h}
                  className={`py-3 text-xs font-medium ${h === 'Status' || h === 'Points' ? 'text-center px-4' : 'text-left px-6'}`}
                  style={{ color: '#9ca3af', letterSpacing: '0.04em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id}
                className="tr-hover"
                style={{ borderBottom: i < data.length - 1 ? '1px solid #f9fafb' : 'none' }}
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ background: '#f3f4f6', color: '#374151' }}
                    >
                      {row.employee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-sm" style={{ color: '#111827' }}>{row.employee}</span>
                  </div>
                </td>
                <td className="px-6 py-3 text-xs" style={{ color: '#6b7280', maxWidth: 200 }}>
                  {row.activity}
                </td>
                <td className="px-4 py-3 text-center"><StatusPill status={row.status} /></td>
                <td className="px-4 py-3 text-center">
                  {row.points > 0
                    ? <span className="text-sm font-medium" style={{ color: '#16a34a' }}>+{row.points}</span>
                    : <span style={{ color: '#d1d5db' }}>—</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
