import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { LANGUAGE } from '../consts'
import { encodeCode } from '../core/encode'

const TAB_DEFAULT_TITLE = 'Untitled'

const code = `// Bienvenido a PlayJS

const holaMundo = () => '👋🌎'

holaMundo()
`

const DEFAULT_CODES = [{
  id: crypto.randomUUID(),
  title: 'Example',
  code,
  hashedCode: encodeCode(code)
}]

export const useCodeStore = create(
  persist((set, get) => ({
    current: DEFAULT_CODES[0],
    setCurrent: (current) => set({ current }),
    codes: DEFAULT_CODES,
    upsertCode: ({ id, ...props }) => set(() => {
      const codes = [...get().codes]
      const index = codes.findIndex((c) => c.id === id)
      if (index !== -1) {
        codes[index] = {
          ...codes[index],
          ...props
        }
      } else {
        const newCode = {
          id: crypto.randomUUID(),
          title: TAB_DEFAULT_TITLE,
          code: '',
          hashedCode: '',
          language: LANGUAGE.JAVASCRIPT,
          ...props
        }
        codes.push(newCode)
      }
      return { codes }
    }),
    upsertCodeAndSelect: ({ id, ...props }) => set((state) => {
      const codes = [...get().codes]
      const index = codes.findIndex((c) => c.id === id)
      if (index !== -1) {
        codes[index] = {
          ...codes[index],
          ...props
        }
        state.current = codes[index]
      } else {
        const newCode = {
          id: crypto.randomUUID(),
          title: TAB_DEFAULT_TITLE,
          code: '',
          hashedCode: '',
          language: LANGUAGE.JAVASCRIPT,
          ...props
        }
        codes.push(newCode)
        state.current = newCode
      }
      return { codes }
    }),
    removeCode: (id) => set(() => {
      const codes = [...get().codes]
      const index = codes.findIndex((c) => c.id === id)
      if (index !== -1) {
        codes.splice(index, 1)
      }
      return { codes }
    })
  }),
  {
    name: 'playjs-storage'
  }
  )
)
