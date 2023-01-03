import { useRef } from "react";
import Split from "react-split";
import Editor from "@monaco-editor/react";

import packageInfo from "../package.json";
const { version } = packageInfo;

import { encode, decode } from "js-base64";
import { useWindowSize } from "./hooks/useWindowSize";

function updateURL(code) {
  const hashedCode = `${encode(code)}`;
  window.history.replaceState(null, null, `/${hashedCode}`);
}

function getCodeFromURL() {
  try {
    const { pathname } = window.location;
    const hashCode = pathname.slice(1);
    return hashCode ? decode(hashCode) : null;
  } catch {
    return null;
  }
}

const defaultValue =
  getCodeFromURL() ||
  `/*
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

const WIDTH_MOBILE = 480;

export default function App() {
  const editorRef = useRef(null);
  const size = useWindowSize();

  const isMobile = size.width < WIDTH_MOBILE;

  function formatDocument() {
    editorRef.current.getAction("editor.action.formatDocument").run();
  }

  function handleInit(editor) {
    editorRef.current = editor;
    editor.focus();

    if (editor.getValue()) showResult();
  }

  const showResult = () => {
    const code = editorRef.current.getValue();
    updateURL(code);
    if (!code) {
      document.querySelector("#result").innerHTML = "";
      return;
    }
    const lines = code.trim().split(/\r?\n|\r|\n/g).length;
    let result = isMobile ? "" : "\n".repeat(lines - 1);

    try {
      const html = eval(code);
      switch (typeof html) {
        case "object":
          result += JSON.stringify(html);
          break;
        case "string":
          result += `'${html}'`;
          break;
        case "function":
          result += html();
          break;
        case "symbol":
          result += html.toString();
          break;
        default:
          result += html;
      }
    } catch (err) {
      result += err;
    }
    document.querySelector("#result").innerHTML = result;
  };

  function handleEditorChange(value, event) {
    throttle(showResult, 800);
  }

  return (
    <>
      <div className="toolbar">
        <button onClick={formatDocument} title="Format document">
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path d="M14 6h14v2H14zm0 6h14v2H14zm-7 6h21v2H7zm0 6h21v2H7zM4 13.59 7.29 10 4 6.41 5.42 5l4.62 5-4.62 5L4 13.59z" />
            <path
              data-name="&lt;Transparent Rectangle&gt;"
              d="M0 0h32v32H0z"
              fill="none"
            />
          </svg>
        </button>
      </div>
      <Split
        className="split"
        direction={isMobile ? "vertical" : "horizontal"}
        minSize={200}
        gutterSize={isMobile ? 6 : 2}
      >
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
              formatOnPaste: true,
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
              inlineSuggest: {
                enabled: true,
              },
              overviewRulerLanes: 0,
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                handleMouseWheel: false,
              },
            }}
          />
        </div>
        <div>
          <div id="result" />
        </div>
      </Split>
      <span className="version">v.{version}</span>
    </>
  );
}
