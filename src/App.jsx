import { useRef, useState } from "react";
import Split from "react-split";
import Editor from "@monaco-editor/react";
import JSMonacoLinter from "monaco-js-linter";
import { encode, decode } from "js-base64";

import { useWindowSize } from "./hooks/useWindowSize";

import Logo from "./components/Logo";
import ShareIcon from "./assets/ShareIcon";
import FormatIcon from "./assets/FormatIcon";
import DownloadIcon from "./assets/DownloadIcon";

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
  `// Bienvenido a PlayJS

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

  const [direction, setDirection] = useState(isMobile ? "vertical" : "horizontal");
  const [lines, setLines] = useState(0);

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

  function shareURL() {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  }

  function downloadCode() {
    const code = editorRef.current.getValue();
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "playjs.js";
    link.href = url;
    link.click();
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

    setLines(code.split(/\r?\n|\r|\n/g).length);

    code
      .trimEnd()
      .split(/\r?\n|\r|\n/g)
      .reduce((acc, line) => {
        if (line.trim() === "") {
          result += "\n";
          return acc + "\n";
        }

        const htmlPart = acc + line;

        if (
          line ||
          line === "" ||
          !line.startsWith(/\/\//) ||
          !line.startsWith(/\/*/)
        ) {
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

      {/* <div className="toolbar">
        <button
          className="button-toolbar"
          onClick={shareURL}
          title="Share code"
        >
          <ShareIcon />
        </button>
      </div> */}

      <Split
        className="split"
        direction={direction}
        gutterSize={isMobile ? 6 : 3}
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
              automaticLayout: true,
              fontLigatures: true,
              formatOnPaste: true,
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
              fontFamily: "monospace",
            }}
          />
          <div className="editor-toolbar">
            <button
              className="button-toolbar"
              onClick={formatDocument}
              title="Format document"
            >
              <FormatIcon />
            </button>
            <button
              className="button-toolbar"
              onClick={downloadCode}
              title="Download code"
            >
              <DownloadIcon />
            </button>
            {/* <button onClick={toggleLinter} title="Format document">
              Linter
            </button> */}
          </div>
        </div>
        <div style={{ display: "flex", paddingTop: "24px" }}>
          <div
            style={{
              width: "68px",
              textAlign: "center",
            }}
          >
            {Array.from(Array(lines).keys()).map((index) => {
              return <span key={index} style={{
                display: "block",
                width: "68px",
                color: "#858585",
                fontSize: "14px",
                lineHeight: "19px",
              }}>{index + 1}</span>;
            })}
          </div>
          <div id="result" />
        </div>
      </Split>
    </>
  );
}
