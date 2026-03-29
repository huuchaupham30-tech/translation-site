import { LangCode } from '@/types'

// MyMemory API — 完全免费，无需注册，https://mymemory.translated.net
const LANG_MAP: Record<LangCode, string> = {
  ZH: 'zh-CN',
  EN: 'en',
  JA: 'ja',
}

export async function translateText(
  text: string,
  fromLang: LangCode,
  toLang: LangCode,
): Promise<string> {
  const source = LANG_MAP[fromLang] ?? fromLang
  const target = LANG_MAP[toLang] ?? toLang

  // MyMemory 免费接口，无需 API Key
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`翻译服务请求失败 (${res.status})`)
  }

  const data = await res.json()

  if (data.responseStatus !== 200) {
    throw new Error(data.responseDetails ?? '翻译失败')
  }

  return data.responseData?.translatedText ?? ''
}

export async function translateWordLevel(
  text: string,
  fromLang: LangCode,
  toLang: LangCode,
): Promise<{
  translatedText: string
  wordLevel: Array<{ word: string; translation: string; index: number }>
}> {
  const translated = await translateText(text, fromLang, toLang)

  // 基础分词：按空格和中英文标点分割
  const words = text
    .split(/(\s+|(?=[.,!?;，。!?《》「」『』])|(?<=[.,!?;，。!?《》「」『』]))/)
    .filter(Boolean)

  return {
    translatedText: translated,
    wordLevel: words.map((word, index) => ({ word, translation: '', index })),
  }
}
