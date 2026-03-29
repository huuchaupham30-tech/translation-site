import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-light': '#EEF2FF',
        success: '#10B981',
        error: '#EF4444',
        'text-main': '#111827',
        'text-muted': '#6B7280',
        border: '#E5E7EB',
      },
      borderRadius: {
        card: '16px',
        btn: '8px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
export default config
