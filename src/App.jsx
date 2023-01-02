import { useRef } from 'react';

import Editor from '@monaco-editor/react';

let throttlePause;
const throttle = (callback, time) => {
  if (throttlePause) return;
  throttlePause = true;
  setTimeout(() => {
    callback();
    throttlePause = false;
  }, time);
};

export default function App() {
  const editorRef = useRef(null);

  function handleInit(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  const showResult = () => {
    document.querySelector('#result').innerHTML = '';

    const code = editorRef.current.getValue();
    const lines = code.trim().split(/\r?\n|\r|\n/g).length;
    document.querySelector('#result').innerHTML = '\n'.repeat(lines - 1);

    try {
      const html = eval(code);

      if (!html && html !== false && html !== 0) {
        document.querySelector('#result').innerHTML = '';
        return;
      }

      switch (typeof html) {
        case 'object':
          document.querySelector('#result').innerHTML += JSON.stringify(html);
          break;
        case 'string':
          document.querySelector('#result').innerHTML += `'${html}'`;
          break;
        case 'function':
          document.querySelector('#result').innerHTML += html();
          break;
        default:
          document.querySelector('#result').innerHTML += html;
      }
    } catch (err) {
      document.querySelector('#result').innerHTML += err;
    }
  };

  function handleEditorChange(value, event) {
    throttle(showResult, 800);
  }

  return (
    <section className="container">
      <div>
        <Editor
          className="editor"
          language="javascript"
          theme="vs-dark"
          onMount={handleInit}
          onChange={handleEditorChange}
          loading=""
          options={{
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            inlineSuggest: {
              enabled: true,
            },
            overviewRulerLanes: 0,
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
              handleMouseWheel: false,
            },
          }}
        />
      </div>
      <div>
        <div id="result" />
      </div>
    </section>
  );
}
