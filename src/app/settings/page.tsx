'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getApiKey, setApiKey, clearApiKey } from '@/lib/apiKey'
import { clearHistory } from '@/lib/history'
import CornerDecorations from '@/components/CornerDecorations'
import Toast from '@/components/Toast'

export default function SettingsPage() {
  const [apiKey, setApiKeyInput] = useState('')
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    setApiKeyInput(getApiKey())
  }, [])

  function handleSave() {
    if (!apiKey.trim()) {
      setToast({ message: '请输入有效的 API Key', type: 'error' })
      return
    }
    setApiKey(apiKey)
    setSaved(true)
    setToast({ message: 'API Key 已保存 ✓', type: 'success' })
    setTimeout(() => setSaved(false), 2000)
  }

  function handleClear() {
    clearApiKey()
    clearHistory()
    setApiKeyInput('')
    setShowClearConfirm(false)
    setToast({ message: '已清空所有数据', type: 'success' })
  }

  return (
    <div className="relative">
      <CornerDecorations />

      <div className="max-w-lg">
        <h1 className="text-xl font-bold text-[#111827] mb-6">设置</h1>

        {/* API Key 配置 */}
        <div className="bg-white border border-[#E5E7EB] rounded-card p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827] mb-1">DeepL API Key</h2>
          <p className="text-xs text-[#6B7280] mb-4">
            API Key 用于调用 DeepL 翻译服务。免费版每月 50 万字符。
          </p>

          <div className="mb-3">
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKeyInput(e.target.value)}
              placeholder="请输入你的 DeepL API Key..."
              className="w-full text-sm border border-[#E5E7EB] rounded-btn px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-btn hover:bg-[#4338CA] transition-colors"
            >
              {saved ? '已保存 ✓' : '保存'}
            </button>
            <a
              href="https://www.deepl.com/pro-api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#4F46E5] hover:underline"
            >
              获取 DeepL API Key →
            </a>
          </div>
        </div>

        {/* 数据管理 */}
        <div className="bg-white border border-[#E5E7EB] rounded-card p-6 mb-6 shadow-sm">
          <h2 className="text-base font-semibold text-[#111827] mb-1">数据管理</h2>
          <p className="text-xs text-[#6B7280] mb-4">
            所有数据均存储在浏览器本地（localStorage），不会上传到任何服务器。
          </p>

          {showClearConfirm ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#EF4444]">确定清空所有数据？</span>
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
              清空所有数据
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
