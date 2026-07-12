import React, { useState } from 'react';

const OWNERS    = ['Legal', 'HR', 'Finance', 'Operations', 'Engineering', 'IT'];
const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];

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

export default function RaiseIssueForm({ onSubmit }) {
  const [form, setForm] = useState({ description: '', severity: '', owner: '', dueDate: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.({ id: Date.now(), ...form, status: 'Open' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ description: '', severity: '', owner: '', dueDate: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe the compliance issue…"
            style={{ ...inputStyle, resize: 'none' }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>Severity</label>
            <select name="severity" value={form.severity} onChange={handleChange} required style={inputStyle}>
              <option value="">Select</option>
              {SEVERITIES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Assign to</label>
            <select name="owner" value={form.owner} onChange={handleChange} required style={inputStyle}>
              <option value="">Select team</option>
              {OWNERS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={labelStyle}>Due Date</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required style={inputStyle} />
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
          {submitted ? '✓ Issue raised' : 'Raise issue'}
        </button>
      </form>
    </div>
  );
}
