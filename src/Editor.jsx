import React, { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import Quill from "quill";

const Editor = forwardRef((props, ref) => {
  const quillContainerRef = useRef();
  const quillInstanceRef = useRef();

  useImperativeHandle(ref, () => ({
    getEditor() {
      return quillInstanceRef.current; // Access the Quill editor instance
    },
  }));

  useEffect(() => {
    if (!quillInstanceRef.current) { // Only initialize Quill if it hasn't been already
      const quill = new Quill(quillContainerRef.current, {
        theme: "snow",
        readOnly: props.readOnly,
        // Other Quill configurations
      });
      quillInstanceRef.current = quill; // Attach Quill instance to ref
    } else {
      quillInstanceRef.current.enable(!props.readOnly); // Update readOnly state
    }
  }, [props.readOnly]);

  return <div ref={quillContainerRef} />;
});

export default Editor;
