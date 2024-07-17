import React, {
  forwardRef,
<<<<<<< HEAD
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
=======
  useImperativeHandle,
  useRef,
  useEffect,
>>>>>>> 86e8e98753e9c0f962278d6b3a284c9269d162ab
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

<<<<<<< HEAD
    useEffect(() => {
      if (ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [readOnly]);

    useEffect(() => {
      const loadContentFromAPI = async () => {
        try {
          const response = await fetch("your-api-endpoint");
          if (!response.ok) {
            throw new Error("Failed to fetch content from API");
          }
          const { content } = await response.json();
          if (ref.current) {
            ref.current.setContents(content); // Assuming content is in Quill delta format
          }
        } catch (error) {
          console.error("Error loading content from API:", error);
          // Handle error
        }
      };

      loadContentFromAPI();

      return () => {
        // Cleanup if needed
      };
    }, []);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";
=======
    return () => {
      quillRef.current = null; // Clean up the Quill instance
    };
  }, [props.readOnly]);

  return <div id="editor-container" />;
});
>>>>>>> 86e8e98753e9c0f962278d6b3a284c9269d162ab

export default Editor;
