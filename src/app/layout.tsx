import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: '翻译助手 - 中英日互译',
  description: '支持逐词翻译和全文翻译的中英文互译工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#F8F9FA]">
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-[#4F46E5] flex items-center gap-2">
              🌐 翻译助手
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/history" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                历史
              </Link>
              <Link href="/settings" className="text-sm text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                设置
              </Link>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
