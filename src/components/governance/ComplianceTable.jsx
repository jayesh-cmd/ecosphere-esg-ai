import React from 'react';
import { complianceIssues as initialIssues } from '../../data/mockData';
import StatusPill from '../shared/StatusPill';

export default function ComplianceTable({ extraRows = [] }) {
  const data = [...initialIssues, ...extraRows];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="card">
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid #f3f4f6' }}
      >
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Compliance Issues</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
            {data.filter(i => i.status === 'Overdue').length} overdue · {data.length} total
          </p>
        </div>
        {data.some(i => i.status === 'Overdue') && (
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}
          >
            Action required
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              {['Description', 'Severity', 'Owner', 'Due Date', 'Status'].map(h => (
                <th
                  key={h}
                  className={`py-3 text-xs font-medium ${h === 'Severity' || h === 'Status' ? 'text-center px-4' : 'text-left px-6'}`}
                  style={{ color: '#9ca3af', letterSpacing: '0.04em' }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((issue, i) => {
              const isOverdue = issue.status === 'Overdue' || (issue.dueDate < today && issue.status !== 'Resolved');
              return (
                <tr
                  key={issue.id}
                  className="tr-hover"
                  style={{ borderBottom: i < data.length - 1 ? '1px solid #f9fafb' : 'none' }}
                >
                  <td className="px-6 py-3" style={{ maxWidth: 280 }}>
                    <p
                      className="text-sm font-medium leading-snug"
                      style={{ color: isOverdue ? '#b91c1c' : '#111827' }}
                    >
                      {issue.description}
                    </p>
                    {isOverdue && (
                      <p className="text-xs mt-0.5" style={{ color: '#f87171' }}>Past due date</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center"><StatusPill status={issue.severity} /></td>
                  <td className="px-6 py-3 text-sm" style={{ color: '#6b7280' }}>{issue.owner}</td>
                  <td className="px-6 py-3 text-xs font-medium" style={{ color: isOverdue ? '#b91c1c' : '#6b7280' }}>
                    {issue.dueDate}
                  </td>
                  <td className="px-4 py-3 text-center"><StatusPill status={issue.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
