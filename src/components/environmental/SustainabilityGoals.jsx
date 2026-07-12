import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import ProgressBar from '../shared/ProgressBar';

export default function SustainabilityGoals() {
  const { sustainabilityGoals } = useGlobalState();
  return (
    <div className="card p-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Sustainability Goals</h3>
        <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Progress toward annual targets</p>
      </div>

      <div className="space-y-5">
        {sustainabilityGoals.map((goal) => (
          <div key={goal.id}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-medium" style={{ color: '#111827' }}>{goal.title}</p>
                <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Target: {goal.target}</p>
              </div>
              <span
                className="text-sm font-semibold ml-4 shrink-0"
                style={{
                  color: goal.progress >= 80 ? '#16a34a' : goal.progress >= 50 ? '#d97706' : '#dc2626',
                }}
              >
                {goal.progress}%
              </span>
            </div>
            <ProgressBar value={goal.progress} showValue={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
