import { useRef } from 'react';

import Editor from '@monaco-editor/react';

import { encode, decode } from 'js-base64';

function updateURL(code) {
  const hashedCode = `${encode(code)}`
  window.history.replaceState(null, null, `/${hashedCode}`)
}

const { pathname } = window.location
const hashCode = pathname.slice(1);

const defaultValue = hashCode ? decode(hashCode) : `/*
* Bienvenido a PlayJS
*
* Escribe código JavaScript para pruebas y demos rápidamente
*
*/

const holaMundo = () => '👋🌎'

holaMundo()
`;

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

    if (editor.getValue()) showResult();
  }

  const showResult = () => {
    const code = editorRef.current.getValue();
    updateURL(code);
    if (!code) {
      document.querySelector('#result').innerHTML = '';
      return;
    }
    const lines = code.trim().split(/\r?\n|\r|\n/g).length;
    let result = window.innerWidth > 860 ? '\n'.repeat(lines - 1) : '';

    try {
      const html = eval(code);
      switch (typeof html) {
        case 'object':
          result += JSON.stringify(html);
          break;
        case 'string':
          result += `'${html}'`;
          break;
        case 'function':
          result += html();
          break;
        case 'symbol':
          result += html.toString();
          break;
        default:
          result += html;
      }
    } catch (err) {
      result += err;
    }
    document.querySelector('#result').innerHTML = result;
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
          defaultValue={defaultValue}
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
