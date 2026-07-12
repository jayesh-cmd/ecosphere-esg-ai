import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import ProgressBar from '../shared/ProgressBar';

export default function PoliciesList() {
  const { policies } = useGlobalState();
  return (
    <div className="card p-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Policy Acknowledgements</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Employee sign-off rates by policy</p>
      </div>

      <div className="space-y-5">
        {policies.map((policy) => {
          const pct = Math.round((policy.acknowledged / policy.total) * 100);
          return (
            <div key={policy.id}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color: '#111827' }}>{policy.name}</p>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' }}
                    >
                      {policy.version}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Updated {policy.lastUpdated}</p>
                </div>
                <div className="text-right ml-4 shrink-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: pct >= 90 ? '#16a34a' : pct >= 70 ? '#d97706' : '#dc2626' }}
                  >
                    {policy.acknowledged}/{policy.total}
                  </p>
                  <p className="text-xs" style={{ color: '#9ca3af' }}>{pct}%</p>
                </div>
              </div>
              <ProgressBar value={pct} showValue={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
