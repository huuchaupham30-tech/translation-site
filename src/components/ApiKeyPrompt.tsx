'use client'

import Link from 'next/link'

export default function ApiKeyPrompt() {
  return (
    <div className="bg-[#EEF2FF] border border-[#4F46E5]/20 rounded-card p-6 text-center">
      <div className="text-4xl mb-3">🔑</div>
      <h3 className="text-base font-semibold text-[#111827] mb-2">需要配置翻译服务</h3>
      <p className="text-sm text-[#6B7280] mb-4">
        请先配置 DeepL API Key 才能使用翻译功能
      </p>
      <Link
        href="/settings"
        className="inline-block px-5 py-2 bg-[#4F46E5] text-white text-sm font-medium rounded-btn hover:bg-[#4338CA] transition-colors"
      >
        去设置 API Key
      </Link>
      <p className="text-xs text-[#6B7280] mt-3">
        还没有 DeepL 账号？
        <a
          href="https://www.deepl.com/pro-api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4F46E5] underline"
        >
          点击注册
        </a>
        （免费版每月50万字符）
      </p>
    </div>
  )
}
