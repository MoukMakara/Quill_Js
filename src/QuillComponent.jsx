import React, { useRef, useState } from "react";
import Editor from "./Editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const QuillComponent = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [description, setDescription] = useState(""); // State to hold description content
  const quillRef = useRef();
  const token = import.meta.env.VITE_API_TOKEN; // Access the token from environment variables

  // Function to handle saving the editor content
  const handleSave = async () => {
    const editor = quillRef.current?.getEditor(); // Get the Quill editor instance
    if (!editor) {
      console.error("Editor instance not available.");
      return;
    }

    const descriptionContent = editor.getText().trim(); // Get the text from the editor and trim it

    if (!descriptionContent) {
      console.error("Description content is empty.");
      return;
    }

    const payload = {
      sport_category: "2fe56924-fe8a-4ccd-8792-432fe3885692", // Example sport category ID
      slug: "test", // Example slug
      sport_name: "test", // Example sport name
      latitude: 11.567386986931638, // Example latitude
      longitude: 104.86818553686389, // Example longitude
      seat_number: 7, // Example seat number
      skill_level: "Intermediate", // Example skill level
      description: descriptionContent, // Description content
      image:
        "http://136.228.158.126:50003/media/uploads/category_b229dac6-0775-4a74-b63a-980fca53494a.jpg", // Example image URL
      reviews: "0 Reviews", // Example reviews
      profile: "", // Example profile
      cover: "", // Example cover
      price: "Unknown", // Example price
      contact_info: {
        // Example contact info
        first_phone: "098532222",
        second_phone: "",
        email: "",
        website: "",
        facebook: "",
        telegram: "",
        instagram: "",
        twitter: "",
        istad_account: "",
      },
    };

    try {
      const response = await fetch(
        "http://136.228.158.126:50003/api/sportclubs/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Use the token from environment variables
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // Get the response as text
        console.error(`Network response was not ok: ${errorText}`);
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      console.log("Content saved successfully");
    } catch (error) {
      console.error("Failed to save content", error);
    }
  };

  // Function to get the editor content text
  const handleGetContent = () => {
    const editor = quillRef.current?.getEditor(); // Get the Quill editor instance
    if (editor) {
      const editorContent = editor.getText(); // Get the text from the editor
      setDescription(editorContent.trim()); // Remove trailing newline characters
    }
  };

  return (
    <div className="ml-8 mt-8">
      <Editor
        ref={quillRef} // Attach the ref to the Editor component
        readOnly={readOnly}
      />
      <div className="controls flex space-x-2 mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
          <span>Read Only</span>
        </label>
        <button
          className="bg-blue-300 p-1 rounded-sm"
          type="button"
          onClick={handleGetContent} // Get the content text
        >
          Get Content
        </button>
        <button
          className="bg-green-300 p-1 rounded-sm"
          type="button"
          onClick={handleSave} // Call handleSave function
        >
          Save Content
        </button>
      </div>
      <div className="state mt-4">
        <div className="state-title">
          Description: {description || "Empty"}{" "}
        </div>
      </div>
    </div>
  );
};

export default QuillComponent;
