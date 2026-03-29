'use client'

import { LangCode } from '@/types'

interface LanguageSelectorProps {
  value: LangCode
  onChange: (lang: LangCode) => void
  label?: string
}

const LANGUAGES: { value: LangCode; label: string }[] = [
  { value: 'ZH', label: '中文' },
  { value: 'EN', label: 'English' },
  { value: 'JA', label: '日本語' },
]

export default function LanguageSelector({ value, onChange, label }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-1">
      {label && <span className="text-xs text-[#6B7280] mr-1">{label}</span>}
      <select
        value={value}
        onChange={e => onChange(e.target.value as LangCode)}
        className="text-sm font-medium text-[#4F46E5] bg-transparent border border-[#E5E7EB] rounded-btn px-2 py-1 cursor-pointer hover:border-[#4F46E5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
      >
        {LANGUAGES.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}
