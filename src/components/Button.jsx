export default function Button ({ onClick, title, children }) {
  return (
    <button
      className='flex items-center gap-2 bg-none border-none text-[#616161] hover:text-[#999] p-0'
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}
