'use client'

import { useState } from 'react'
import Link from 'next/link'
import { clearHistory } from '@/lib/history'
import CornerDecorations from '@/components/CornerDecorations'
import Toast from '@/components/Toast'

export default function SettingsPage() {
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  function handleClear() {
    clearHistory()
    setShowClearConfirm(false)
    setToast({ message: '历史已清空', type: 'success' })
  }

  return (
    <div className="relative">
      <CornerDecorations />

      <div className="max-w-lg">
        <h1 className="text-xl font-bold text-[#111827] mb-6">设置</h1>

        {/* 介绍 */}
        <div className="bg-white border border-[#E5E7EB] rounded-card p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827] mb-1">翻译助手</h2>
          <p className="text-xs text-[#6B7280] mb-2">
            使用 MyMemory 翻译引擎，完全免费，无需注册。
          </p>
          <p className="text-xs text-[#6B7280]">
            免费额度：每日 1000 次请求，每次最多 500 字。
          </p>
        </div>

        {/* 数据管理 */}
        <div className="bg-white border border-[#E5E7EB] rounded-card p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827] mb-1">数据管理</h2>
          <p className="text-xs text-[#6B7280] mb-4">
            所有数据均存储在浏览器本地（localStorage），不会上传到任何服务器。
          </p>

          {showClearConfirm ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#EF4444]">确定清空所有翻译历史？</span>
              <button
                onClick={handleClear}
                className="px-4 py-1.5 bg-[#EF4444] text-white text-sm rounded-btn"
              >
                确定
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="text-sm text-[#6B7280] hover:text-[#111827]"
              >
                取消
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-sm text-[#EF4444] hover:underline"
            >
              清空翻译历史
            </button>
          )}
        </div>

        {/* 返回主页 */}
        <Link
          href="/"
          className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors"
        >
          ← 返回翻译主页
        </Link>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  )
}
