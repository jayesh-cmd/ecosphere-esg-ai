import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { generateSummary, answerQuestion } from '../../utils/generateSummary';
import { useGlobalState } from '../../context/GlobalStateContext';

export default function AISummaryCard() {
  const globalState = useGlobalState();
  const { esgScores } = globalState;
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: generateSummary(esgScores),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [messages]);

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    const q = (typeof e === 'string' ? e : input).trim();
    if (!q || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);

    const answer = await answerQuestion(q, globalState);
    setMessages(prev => [...prev, { role: 'assistant', text: answer }]);
    setLoading(false);
  };

  const SUGGESTIONS = [
    'Why is governance score low?',
    'How can we improve the environmental score?',
    "What's driving the social score?",
  ];

  return (
    <div className="card flex flex-col h-full" style={{ minHeight: 340 }}>
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between shrink-0"
        style={{ borderBottom: '1px solid #f3f4f6' }}
      >
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>AI ESG Assistant</h3>
          <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>Ask anything about your ESG performance</p>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
        >
          Claude 3 Haiku
        </span>
      </div>

      {/* Chat thread */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" style={{ maxHeight: 280 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div
              className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold mt-0.5"
              style={
                msg.role === 'assistant'
                  ? { background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }
                  : { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' }
              }
            >
              {msg.role === 'assistant' ? 'AI' : 'Me'}
            </div>

            {/* Bubble */}
            <div
              className="text-sm leading-relaxed rounded-lg px-3.5 py-2.5 max-w-xs"
              style={
                msg.role === 'assistant'
                  ? { background: '#f9fafb', color: '#374151', border: '1px solid #f3f4f6' }
                  : { background: '#111827', color: '#f9fafb' }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div
              className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold"
              style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
            >
              AI
            </div>
            <div
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg"
              style={{ background: '#f9fafb', border: '1px solid #f3f4f6' }}
            >
              <Loader size={13} className="animate-spin" style={{ color: '#9ca3af' }} />
              <span className="text-xs" style={{ color: '#9ca3af' }}>Thinking…</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-5 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSubmit(s)}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: '#f9fafb',
                color: '#6b7280',
                border: '1px solid #e5e7eb',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 flex items-center gap-2 shrink-0"
        style={{ borderTop: '1px solid #f3f4f6' }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about your ESG scores…"
          className="flex-1 text-sm rounded-lg px-3.5 py-2 outline-none"
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            color: '#111827',
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-40"
          style={{
            background: '#16a34a',
            border: 'none',
          }}
        >
          <Send size={14} strokeWidth={2} color="white" />
        </button>
      </form>
    </div>
  );
}
