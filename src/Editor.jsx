import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import Quill from "quill";

const Editor = forwardRef((props, ref) => {
  const quillRef = useRef();

  useImperativeHandle(ref, () => ({
    getEditor: () => quillRef.current, // Return the Quill instance itself
    getText: () => quillRef.current?.getText(), // Method to get the text
    getHTML: () => quillRef.current?.root.innerHTML, // Method to get HTML content
  }));

  useEffect(() => {
    quillRef.current = new Quill("#editor-container", {
      theme: "snow",
      readOnly: props.readOnly,
      modules: {
        toolbar: true, // Enable the toolbar (set as per your requirement)
      },
    });

    return () => {
      quillRef.current = null; // Clean up the Quill instance
    };
  }, [props.readOnly]);

  return <div id="editor-container" />;
});

export default Editor;
