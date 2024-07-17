import React, { forwardRef, useImperativeHandle } from "react";
import Quill from "quill";

const Editor = forwardRef((props, ref) => {
  const quillContainerRef = React.useRef();

  useImperativeHandle(ref, () => ({
    getEditor() {
      return quillContainerRef.current?.quill; // Access the Quill editor instance
    },
  }));

  React.useEffect(() => {
    const quill = new Quill(quillContainerRef.current, {
      theme: "snow",
      readOnly: props.readOnly,
      // Other Quill configurations
    });
    quillContainerRef.current.quill = quill; // Attach Quill instance to ref
  }, [props.readOnly]);

  return <div ref={quillContainerRef} />;
});

export default Editor;
