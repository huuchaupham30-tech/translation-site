import { LangCode } from '@/types'

export async function translateText(
  text: string,
  fromLang: LangCode,
  toLang: LangCode,
): Promise<string> {
  const apiKey = process.env.DEEPL_API_KEY

  if (!apiKey) {
    throw new Error('DeepL API key not configured')
  }

  const source = fromLang
  const target = toLang

  const url = 'https://api-free.deepl.com/v2/translate'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
      source_lang: source,
      target_lang: target,
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Unknown error' }))
    throw new Error(`DeepL API error: ${err.message ?? res.statusText}`)
  }

  const data = await res.json()
  return data.translations?.[0]?.text ?? ''
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

  // 基础分词，DeepL 免费版不返回逐词粒度
  const words = text
    .split(/(\s+|(?=[.,!?;，。!?])|(?<=[.,!?;，。!?]))/)
    .filter(Boolean)

  return {
    translatedText: translated,
    wordLevel: words.map((word, index) => ({
      word,
      translation: '',
      index,
    })),
  }
}
