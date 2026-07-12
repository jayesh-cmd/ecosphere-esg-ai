import React, { useState } from 'react';
import CarbonTransactions from '../components/environmental/CarbonTransactions';
import SustainabilityGoals from '../components/environmental/SustainabilityGoals';
import AddCarbonForm from '../components/environmental/AddCarbonForm';
import Modal from '../components/shared/Modal';
import { Plus, AlertTriangle, X } from 'lucide-react';
import { useGlobalState } from '../context/GlobalStateContext';

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
  const { addCarbonEntry, anomalies, dismissAnomaly } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 relative">
      {anomalies.length > 0 && (
        <div className="flex flex-col gap-2">
          {anomalies.map(anomaly => (
            <div key={anomaly.id} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
              <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: '#dc2626' }} />
              <div className="flex-1 text-sm font-medium" style={{ color: '#991b1b' }}>
                ⚠️ Anomaly Detected — {anomaly.message}
              </div>
              <button 
                onClick={() => dismissAnomaly(anomaly.id)}
                className="shrink-0 hover:opacity-70 transition-opacity"
              >
                <X size={16} style={{ color: '#991b1b' }} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#111827' }}>Environmental Impact</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          style={{ background: '#111827', color: '#ffffff' }}
        >
          <Plus size={16} strokeWidth={2} />
          Add Carbon Entry
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Total offsets"      value="+290 kg CO₂" sub="Credited this month"    valueColor="#16a34a" />
        <KpiCard label="Total emissions"    value="−760 kg CO₂" sub="Emitted this month"     valueColor="#dc2626" />
        <KpiCard label="Net carbon balance" value="−470 kg CO₂" sub="Net position this period" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <CarbonTransactions />
        </div>
        <div>
          <SustainabilityGoals />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Log Carbon Entry"
      >
        <AddCarbonForm onSubmit={e => {
          addCarbonEntry(e);
          setTimeout(() => setIsModalOpen(false), 800);
        }} />
      </Modal>
    </div>
  );
}
