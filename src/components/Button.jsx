export default function Button ({ onClick, title, children }) {
  return (
    <button
      className='button-toolbar'
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}
