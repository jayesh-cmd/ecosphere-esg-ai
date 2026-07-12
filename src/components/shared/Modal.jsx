import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 transition-opacity" 
        style={{ background: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(2px)' }} 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-md transform overflow-hidden rounded-xl p-6 text-left shadow-xl transition-all"
        style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold" style={{ color: '#111827' }}>{title}</h3>
          <button 
            onClick={onClose}
            className="rounded-lg p-1"
            style={{ color: '#9ca3af' }}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
