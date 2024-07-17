import React, { useRef, useState } from "react";
import Editor from "./Editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const QuillComponent = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState("");

  const quillRef = useRef();

  return (
    <div className="ml-8 mt-8">
      <Editor
        ref={quillRef} // Attach the ref to the Editor component
        readOnly={readOnly}
        // defaultValue={new Delta()
        //   .insert("Hello")
        //   .insert("\n", { header: 1 })
        //   .insert("Some ")
        //   .insert("initial", { bold: true })
        //   .insert(" ")
        //   .insert("content", { underline: true })
        //   .insert("\n")}
        // onSelectionChange={setRange}
        // onTextChange={setLastChange}
      />
      <div className="controls">
        <label>
          <div
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right bg-blue-300 p-1 rounded-sm"
          type="button"
          onClick={() => {
            const editorContent = quillRef.current?.getText(); // Corrected: Use getText() instead of getEditor().getText()
            setContent(editorContent.trim()); // Remove trailing newline character
          }}
        >
          Get Content
        </button>
      </div>
      <div className="state">
        <div className="state-title">getContents: {content || "Empty"} </div>
      </div>
    </div>
  );
};

export default QuillComponent;
