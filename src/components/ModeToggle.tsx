'use client'

import { TranslationMode } from '@/types'

interface ModeToggleProps {
  value: TranslationMode
  onChange: (mode: TranslationMode) => void
}

export default function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <div className="flex bg-[#F3F4F6] rounded-btn p-1">
      <button
        onClick={() => onChange('full')}
        className={`px-3 py-1 text-xs font-medium rounded-btn transition-all ${
          value === 'full'
            ? 'bg-white text-[#4F46E5] shadow-sm'
            : 'text-[#6B7280] hover:text-[#111827]'
        }`}
      >
        全文翻译
      </button>
      <button
        onClick={() => onChange('word')}
        className={`px-3 py-1 text-xs font-medium rounded-btn transition-all ${
          value === 'word'
            ? 'bg-white text-[#4F46E5] shadow-sm'
            : 'text-[#6B7280] hover:text-[#111827]'
        }`}
      >
        逐词翻译
      </button>
    </div>
  )
}
