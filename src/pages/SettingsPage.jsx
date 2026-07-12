import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';
import { Pencil, Plus, Sliders } from 'lucide-react';

function ToggleSwitch({ label, description, isOn, onToggle }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <p className="text-sm font-medium" style={{ color: '#111827' }}>{label}</p>
        <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{description}</p>
      </div>
      <button
        onClick={onToggle}
        className="w-10 h-5 rounded-full relative transition-colors shrink-0 outline-none"
        style={{ background: isOn ? '#16a34a' : '#e5e7eb' }}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform"
          style={{ left: 2, transform: isOn ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { departments } = useGlobalState();

  // Local state for weights
  const [weights, setWeights] = useState({ env: 40, soc: 30, gov: 30 });
  
  // Local state for toggles
  const [toggles, setToggles] = useState({
    autoCalc: true,
    evidenceReq: false,
    badgeAuto: true
  });

  const categories = ['Environment', 'Education', 'Health', 'Diversity', 'Community'];
  
  // Create dummy heads for departments
  const dummyHeads = ['Alice Chen', 'Bob Smith', 'Charlie Lee', 'Diana Prince', 'Eve Adams', 'Frank Ocean', 'Grace Hopper'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold" style={{ color: '#111827' }}>Platform Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Organization & Categories */}
        <div className="space-y-6">
          
          {/* Department Management */}
          <div className="card">
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Department Management</h3>
            </div>
            <div className="px-6 py-2">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left font-medium py-2 text-xs" style={{ color: '#9ca3af' }}>DEPT CODE</th>
                    <th className="text-left font-medium py-2 text-xs" style={{ color: '#9ca3af' }}>NAME</th>
                    <th className="text-left font-medium py-2 text-xs" style={{ color: '#9ca3af' }}>HEAD</th>
                    <th className="text-right font-medium py-2 text-xs" style={{ color: '#9ca3af' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept, i) => (
                    <tr key={dept.id} style={{ borderBottom: i < departments.length -1 ? '1px solid #f9fafb' : 'none' }}>
                      <td className="py-2.5 font-mono text-xs" style={{ color: '#6b7280' }}>D-{String(dept.id).padStart(3, '0')}</td>
                      <td className="py-2.5 font-medium" style={{ color: '#111827' }}>{dept.name}</td>
                      <td className="py-2.5" style={{ color: '#4b5563' }}>{dummyHeads[i % dummyHeads.length]}</td>
                      <td className="py-2.5 text-right">
                        <button className="text-xs px-2.5 py-1 rounded-md transition-colors hover:bg-gray-100" style={{ color: '#374151', border: '1px solid #e5e7eb' }}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Management */}
          <div className="card">
            <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>CSR Categories</h3>
              <button className="flex items-center gap-1 text-xs font-medium" style={{ color: '#16a34a' }}>
                <Plus size={14} /> Add New
              </button>
            </div>
            <div className="px-6 py-4 flex flex-wrap gap-2">
              {categories.map(cat => (
                <div key={cat} className="px-3 py-1.5 rounded-full text-xs flex items-center gap-2" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151' }}>
                  {cat}
                  <button className="hover:opacity-70"><Pencil size={12} style={{ color: '#9ca3af' }} /></button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: ESG Config & Toggles */}
        <div className="space-y-6">
          
          {/* ESG Config */}
          <div className="card">
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <div className="flex items-center gap-2">
                <Sliders size={16} style={{ color: '#6b7280' }} />
                <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>ESG Score Weighting</h3>
              </div>
              <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Weights must sum to 100%.</p>
            </div>
            
            <div className="px-6 py-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium" style={{ color: '#111827' }}>Environmental</span>
                  <span style={{ color: '#16a34a' }}>{weights.env}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={weights.env}
                  onChange={(e) => setWeights({ ...weights, env: Number(e.target.value) })}
                  className="w-full accent-green-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium" style={{ color: '#111827' }}>Social</span>
                  <span style={{ color: '#2563eb' }}>{weights.soc}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={weights.soc}
                  onChange={(e) => setWeights({ ...weights, soc: Number(e.target.value) })}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium" style={{ color: '#111827' }}>Governance</span>
                  <span style={{ color: '#9333ea' }}>{weights.gov}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={weights.gov}
                  onChange={(e) => setWeights({ ...weights, gov: Number(e.target.value) })}
                  className="w-full accent-purple-600"
                />
              </div>
              
              <div className="pt-3 flex justify-between items-center" style={{ borderTop: '1px solid #f3f4f6' }}>
                <span className="text-sm font-semibold" style={{ color: '#111827' }}>Total</span>
                <span className="text-sm font-semibold" style={{ color: (weights.env + weights.soc + weights.gov) === 100 ? '#111827' : '#dc2626' }}>
                  {weights.env + weights.soc + weights.gov}%
                </span>
              </div>
            </div>
          </div>

          {/* Module Toggles */}
          <div className="card">
            <div className="px-6 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
              <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Automation Preferences</h3>
            </div>
            <div className="px-6 py-2 divide-y" style={{ divideColor: '#f9fafb' }}>
              <ToggleSwitch
                label="Auto Emission Calculation"
                description="Automatically calculate carbon transactions from linked operational records."
                isOn={toggles.autoCalc}
                onToggle={() => setToggles(t => ({ ...t, autoCalc: !t.autoCalc }))}
              />
              <ToggleSwitch
                label="Evidence Required for CSR"
                description="CSR participation cannot be approved without proof attachment."
                isOn={toggles.evidenceReq}
                onToggle={() => setToggles(t => ({ ...t, evidenceReq: !t.evidenceReq }))}
              />
              <ToggleSwitch
                label="Badge Auto-Award"
                description="Automatically assign badges when unlock conditions are met."
                isOn={toggles.badgeAuto}
                onToggle={() => setToggles(t => ({ ...t, badgeAuto: !t.badgeAuto }))}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
