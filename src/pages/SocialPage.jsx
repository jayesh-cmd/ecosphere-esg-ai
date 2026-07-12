import React, { useState } from 'react';
import CSRActivities from '../components/social/CSRActivities';
import EmployeeParticipation from '../components/social/EmployeeParticipation';
import LogParticipationForm from '../components/social/LogParticipationForm';
import Modal from '../components/shared/Modal';
import { Plus } from 'lucide-react';
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

export default function SocialPage() {
  const { addParticipation } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#111827' }}>Social Impact</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          style={{ background: '#111827', color: '#ffffff' }}
        >
          <Plus size={16} strokeWidth={2} />
          Log Participation
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="CSR activities"        value="6"      sub="Registered this quarter"   />
        <KpiCard label="Active participants"    value="847"    sub="Employees engaged"          valueColor="#16a34a" />
        <KpiCard label="Total XP distributed"  value="12,400" sub="This month"                />
        <KpiCard label="Participation rate"     value="78%"    sub="↑ vs 62% last quarter"     valueColor="#16a34a" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CSRActivities />
        <EmployeeParticipation />
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Log Participation"
      >
        <LogParticipationForm onSubmit={e => {
          addParticipation(e);
          setTimeout(() => setIsModalOpen(false), 800);
        }} />
      </Modal>
    </div>
  );
}
