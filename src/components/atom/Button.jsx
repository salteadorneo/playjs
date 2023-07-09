export default function Button ({ onClick, title, children, className }) {
  return (
    <button
      className={`flex items-center gap-2 bg-none border-none text-[#858585] hover:text-[#999] p-0 cursor-default ${className}`}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}
