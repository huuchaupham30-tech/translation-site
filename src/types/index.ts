export type LangCode = 'ZH' | 'EN' | 'JA'
export type TranslationMode = 'full' | 'word'

export interface HistoryItem {
  id: string
  fromLang: LangCode
  toLang: LangCode
  sourceText: string
  translatedText: string
  mode: TranslationMode
  createdAt: string
}

export interface TranslateRequest {
  text: string
  fromLang: LangCode
  toLang: LangCode
  mode: TranslationMode
}

export interface TranslateResponse {
  translatedText: string
  wordLevel?: WordTranslation[]
}

export interface WordTranslation {
  word: string
  translation: string
  index: number
}
