import React from 'react';

// Low-saturation status pills — no neon
const STATUS_MAP = {
  'Approved':    { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  'Completed':   { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
  'Active':      { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  'In Progress': { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
  'Pending':     { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
  'Open':        { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
  'Rejected':    { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  'Overdue':     { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  'Critical':    { bg: '#fef2f2', color: '#b91c1c', border: '#fecaca' },
  'High':        { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
  'Medium':      { bg: '#fffbeb', color: '#92400e', border: '#fde68a' },
  'Low':         { bg: '#f9fafb', color: '#4b5563', border: '#e5e7eb' },
};

export default function StatusPill({ status }) {
  const s = STATUS_MAP[status] || { bg: '#f9fafb', color: '#4b5563', border: '#e5e7eb' };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {status}
    </span>
  );
}
