'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LanguageSelector from './LanguageSelector'
import ModeToggle from './ModeToggle'
import { LangCode, TranslationMode, HistoryItem } from '@/types'
import { addHistoryItem, getHistory } from '@/lib/history'
import Toast from './Toast'

interface ToastState {
  message: string
  type: 'success' | 'error'
}

export default function TranslationCard() {
  const [fromLang, setFromLang] = useState<LangCode>('ZH')
  const [toLang, setToLang] = useState<LangCode>('EN')
  const [mode, setMode] = useState<TranslationMode>('full')
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)
  const [recentHistory, setRecentHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    setRecentHistory(getHistory().slice(0, 3))
  }, [])

  async function handleTranslate() {
    if (!sourceText.trim()) {
      setError('请输入要翻译的文字')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText, fromLang, toLang, mode }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? '翻译失败')
      }

      setTranslatedText(data.translatedText)
      addHistoryItem({ fromLang, toLang, sourceText, translatedText: data.translatedText, mode })
      setRecentHistory(getHistory().slice(0, 3))
      setError('')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '翻译失败，请重试'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function handleSwap() {
    setFromLang(toLang)
    setToLang(fromLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  async function handleCopy() {
    if (!translatedText) return
    try {
      await navigator.clipboard.writeText(translatedText)
      setToast({ message: '已复制 ✓', type: 'success' })
    } catch {
      setToast({ message: '复制失败', type: 'error' })
    }
  }

  function handleClear() {
    setSourceText('')
    setTranslatedText('')
    setError('')
  }

  function handleRestore(item: HistoryItem) {
    setFromLang(item.fromLang)
    setToLang(item.toLang)
    setSourceText(item.sourceText)
    setTranslatedText(item.translatedText)
    setMode(item.mode)
  }

  return (
    <div className="bg-white rounded-card shadow-card p-6">
      {/* 语言选择行 */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <LanguageSelector value={fromLang} onChange={setFromLang} label="源语言" />
        <button
          onClick={handleSwap}
          className="text-[#6B7280] hover:text-[#4F46E5] transition-colors p-1 rounded hover:bg-[#EEF2FF]"
          title="交换语言"
        >
          ↔
        </button>
        <LanguageSelector value={toLang} onChange={setToLang} label="目标语言" />
        <ModeToggle value={mode} onChange={setMode} />
      </div>

      {/* 双语编辑区 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 左侧：原文 */}
        <div className="flex flex-col">
          <textarea
            value={sourceText}
            onChange={e => setSourceText(e.target.value)}
            placeholder="输入要翻译的文字..."
            className="flex-1 min-h-[160px] w-full border border-[#E5E7EB] rounded-btn p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
            onKeyDown={e => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleTranslate()
              }
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <button onClick={handleClear} className="text-xs text-[#6B7280] hover:text-[#111827] transition-colors">
              清除
            </button>
            <button
              onClick={handleTranslate}
              disabled={loading || !sourceText.trim()}
              className="px-5 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-btn hover:bg-[#4338CA] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '翻译中...' : '翻译'}
            </button>
          </div>
        </div>

        {/* 右侧：译文 */}
        <div className="flex flex-col">
          <div className="flex-1 min-h-[160px] border border-[#E5E7EB] rounded-btn p-3 text-sm bg-[#FAFAFA] overflow-auto">
            {error ? (
              <p className="text-[#EF4444]">{error}</p>
            ) : translatedText ? (
              mode === 'word' ? (
                <div className="leading-relaxed">
                  {translatedText
                    .split(/(\s+|(?=[.,!?;，。!?《》「」『』])|(?<=[.,!?;，。!?《》「」『』]))/)
                    .filter(Boolean)
                    .map((word, i) => (
                      <span
                        key={i}
                        className="hover:bg-[#EEF2FF] hover:text-[#4F46E5] rounded px-0.5 cursor-default transition-colors"
                      >
                        {word}
                      </span>
                    ))}
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed">{translatedText}</p>
              )
            ) : (
              <p className="text-[#9CA3AF]">译文将显示在这里...</p>
            )}
          </div>
          <div className="flex items-center justify-end mt-2">
            <button
              onClick={handleCopy}
              disabled={!translatedText}
              className="text-xs text-[#6B7280] hover:text-[#4F46E5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              📋 复制
            </button>
          </div>
        </div>
      </div>

      {/* 最近翻译历史 */}
      <div className="border-t border-[#E5E7EB] pt-4 mt-2">
        <div className="flex items-center gap-1 mb-3">
          <span className="text-xs text-[#6B7280]">📜</span>
          <span className="text-xs font-medium text-[#6B7280]">最近翻译</span>
        </div>
        {recentHistory.length === 0 ? (
          <p className="text-xs text-[#9CA3AF]">暂无翻译历史</p>
        ) : (
          <div className="space-y-1">
            {recentHistory.map(item => (
              <button
                key={item.id}
                onClick={() => handleRestore(item)}
                className="w-full text-left px-3 py-2 rounded-btn hover:bg-[#F9FAFB] transition-colors text-xs"
              >
                <span className="text-[#111827] line-clamp-1">
                  {item.sourceText.slice(0, 30)}{item.sourceText.length > 30 ? '...' : ''}
                </span>
                <span className="text-[#9CA3AF] mx-2">→</span>
                <span className="text-[#6B7280] line-clamp-1">
                  {item.translatedText.slice(0, 30)}{item.translatedText.length > 30 ? '...' : ''}
                </span>
              </button>
            ))}
            <Link href="/history" className="block text-center text-xs text-[#4F46E5] hover:underline pt-1">
              查看全部 →
            </Link>
          </div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
