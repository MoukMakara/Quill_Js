import React, { useRef, useState } from 'react';
import Editor from './Editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

const QuillComponent = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [description, setDescription] = useState(''); // State to hold description content
  const quillRef = useRef();
  const token = import.meta.env.VITE_API_TOKEN; // Access the token from environment variables

  // Function to handle saving the editor content
  const handleSave = async () => {
    const editor = quillRef.current?.getEditor(); // Get the Quill editor instance
    if (!editor) {
      console.error('Editor instance not available.');
      return;
    }

    const descriptionContent = editor.getText().trim(); // Get the text from the editor and trim it

    try {
      await fetch('http://136.228.158.126:50003/api/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the token from environment variables
        },
        body: JSON.stringify({
          description: descriptionContent, // Send only the description content
          // Include other fields as needed
          sport_category: '741de643-e108-4b09-8027-e3edb386846f', // Example field
          title: 'New Event', // Example field
          thumbnail: 'event_thumbnail.png', // Example field
          location: 'New Location', // Example field
          date: '2024-01-01T00:00:00Z', // Example field
          contact_info: 'new_contact_info', // Example field
          about: 'new_about', // Example field
          ticket_price: 100.00, // Example field
          ticket_reference: 'new_ticket_reference', // Example field
          venue_map: 'new_venue_map', // Example field
        }),
      });
      console.log('Content saved successfully');
    } catch (error) {
      console.error('Failed to save content', error);
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

  const getEditorContents = () => {
    if (quillRef.current) {
      const editorContent = quillRef.current.getText(0); // Adjust index and length as needed
      setContent(editorContent.trim()); // Remove trailing newline character
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
        <div className="state-title">Description: {description || 'Empty'} </div>
      </div>
    </div>
  );
};

export default QuillComponent;
