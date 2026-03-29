const API_KEY_STORAGE = 'deepl-api-key'

export function getApiKey(): string {
  if (typeof window === 'undefined') return ''
  return localStorage.getItem(API_KEY_STORAGE) ?? ''
}

export function setApiKey(key: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(API_KEY_STORAGE, key.trim())
}

export function hasApiKey(): boolean {
  return getApiKey().length > 0
}

export function clearApiKey(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(API_KEY_STORAGE)
}
