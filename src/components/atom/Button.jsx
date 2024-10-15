export default function Button ({ onClick, title, children, className = '' }) {
  return (
    <button
      className={`flex items-center gap-2 bg-none border-none rounded-md text-[#858585] hover:text-[#999] hover:bg-[#252525] p-1 cursor-default ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}
