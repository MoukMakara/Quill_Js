import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Quill from "quill";

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

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

export default Editor;
