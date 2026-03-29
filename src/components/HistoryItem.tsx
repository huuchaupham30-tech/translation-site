'use client'

import { useState } from 'react'
import { HistoryItem as HistoryItemType } from '@/types'
import { deleteHistoryItem } from '@/lib/history'
import Toast from './Toast'

const LANG_LABELS: Record<string, string> = {
  ZH: '中文',
  EN: 'English',
  JA: '日本語',
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}小时前`
  return `${Math.floor(hours / 24)}天前`
}

interface HistoryItemCardProps {
  item: HistoryItemType
  onDeleted: () => void
  onRestore: (item: HistoryItemType) => void
}

export default function HistoryItemCard({
  item,
  onDeleted,
  onRestore,
}: HistoryItemCardProps) {
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function handleDelete() {
    setDeleting(true)
    deleteHistoryItem(item.id)
    onDeleted()
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(item.translatedText)
      setToast({ message: '已复制 ✓', type: 'success' })
    } catch {
      setToast({ message: '复制失败', type: 'error' })
    }
  }

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-btn p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-[#4F46E5]">
            {LANG_LABELS[item.fromLang]} → {LANG_LABELS[item.toLang]}
          </span>
          <span className="text-xs text-[#9CA3AF]">{timeAgo(item.createdAt)}</span>
          {item.mode === 'word' && (
            <span className="text-xs bg-[#EEF2FF] text-[#4F46E5] px-1.5 py-0.5 rounded">
              逐词
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="text-xs text-[#6B7280] hover:text-[#4F46E5] transition-colors"
          >
            📋 复制
          </button>
          <button
            onClick={() => onRestore(item)}
            className="text-xs text-[#6B7280] hover:text-[#4F46E5] transition-colors"
          >
            回退
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-xs text-[#9CA3AF] hover:text-[#EF4444] transition-colors disabled:opacity-50"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="text-sm text-[#111827] mb-1 line-clamp-2">{item.sourceText}</div>
      <div className="text-sm text-[#6B7280] line-clamp-2">{item.translatedText}</div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
