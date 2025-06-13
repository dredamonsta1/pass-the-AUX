// src/components/CreateRapperForm/CreateRapperForm.tsx (New file, or integrate into Dashboard if you have a form there)
import React, { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../../utils/axiosInstance"; // Use axiosInstance for authenticated calls

interface ArtistData {
  artist_name: string;
  genre: string;
  count: number;
  image_url: string | null;
  aka: string;
  state: string;
  region: string;
  label: string;
  mixtape: string;
  album: string;
  year: number;
  certifications: string;
}

const CreateArtistForm: React.FC = () => {
  const [artistName, setArtistName] = useState<string>("");
  const [artistGenre, setArtistGenre] = useState<string>("");
  const [artistImage, setArtistImage] = useState<File | null>(null); // State for the selected file
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 1. Create FormData object
    const formData = new FormData();
    formData.append("artist_name", artistName);
    formData.append("genre", artistGenre);
    // Append other artist details here

    // CRITICAL: Append the image file if selected
    if (artistImage) {
      formData.append("artistImage", artistImage); // 'artistImage' MUST match the fieldname in multer's upload.single()
    }

    try {
      // First, upload the image (if any) and get its URL
      let imageUrl: string | null = null;
      if (artistImage) {
        const uploadResponse = await axiosInstance.post(
          "/upload-artist-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // IMPORTANT: This header is crucial for file uploads
            },
          }
        );
        imageUrl = uploadResponse.data.imageUrl;
        setMessage("Image uploaded successfully! Now creating artist...");
      }

      // 2. Now, create the artist record in your database, potentially with the image URL
      // This assumes your /api POST endpoint for artists accepts an 'imageUrl' field
      const artistData: ArtistData = {
        artist_name: artistName,
        genre: artistGenre,
        count: 0,

        // ... other artist details
        image_url: imageUrl,
        aka: "", // Default empty string for TEXT fields
        state: "", // Default empty string for TEXT fields
        region: "", // Default empty string for TEXT fields
        label: "", // Default empty string for TEXT fields
        mixtape: "", // Default empty string for TEXT fields
        album: "", // Default empty string for TEXT fields
        year: 0, // Default 0 for INTEGER fields
        certifications: "",
      };

      // If you are uploading image and artist data in separate steps,
      // make sure your /api route for new artists can receive the imageUrl.
      // If you want to send all in one go (more complex with different content types),
      // you'd need to modify your /api post route to handle multipart/form-data directly.
      // For now, this two-step process is simpler to implement.
      const createArtistResponse = await axiosInstance.post("/", artistData);
      setMessage(
        createArtistResponse.data.message || "Artist created successfully!"
      );

      // Clear form
      setArtistName("");
      setArtistGenre("");
      setArtistImage(null);
      (document.getElementById("artistImageInput") as HTMLInputElement).value = ""; // Clear file input
    } catch (error: any) {
      console.error(
        "Error creating artist or uploading image:",
        error.response?.data || error.message
      );
      setMessage(error.response?.data?.message || "Failed to create artist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Create New Artist</h2>
      {message && (
        <p
          style={{ color: message.includes("successfully") ? "green" : "red" }}
        >
          {message}
        </p>
      )}
      <div>
        <label>Artist Name:</label>
        <input
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Genre:</label>
        <input
          type="text"
          value={artistGenre}
          onChange={(e) => setArtistGenre(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>artist Image:</label>
        <input
          type="file"
          id="artistImageInput"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setArtistImage(e.target.files ? e.target.files[0] : null)} // Store the selected file object
          accept="image/*" // Restrict to image files
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Submitting..." : "Create Artist"}
      </button>
    </form>
  );
};

export default CreateArtistForm;
