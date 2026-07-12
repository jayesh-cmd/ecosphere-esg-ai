import React, { useState } from 'react';
import ComplianceTable from '../components/governance/ComplianceTable';
import PoliciesList from '../components/governance/PoliciesList';
import RaiseIssueForm from '../components/governance/RaiseIssueForm';
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

export default function GovernancePage() {
  const { esgScores, addIssue } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#111827' }}>Governance</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
          style={{ background: '#111827', color: '#ffffff' }}
        >
          <Plus size={16} strokeWidth={2} />
          Raise Issue
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Governance score"     value={`${esgScores.governance}/100`} sub="Target: 80"        valueColor={esgScores.governance >= 80 ? '#16a34a' : '#d97706'} />
        <KpiCard label="Overdue issues"       value="2"      sub="Critical & High severity"   valueColor="#dc2626" />
        <KpiCard label="Policies tracked"     value="6"      sub="Avg 84% acknowledgement"   />
        <KpiCard label="Resolved this month"  value="8"      sub="Issues closed"              valueColor="#16a34a" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ComplianceTable />
        </div>
        <div>
          <PoliciesList />
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Raise Issue"
      >
        <RaiseIssueForm onSubmit={e => {
          addIssue(e);
          setTimeout(() => setIsModalOpen(false), 800);
        }} />
      </Modal>
    </div>
  );
}
