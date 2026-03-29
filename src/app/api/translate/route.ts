import { NextRequest, NextResponse } from 'next/server'
import { translateText, translateWordLevel } from '@/lib/deepl'
import { LangCode, TranslationMode } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, fromLang, toLang, mode } = body as {
      text: string
      fromLang: LangCode
      toLang: LangCode
      mode: TranslationMode
    }

    if (!text?.trim()) {
      return NextResponse.json({ error: '请输入要翻译的文字' }, { status: 400 })
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: '文本过长，建议分段翻译（≤5000字符）' },
        { status: 400 },
      )
    }

    if (!fromLang || !toLang) {
      return NextResponse.json({ error: '请选择源语言和目标语言' }, { status: 400 })
    }

    if (fromLang === toLang) {
      return NextResponse.json({ translatedText: text, wordLevel: [] }, { status: 200 })
    }

    let translatedText: string
    let wordLevel: Array<{ word: string; translation: string; index: number }> = []

    if (mode === 'word') {
      const result = await translateWordLevel(text, fromLang, toLang)
      translatedText = result.translatedText
      wordLevel = result.wordLevel
    } else {
      translatedText = await translateText(text, fromLang, toLang)
    }

    return NextResponse.json({ translatedText, wordLevel })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '翻译失败'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
