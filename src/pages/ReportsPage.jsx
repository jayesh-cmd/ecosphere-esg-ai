import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { FileText, Download, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function ReportsPage() {
  const { departments, categories } = useGlobalState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleGenerate = (type) => {
    setSuccessMsg(`${type} generated successfully and sent to your email.`);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const REPORT_TYPES = [
    { title: 'Environmental Report', desc: 'Detailed breakdown of carbon emissions, offsets, and goal progression.', color: '#16a34a' },
    { title: 'Social Report', desc: 'Overview of CSR activities, employee participation, and community impact.', color: '#2563eb' },
    { title: 'Governance Report', desc: 'Audit of compliance issues, policy acknowledgements, and risk metrics.', color: '#9333ea' },
    { title: 'ESG Summary Report', desc: 'High-level executive summary of all ESG pillars and overall performance.', color: '#111827' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto relative">
      
      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 z-50 text-sm font-medium animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 size={16} className="text-green-400" />
          {successMsg}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#111827' }}>Reporting & Analytics</h2>
      </div>

      {/* Quick Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REPORT_TYPES.map(report => (
          <div key={report.title} className="card p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText size={18} style={{ color: report.color }} />
                <h3 className="font-semibold text-sm" style={{ color: '#111827' }}>{report.title}</h3>
              </div>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: '#6b7280' }}>{report.desc}</p>
            </div>
            <button 
              onClick={() => handleGenerate(report.title)}
              className="w-full py-2 rounded-md text-xs font-semibold transition-colors"
              style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151' }}
            >
              Generate Report
            </button>
          </div>
        ))}
      </div>

      {/* Custom Report Builder */}
      <div className="card mt-8">
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Custom Report Builder</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Filter and export specific data points</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            
            {/* Filters */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#374151' }}>Department</label>
              <select className="w-full text-sm rounded-lg px-3 py-2 outline-none" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <option>All Departments</option>
                {departments.map(d => <option key={d.id}>{d.name}</option>)}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#374151' }}>Date Range</label>
              <select className="w-full text-sm rounded-lg px-3 py-2 outline-none" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <option>This Quarter</option>
                <option>Last Quarter</option>
                <option>Year to Date</option>
                <option>Last 12 Months</option>
                <option>Custom Range...</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#374151' }}>Module</label>
              <select className="w-full text-sm rounded-lg px-3 py-2 outline-none" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <option>All Modules (ESG)</option>
                <option>Environmental Only</option>
                <option>Social Only</option>
                <option>Governance Only</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#374151' }}>Employee</label>
              <input type="text" placeholder="Search by name..." className="w-full text-sm rounded-lg px-3 py-2 outline-none" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#374151' }}>Gamification Challenge</label>
              <select className="w-full text-sm rounded-lg px-3 py-2 outline-none" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <option>All Challenges</option>
                <option>Zero Waste Week</option>
                <option>Bike to Work</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: '#374151' }}>ESG Category</label>
              <select className="w-full text-sm rounded-lg px-3 py-2 outline-none" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <option>All Categories</option>
                <option>Carbon Emissions</option>
                <option>CSR Participation</option>
                <option>Compliance Issues</option>
              </select>
            </div>

          </div>

          <div className="flex justify-end pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
            <div className="relative group">
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors hover:opacity-90"
                style={{ background: '#111827' }}
              >
                <Download size={14} /> Export Custom Report <ChevronDown size={14} />
              </button>
              
              {/* Dropdown Menu on Hover for simplicity in demo */}
              <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border hidden group-hover:block z-10" style={{ borderColor: '#e5e7eb' }}>
                <button onClick={() => handleGenerate('PDF Report')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b border-gray-100 rounded-t-lg">PDF (.pdf)</button>
                <button onClick={() => handleGenerate('Excel Report')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-b border-gray-100">Excel (.xlsx)</button>
                <button onClick={() => handleGenerate('CSV Report')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 rounded-b-lg">CSV (.csv)</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
