import React, { useState } from 'react';
import ComplianceTable from '../components/governance/ComplianceTable';
import PoliciesList from '../components/governance/PoliciesList';
import RaiseIssueForm from '../components/governance/RaiseIssueForm';

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

export default function GovernancePage() {
  const [extraIssues, setExtraIssues] = useState([]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Governance score"     value="72/100" sub="Below target of 80"        valueColor="#d97706" />
        <KpiCard label="Overdue issues"       value="2"      sub="Critical & High severity"   valueColor="#dc2626" />
        <KpiCard label="Policies tracked"     value="6"      sub="Avg 84% acknowledgement"   />
        <KpiCard label="Resolved this month"  value="8"      sub="Issues closed"              valueColor="#16a34a" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <ComplianceTable extraRows={extraIssues} />
          <PoliciesList />
        </div>
        <div>
          <RaiseIssueForm onSubmit={e => setExtraIssues(p => [...p, e])} />
        </div>
      </div>
    </div>
  );
}
