import React, { useState } from 'react';

const ACTIVITIES = [
  'Community Clean-Up Drive', 'Digital Literacy Workshop', 'Blood Donation Camp',
  'Women Entrepreneurship Fair', 'Food Bank Volunteering', 'Coding Bootcamp for Youth',
];
const STATUSES = ['Completed', 'In Progress', 'Pending'];

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

export default function LogParticipationForm({ onSubmit }) {
  const [form, setForm] = useState({ employee: '', activity: '', status: '', date: new Date().toISOString().slice(0, 10) });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit?.({
      id: Date.now(),
      employee: form.employee,
      activity: form.activity,
      status: form.status,
      points: form.status === 'Completed' ? 150 : 0,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setForm({ employee: '', activity: '', status: '', date: new Date().toISOString().slice(0, 10) });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label style={labelStyle}>Employee Name</label>
          <input type="text" name="employee" value={form.employee} onChange={handleChange} required
            placeholder="Full name" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Activity</label>
          <select name="activity" value={form.activity} onChange={handleChange} required style={inputStyle}>
            <option value="">Select activity</option>
            {ACTIVITIES.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label style={labelStyle}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} required style={inputStyle}>
              <option value="">Select status</option>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Proof of Participation</label>
          <input type="file" style={{ ...inputStyle, padding: '6px 12px' }} />
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
          {submitted ? '✓ Logged' : 'Log participation'}
        </button>
      </form>
    </div>
  );
}
