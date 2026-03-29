export default function CornerDecorations() {
  return (
    <>
      {/* 左上 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="absolute top-0 left-0 text-[#4F46E5] opacity-40 pointer-events-none"
        fill="none"
      >
        <path d="M1 32 L1 1 L32 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* 右上 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="absolute top-0 right-0 text-[#4F46E5] opacity-40 pointer-events-none"
        fill="none"
      >
        <path d="M31 32 L31 1 L0 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* 左下 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="absolute bottom-0 left-0 text-[#4F46E5] opacity-40 pointer-events-none"
        fill="none"
      >
        <path d="M1 0 L1 31 L32 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* 右下 */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        className="absolute bottom-0 right-0 text-[#4F46E5] opacity-40 pointer-events-none"
        fill="none"
      >
        <path d="M31 0 L31 31 L0 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </>
  )
}
