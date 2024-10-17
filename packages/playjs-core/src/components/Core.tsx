import { useEffect, useState } from 'react'
import Split from 'react-split'

import { useWindowSize } from '../hooks/useWindowSize'

import Console from './Console'
import Code from './Code'

import { DIRECTION, LANGUAGE, THEME, WIDTH_MOBILE } from '../consts'

export function Core({
  code: defaultCode = '',
  width = '100dvw',
  height = '100dvh',
  direction = DIRECTION.HORIZONTAL,
  language = LANGUAGE.JAVASCRIPT,
  theme = THEME.DARK,
  onChange: updateCode = (code: string) => { },
  ia = false
}) {
  const size = useWindowSize()

  const [code, setCode] = useState(defaultCode)

  useEffect(() => {
    setCode(defaultCode)
  }, [defaultCode])

  const onChange = async ({ code = '' }) => {
    if (code == null) return

    updateCode(code)

    setCode(code)
  }

  const [sizes, setSizes] = useState([50, 50])

  function handleDragEnd(e: number[]) {
    const [left, right] = e
    setSizes([left, right])
  }

  const isMobile = size.width < WIDTH_MOBILE

  const gutterSize = isMobile ? 6 : 3

  return (
    <Split
      style={{
        display: direction === DIRECTION.HORIZONTAL ? 'flex' : 'block',
        width,
        height
      }}
      direction={direction === DIRECTION.HORIZONTAL ? 'horizontal' : 'vertical'}
      sizes={sizes}
      gutterSize={gutterSize}
      gutterStyle={() => ({
        backgroundColor: '#3f3f3f',
        width: direction === DIRECTION.HORIZONTAL ? `${gutterSize}px` : '100%',
        height: direction === DIRECTION.HORIZONTAL ? 'auto' : `${gutterSize}px`,
        cursor: direction === DIRECTION.HORIZONTAL ? 'col-resize' : 'row-resize',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: direction === DIRECTION.HORIZONTAL
          ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==")'
          : 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=")'
      })}
      onDragEnd={handleDragEnd}
    >
      <Code code={code} language={language} onChange={onChange} theme={theme} ia={ia} />
      <Console code={code} language={language} direction={direction} theme={theme} />
    </Split>
  )
}
