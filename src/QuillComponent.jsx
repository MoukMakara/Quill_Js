import React, { useRef, useState } from "react";
import Editor from "./Editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const QuillComponent = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [content, setContent] = useState("");
  const quillRef = useRef();

  const getEditorContents = () => {
    if (quillRef.current) {
      const editorContent = quillRef.current.getText(0); // Adjust index and length as needed
      setContent(editorContent.trim()); // Remove trailing newline character
    }
  };

  return (
    <div className="ml-8 mt-8">
      <Editor ref={quillRef} readOnly={readOnly} />
      <div className="controls">
        <button
          className="controls-right bg-blue-300 p-1 rounded-sm"
          type="button"
          onClick={getEditorContents}
        >
          Get Content
        </button>
      </div>
      <div className="state">
        <div className="state-title">getContents: {content || "Empty"}</div>
      </div>
    </div>
  );
};

export default QuillComponent;
