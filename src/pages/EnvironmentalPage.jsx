import React, { useState } from 'react';
import CarbonTransactions from '../components/environmental/CarbonTransactions';
import SustainabilityGoals from '../components/environmental/SustainabilityGoals';
import AddCarbonForm from '../components/environmental/AddCarbonForm';

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

export default function EnvironmentalPage() {
  const [extraRows, setExtraRows] = useState([]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Total offsets"      value="+290 kg CO₂" sub="Credited this month"    valueColor="#16a34a" />
        <KpiCard label="Total emissions"    value="−760 kg CO₂" sub="Emitted this month"     valueColor="#dc2626" />
        <KpiCard label="Net carbon balance" value="−470 kg CO₂" sub="Net position this period" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <CarbonTransactions extraRows={extraRows} />
        </div>
        <div className="space-y-6">
          <AddCarbonForm onSubmit={e => setExtraRows(p => [...p, e])} />
          <SustainabilityGoals />
        </div>
      </div>
    </div>
  );
}
