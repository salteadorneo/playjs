import { toast } from 'sonner'
import { IconClose, IconPlus } from './Icons'
import { useCodeStore } from '../hooks/useCodeStore'

export default function Tabs () {
  const { current, setCurrent, codes, upsertCode, upsertCodeAndSelect, removeCode } = useCodeStore()

  function handleNewCode () {
    upsertCodeAndSelect({})
  }

  function handleRemove (code) {
    const draft = codes.find((c) => c.id === code.id)
    const index = codes.indexOf(draft)
    removeCode(code.id)

    setCurrent(codes[index - 1] || codes[index + 1] || codes[index] || null)

    toast('Code has been removed', {
      position: 'top-right',
      action: {
        label: 'Undo',
        onClick: () => {
          upsertCodeAndSelect(draft)
        }
      }
    })
  }

  return (
    <section className='basis-12 flex items-center bg-[#1a1a1a]'>
      {codes.map((code) => (
        current?.id === code.id
          ? (
            <div
              key={code.id}
              className='group relative flex items-center justify-between gap-3 text-primary h-full min-w-36 text-left px-4 bg-background'
            >
              <input
                className='w-32 truncate overflow-hidden appearance-none outline-none bg-transparent border-none text-primary'
                title={code.title}
                value={code.title}
                onChange={(e) => upsertCode({ ...code, title: e.target.value })}
                onMouseDown={(e) => {
                  if (e.button === 1) {
                    handleRemove(code)
                  }
                }}
              />
              {codes.length > 1 && (
                <button
                  className='hover:bg-[#858585]/50 rounded-full p-0.5'
                  onClick={() => handleRemove(code)}
                >
                  <IconClose size={4} />
                </button>
              )}
            </div>
            )
          : (
            <button
              key={code.id}
              onClick={() => setCurrent(code)}
              className='text-primary h-full min-w-36 text-left pl-4 pr-12 hover:bg-background'
            >
              <p
                className='w-32 truncate overflow-hidden'
                title={code.title}
              >
                {code.title}
              </p>
            </button>
            )
      ))}
      <button
        onClick={handleNewCode}
        className='text-primary h-full text-left px-4 hover:bg-background'
      >
        <IconPlus size={6} />
      </button>
    </section>
  )
}
