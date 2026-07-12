import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { useGlobalState } from '../../context/GlobalStateContext';

// Each entry: color must exactly match the Line's stroke; dashed must match strokeDasharray
const SERIES = [
  { key: 'environmental', label: 'Environmental', color: '#16a34a', dashed: false },
  { key: 'social',        label: 'Social',        color: '#2563eb', dashed: false },
  { key: 'governance',    label: 'Governance',    color: '#7c3aed', dashed: false },
  { key: 'overall',       label: 'Overall',       color: '#b45309', dashed: true  },
];

// Custom legend renders a line swatch (not a square) so dashed lines look dashed in legend too
function CustomLegend() {
  return (
    <div style={{ display: 'flex', gap: 20, paddingTop: 16, flexWrap: 'wrap' }}>
      {SERIES.map(s => (
        <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width={24} height={12}>
            <line
              x1={0} y1={6} x2={24} y2={6}
              stroke={s.color}
              strokeWidth={1.5}
              strokeDasharray={s.dashed ? '4 3' : undefined}
            />
          </svg>
          <span style={{ fontSize: 11, color: '#6b7280' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: '10px 14px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        fontSize: 13,
      }}
    >
      <p style={{ fontWeight: 600, color: '#111827', marginBottom: 6 }}>{label}</p>
      {payload.map(p => {
        const series = SERIES.find(s => s.key === p.dataKey);
        return (
          <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 3 }}>
            {/* Tiny line swatch matching dashed/solid */}
            <svg width={16} height={10}>
              <line
                x1={0} y1={5} x2={16} y2={5}
                stroke={p.stroke}
                strokeWidth={1.5}
                strokeDasharray={series?.dashed ? '4 3' : undefined}
              />
            </svg>
            <span style={{ color: '#6b7280' }}>{p.name}</span>
            <span style={{ fontWeight: 600, color: '#111827', marginLeft: 'auto', paddingLeft: 12 }}>
              {p.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function ScoreTrendChart() {
  const { scoreTrend } = useGlobalState();
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>Score Trend</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>6-month ESG performance</p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
        >
          ↑ +13 pts since Feb
        </span>
      </div>

      {/* Custom legend rendered outside ResponsiveContainer to avoid Recharts overrides */}
      <CustomLegend />

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={scoreTrend} margin={{ top: 8, right: 4, bottom: 0, left: -24 }}>
          <CartesianGrid stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[50, 100]}
            tick={{ fill: '#9ca3af', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          {SERIES.map(s => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={s.color}
              strokeWidth={1.5}
              strokeDasharray={s.dashed ? '4 3' : undefined}
              dot={false}
              activeDot={{ r: 3, fill: s.color, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
