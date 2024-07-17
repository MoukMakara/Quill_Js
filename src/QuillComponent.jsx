import React, { useRef, useState } from "react";
import Editor from "./Editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const QuillComponent = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [description, setDescription] = useState(""); // State to hold description content
  const [sportCategory, setSportCategory] = useState(""); // State for sport_category
  const [slug, setSlug] = useState(""); // State for slug
  const [sportName, setSportName] = useState(""); // State for sport_name
  const [latitude, setLatitude] = useState(""); // State for latitude
  const [longitude, setLongitude] = useState(""); // State for longitude
  const [seatNumber, setSeatNumber] = useState(""); // State for seat_number
  const [skillLevel, setSkillLevel] = useState(""); // State for skill_level
  const [image, setImage] = useState(""); // State for image URL
  const [reviews, setReviews] = useState(""); // State for reviews
  const [profile, setProfile] = useState(""); // State for profile
  const [cover, setCover] = useState(""); // State for cover
  const [price, setPrice] = useState(""); // State for price
  const [contactInfo, setContactInfo] = useState({
    firstPhone: "",
    secondPhone: "",
    email: "",
    website: "",
    facebook: "",
    telegram: "",
    instagram: "",
    twitter: "",
    istadAccount: "",
  }); // State for contact_info

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

    // Construct payload with form inputs and editor content
    const payload = {
      sport_category: sportCategory, // Use form input value
      slug: slug, // Use form input value
      sport_name: sportName, // Use form input value
      latitude: parseFloat(latitude), // Convert to float
      longitude: parseFloat(longitude), // Convert to float
      seat_number: parseInt(seatNumber, 10), // Convert to integer
      skill_level: skillLevel, // Use form input value
      description: descriptionContent, // Editor content
      image: image, // Use form input value
      reviews: reviews, // Use form input value
      profile: profile, // Use form input value
      cover: cover, // Use form input value
      price: price, // Use form input value
      contact_info: { // Use form input values
        first_phone: contactInfo.firstPhone,
        second_phone: contactInfo.secondPhone,
        email: contactInfo.email,
        website: contactInfo.website,
        facebook: contactInfo.facebook,
        telegram: contactInfo.telegram,
        instagram: contactInfo.instagram,
        twitter: contactInfo.twitter,
        istad_account: contactInfo.istadAccount,
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
      <div className="form mt-4">
        <div className="form-group mb-2">
          <label htmlFor="sportCategory" className="block mb-1">Sport Category ID</label>
          <input
            id="sportCategory"
            type="text"
            value={sportCategory}
            onChange={(e) => setSportCategory(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="slug" className="block mb-1">Slug</label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="sportName" className="block mb-1">Sport Name</label>
          <input
            id="sportName"
            type="text"
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="latitude" className="block mb-1">Latitude</label>
          <input
            id="latitude"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="longitude" className="block mb-1">Longitude</label>
          <input
            id="longitude"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="seatNumber" className="block mb-1">Seat Number</label>
          <input
            id="seatNumber"
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="skillLevel" className="block mb-1">Skill Level</label>
          <input
            id="skillLevel"
            type="text"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="image" className="block mb-1">Image URL</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="reviews" className="block mb-1">Reviews</label>
          <input
            id="reviews"
            type="text"
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="profile" className="block mb-1">Profile</label>
          <input
            id="profile"
            type="text"
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="cover" className="block mb-1">Cover</label>
          <input
            id="cover"
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price" className="block mb-1">Price</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="form-group mb-2">
          <label className="block mb-1">Contact Info</label>
          <input
            type="text"
            placeholder="First Phone"
            value={contactInfo.firstPhone}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                firstPhone: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Second Phone"
            value={contactInfo.secondPhone}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                secondPhone: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Email"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Website"
            value={contactInfo.website}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                website: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Facebook"
            value={contactInfo.facebook}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                facebook: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Telegram"
            value={contactInfo.telegram}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                telegram: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Instagram"
            value={contactInfo.instagram}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                instagram: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Twitter"
            value={contactInfo.twitter}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                twitter: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
          <input
            type="text"
            placeholder="Istad Account"
            value={contactInfo.istadAccount}
            onChange={(e) =>
              setContactInfo((prev) => ({
                ...prev,
                istadAccount: e.target.value,
              }))
            }
            className="border p-2 w-full mb-2"
          />
        </div>
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
