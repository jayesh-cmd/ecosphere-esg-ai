import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';

function ScoreCell({ value }) {
  const color =
    value >= 85 ? '#16a34a' :
    value >= 70 ? '#374151' : '#dc2626';
  return <span className="font-medium text-sm" style={{ color }}>{value}</span>;
}

export default function DepartmentTable() {
  const { departments } = useGlobalState();
  const sorted = [...departments].sort((a, b) => b.total - a.total);

  return (
    <div className="card">
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid #f3f4f6' }}
      >
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Department Rankings</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Ranked by total ESG score</p>
        </div>
        <span className="text-xs" style={{ color: '#9ca3af' }}>{sorted.length} departments</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Rank', 'Department', 'Environmental', 'Social', 'Governance', 'Total'].map(h => (
                <th
                  key={h}
                  className={`py-3 text-xs font-medium ${h === 'Rank' || h === 'Department' ? 'text-left px-6' : 'text-center px-4'}`}
                  style={{ color: '#9ca3af', letterSpacing: '0.04em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((dept, idx) => (
              <tr
                key={dept.id}
                className="tr-hover"
                style={{ borderBottom: idx < sorted.length - 1 ? '1px solid #f9fafb' : 'none' }}
              >
                <td className="px-6 py-3">
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      background: idx === 0 ? '#fefce8' : idx === 1 ? '#f9fafb' : idx === 2 ? '#fff7ed' : 'transparent',
                      color: idx === 0 ? '#854d0e' : idx === 1 ? '#4b5563' : idx === 2 ? '#9a3412' : '#9ca3af',
                    }}
                  >
                    {idx + 1}
                  </div>
                </td>
                <td className="px-6 py-3 font-medium text-sm" style={{ color: '#111827' }}>
                  {dept.name}
                </td>
                <td className="px-4 py-3 text-center"><ScoreCell value={dept.environmental} /></td>
                <td className="px-4 py-3 text-center"><ScoreCell value={dept.social} /></td>
                <td className="px-4 py-3 text-center"><ScoreCell value={dept.governance} /></td>
                <td className="px-4 py-3 text-center">
                  <span className="font-semibold text-sm" style={{ color: '#111827' }}>{dept.total}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
