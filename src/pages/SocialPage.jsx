import React, { useState } from 'react';
import CSRActivities from '../components/social/CSRActivities';
import EmployeeParticipation from '../components/social/EmployeeParticipation';
import LogParticipationForm from '../components/social/LogParticipationForm';

function KpiCard({ label, value, sub, valueColor }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium" style={{ color: '#9ca3af', letterSpacing: '0.04em' }}>
        {label.toUpperCase()}
      </p>
      <p className="text-2xl font-semibold mt-1.5" style={{ color: valueColor || '#111827' }}>{value}</p>
      <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>{sub}</p>
    </div>
  );
}

export default function SocialPage() {
  const [extraRows, setExtraRows] = useState([]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="CSR activities"        value="6"      sub="Registered this quarter"   />
        <KpiCard label="Active participants"    value="847"    sub="Employees engaged"          valueColor="#16a34a" />
        <KpiCard label="Total XP distributed"  value="12,400" sub="This month"                />
        <KpiCard label="Participation rate"     value="78%"    sub="↑ vs 62% last quarter"     valueColor="#16a34a" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <CSRActivities />
          <EmployeeParticipation extraRows={extraRows} />
        </div>
        <div>
          <LogParticipationForm onSubmit={e => setExtraRows(p => [...p, e])} />
        </div>
      </div>
    </div>
  );
}
