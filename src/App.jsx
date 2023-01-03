import { useRef } from "react";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import JSMonacoLinter from 'monaco-js-linter';

import packageInfo from "../package.json";
const { version } = packageInfo;

import { encode, decode } from "js-base64";
import { useWindowSize } from "./hooks/useWindowSize";
import Logo from "./components/Logo";

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

let linter;
const WIDTH_MOBILE = 480;

export default function App() {
  const editorRef = useRef(null);
  const size = useWindowSize();

  const isMobile = size.width < WIDTH_MOBILE;

  window.console.log = function (...data) {
    return parseResultHTML(...data);
  };

  function handleInit(editor, monaco) {
    editorRef.current = editor;

    linter = new JSMonacoLinter(editor, monaco, {
      esversion: 11,
    });

    editor.focus();

    if (editor.getValue()) showResult();
  }

  function formatDocument() {
    editorRef.current.getAction("editor.action.formatDocument").run();
  }

  function toggleLinter() {
    linter.watch();
  }

  const showResult = () => {
    const code = editorRef.current.getValue();

    updateURL(code);

    if (!code) {
      document.querySelector("#result").innerHTML = "";
      return;
    }

    let result = "";

    code.trimEnd().split(/\r?\n|\r|\n/g).reduce((acc, line) => {
      if (line.trim() === "") {
        result += "\n";
        return acc + "\n";
      }

      const htmlPart = acc + line;

      if (line || line === "" || !line.startsWith(/\/\//) || !line.startsWith(/\/*/)) {
        try {
          const html = eval(htmlPart);
          result += parseResultHTML(html) + "\n";
        } catch (err) {
          if (err.toString().match(/ReferenceError/gi)) {
            result += err;
          }
          result += "\n";
        }
      }
      return htmlPart + "\n";
    }, "");

    document.querySelector("#result").innerHTML = result;
  };

  function parseResultHTML(html) {
    if (typeof html === "object") {
      return JSON.stringify(html);
    }
    if (typeof html === "string") {
      // start o end with ' or "
      if (html.match(/^['"].*['"]$/)) return html;
      return `'${html}'`;
    }
    if (typeof html === "function") {
      return html();
    }
    if (typeof html === "symbol") {
      return html.toString();
    }
    if (typeof html === "undefined") {
      return "";
    }
    return html;
  }

  function handleEditorChange(value, event) {
    throttle(showResult, 800);
  }

  return (
    <>
      <Logo />
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
        {/* <button onClick={toggleLinter} title="Format document">
          Linter
        </button> */}
      </div>
      <Split
        className="split"
        direction={isMobile ? "vertical" : "horizontal"}
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
