'use client'

import { useState, useEffect } from 'react'
import { getHistory, clearHistory, searchHistory } from '@/lib/history'
import HistoryItemCard from '@/components/HistoryItem'
import CornerDecorations from '@/components/CornerDecorations'
import Toast from '@/components/Toast'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [historyItems, setHistoryItems] = useState<import('@/types').HistoryItem[]>([])
  const router = useRouter()

  function loadHistory() {
    if (searchQuery.trim()) {
      setHistoryItems(searchHistory(searchQuery))
    } else {
      setHistoryItems(getHistory())
    }
    setTotal(getHistory().length)
  }

  useEffect(() => {
    loadHistory()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadHistory()
  }, [searchQuery])

  function handleClear() {
    clearHistory()
    setHistoryItems([])
    setTotal(0)
    setShowClearConfirm(false)
    setToast({ message: '历史已清空', type: 'success' })
  }

  function handleRestore(item: import('@/types').HistoryItem) {
    router.push(`/?restore=${item.id}`)
  }

  return (
    <div className="relative">
      <CornerDecorations />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">翻译历史</h1>
          <p className="text-sm text-[#6B7280] mt-1">共 {total} 条记录</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="搜索翻译内容..."
            className="text-sm border border-[#E5E7EB] rounded-btn px-3 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
          />
          {total > 0 &&
            (showClearConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#EF4444]">确定清空？</span>
                <button
                  onClick={handleClear}
                  className="text-xs text-white bg-[#EF4444] px-3 py-1.5 rounded-btn"
                >
                  确定
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="text-xs text-[#6B7280] hover:text-[#111827]"
                >
                  取消
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-xs text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
              >
                清空全部
              </button>
            ))}
        </div>
      </div>

      {historyItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-[#6B7280]">
            {searchQuery.trim() ? '没有找到匹配的翻译记录' : '暂无翻译历史'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {historyItems.map(item => (
            <HistoryItemCard
              key={item.id}
              item={item}
              onDeleted={loadHistory}
              onRestore={handleRestore}
            />
          ))}
        </div>
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
