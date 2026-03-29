import { HistoryItem } from '@/types'

const HISTORY_KEY = 'translation-history'
const MAX_ITEMS = 100

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.warn('[history] failed to parse', e)
    return []
  }
}

export function saveHistory(history: HistoryItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function addHistoryItem(item: Omit<HistoryItem, 'id' | 'createdAt'>): HistoryItem {
  const history = getHistory()

  const existingIndex = history.findIndex(
    h =>
      h.sourceText === item.sourceText &&
      h.fromLang === item.fromLang &&
      h.toLang === item.toLang,
  )

  const newItem: HistoryItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  if (existingIndex !== -1) {
    history.splice(existingIndex, 1)
    history.unshift(newItem)
  } else {
    history.unshift(newItem)
    if (history.length > MAX_ITEMS) {
      history.pop()
    }
  }

  saveHistory(history)
  return newItem
}

export function deleteHistoryItem(id: string): void {
  const history = getHistory().filter(h => h.id !== id)
  saveHistory(history)
}

export function clearHistory(): void {
  saveHistory([])
}

export function searchHistory(query: string): HistoryItem[] {
  const q = query.toLowerCase().trim()
  if (!q) return getHistory()
  return getHistory().filter(
    h =>
      h.sourceText.toLowerCase().includes(q) ||
      h.translatedText.toLowerCase().includes(q),
  )
}
