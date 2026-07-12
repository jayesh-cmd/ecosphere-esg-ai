import React, { useState } from 'react';

const DEPARTMENTS = ['Engineering', 'Operations', 'Marketing', 'Finance', 'HR', 'Legal', 'Product'];
const SOURCES = ['Server Power', 'Fleet Vehicles', 'Carbon Offset Buy', 'Office HVAC', 'Tree Planting', 'Air Travel', 'Solar Panel Output', 'Office Equipment', 'Other'];

const inputStyle = {
  width: '100%',
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: 8,
  padding: '9px 12px',
  fontSize: 14,
  color: '#111827',
  outline: 'none',
};

const labelStyle = { display: 'block', fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 6 };

export default function AddCarbonForm({ onSubmit }) {
  const [form, setForm] = useState({
    department: '', source: '', amount: '', type: 'debit',
    date: new Date().toISOString().slice(0, 10),
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      department: form.department,
      source: form.source,
      amount: form.type === 'credit' ? +form.amount : -Math.abs(+form.amount),
      date: form.date,
    };
    onSubmit?.(entry);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ department: '', source: '', amount: '', type: 'debit', date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label style={labelStyle}>Department</label>
          <select name="department" value={form.department} onChange={handleChange} required style={inputStyle}>
            <option value="">Select department</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Source</label>
          <select name="source" value={form.source} onChange={handleChange} required style={inputStyle}>
            <option value="">Select source</option>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>Amount (kg CO₂)</label>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} required min="0"
              placeholder="e.g. 120" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
              <option value="debit">Emission</option>
              <option value="credit">Offset</option>
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required style={inputStyle} />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 rounded-lg text-sm font-semibold"
          style={{
            background: submitted ? '#f0fdf4' : '#111827',
            color: submitted ? '#15803d' : '#ffffff',
            border: submitted ? '1px solid #bbf7d0' : 'none',
          }}
        >
          {submitted ? '✓ Entry logged' : 'Log entry'}
        </button>
      </form>
    </div>
  );
}
