// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./RapperList.css";
// import axiosInstance from "../utils/axiosInstance";
// import { fetchArtists, incrementClout } from "../redux/actions/artistActions";
// import RootState from "../redux/store"; // adjust the path if needed
// import AppDispatch from "../redux/store"; // <-- changed to default import

// interface Artist {
//   artist_id: number;
//   name?: string;
//   genre?: string;
//   image_url?: string;
//   count: number;
// }

// interface ClickableListProps {
//   showAdminActions: boolean;
//   showCloutButton: boolean;
// }

// const ClickableList = ({
//   showAdminActions,
//   showCloutButton,
// }: ClickableListProps) => {
//   const { artists, loading, error } = useSelector((state: RootState) => state.artists);
//   const dispatch = useDispatch<AppDispatch>(); // <-- add generic type here

//   const API_BASE_URL = "https://ninebyfourapi.herokuapp.com";

//   useEffect(() => {
//     if (!loading && !artists.length && !error) {
//       dispatch(fetchArtists());
//     }
//   }, [dispatch, loading, artists.length, error]);

//   if (loading) return <p>Loading artists...</p>;
//   if (error)
//     return <p style={{ color: "red" }}>Error fetching data: {error}</p>;

//   const handleCloutClick = (artistId: number) => {
//     dispatch(incrementClout(artistId.toString()));
//   };

//   const handleDelete = async (artistId: number) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this artist?"
//     );
//     if (!confirmDelete) return;

//     try {
//       // Corrected endpoint for DELETE, assuming it needs '/api/rappers' as a base
//       // and then the artist_id as a parameter or segment.
//       // If your DELETE endpoint is truly '/api?artist_id=...', keep that.
//       // But based on the PUT request, it's more likely /api/rappers/:id
//       const response = await axiosInstance.delete(`/rappers/${artistId}`); // Adjusted DELETE endpoint
//       alert(response.data.message);
//       dispatch(fetchArtists());
//     } catch (err: any) {
//       console.error(
//         "Error deleting artist:",
//         err.response?.data || err.message
//       );
//       alert(err.response?.data?.message || "Failed to delete artist.");
//     }
//   };

//   const handleEdit = (artistId: number) => {
//     alert(`Editing artist with ID: ${artistId}`);
//   };

//   return (
//     <div className="rapperList-outter-div">
//       <ul className="rapperList">
//         {artists.map((item: Artist) => (
//           <li className="rapperList-item" key={item.artist_id}>
//             {/* Image must be a direct child and will be absolutely positioned */}
//             {item.image_url && (
//               <img
//                 src={`${API_BASE_URL}${item.image_url}`}
//                 alt={item.name || "Artist"}
//                 className="rapperList-item-image" // This class has absolute positioning
//               />
//             )}

//             {/* All content overlaid on the image goes inside this new wrapper */}
//             <div className="rapperList-content-overlay">
//               {/* Artist Name and Genre */}
//               <div className="rapperList-item-details">
//                 <h3>{item.name || "N/A"}</h3>
//                 <p>Genre: {item.genre || "N/A"}</p>
//               </div>

//               {/* Section for Clout Item (image removed from here) */}
//               <div className="rapperList-item-clout-section">
//                 {showCloutButton ? (
//                   <button
//                     className="rapperButton"
//                     onClick={() => handleCloutClick(item.artist_id)}
//                   >
//                     Clout: {item.count}
//                   </button>
//                 ) : (
//                   <p className="clout-data-display">
//                     Clout: <span>{item.count}</span>
//                   </p>
//                 )}
//               </div>

//               {/* Admin Action Buttons */}
//               {showAdminActions && (
//                 <div className="rapperList-admin-actions">
//                   <button onClick={() => handleDelete(item.artist_id)}>
//                     Delete
//                   </button>
//                   <button onClick={() => handleEdit(item.artist_id)}>
//                     Edit
//                   </button>
//                 </div>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ClickableList;



//*****************new code*******************
 


// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "./RapperList.css";
// import axiosInstance from "../utils/axiosInstance"; // Assuming axiosInstance is properly typed
// import { fetchArtists, incrementClout } from "../redux/actions/artistActions";
// // Correct way to import types from Redux store for TypeScript
// import type { RootState, AppDispatch } from "../redux/store";

// // Define the interface for an individual Artist object
// interface Artist {
//   artist_id: number;
//   name?: string; // Optional if not always present
//   genre?: string; // Optional
//   image_url?: string; // Added image_url as it's used
//   count: number;
//   // Add other properties from your database schema if they are used or expected
//   state?: string;
//   region?: string;
//   label?: string;
//   mixtape?: string;
//   album?: string;
//   year?: number;
//   certifications?: string;
// }

// // Define the props interface for the ClickableList component
// interface ClickableListProps {
//   showAdminActions: boolean;
//   showCloutButton: boolean;
//   // If this component also receives an 'items' prop directly (e.g., from HomePage),
//   // uncomment the following line and ensure the prop is passed correctly.
//   // items?: Artist[];
// }

// const ClickableList = ({
//   showAdminActions,
//   showCloutButton,
// }: ClickableListProps) => {
//   // Explicitly type the useSelector hook with RootState
//   // This extracts the 'artists' slice from the Redux state
//   const { artists, loading, error } = useSelector((state: RootState) => state.artists);
//   // Explicitly type the useDispatch hook with AppDispatch for correct thunk dispatching
//   const dispatch = useDispatch<AppDispatch>();

//   // Base URL for API calls. Consider storing this in a .env file for dynamic environments.
//   const API_BASE_URL = "https://ninebyfourapi.herokuapp.com";

//   useEffect(() => {
//     // Fetch artists when the component mounts or dependencies change.
//     // The condition ensures we only fetch if not already loading, no artists are present, and no error occurred.
//     if (!loading && artists.length === 0 && !error) {
//       dispatch(fetchArtists());
//     }
//   }, [dispatch, loading, artists.length, error]); // Include 'error' in dependencies for re-fetching on error

//   // Display loading state
//   if (loading) return <p>Loading artists...</p>;
//   // Display error state
//   if (error)
//     return <p style={{ color: "red" }}>Error fetching data: {error}</p>;

//   // Handler for incrementing clout
//   const handleCloutClick = (artistId: number) => {
//     // Ensure incrementClout action can correctly handle a string ID if your backend expects it.
//     // If your backend expects a number, pass artistId directly: dispatch(incrementClout(artistId));
//     dispatch(incrementClout(artistId.toString()));
//   };

//   // Handler for deleting an artist
//   const handleDelete = async (artistId: number) => {
//     // IMPORTANT: In a Canvas environment, avoid window.confirm/alert.
//     // Implement a custom modal or notification UI instead for better user experience.
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this artist?"
//     );
//     if (!confirmDelete) return;

//     try {
//       // Reverted the DELETE endpoint to match the backend's expectation (/api?artist_id=...).
//       // If your backend's DELETE endpoint changes to /api/artists/:id, update this line:
//       // const response = await axiosInstance.delete(`/api/artists/${artistId}`);
//       const response = await axiosInstance.delete(`/api`, { params: { artist_id: artistId } });
//       alert(response.data.message); // Replace with custom UI
//       dispatch(fetchArtists()); // Refresh the artist list after successful deletion
//     } catch (err: any) {
//       console.error(
//         "Error deleting artist:",
//         err.response?.data || err.message
//       );
//       alert(err.response?.data?.message || "Failed to delete artist."); // Replace with custom UI
//     }
//   };

//   // Handler for editing an artist
//   const handleEdit = (artistId: number) => {
//     // IMPORTANT: In a Canvas environment, avoid alert. Implement custom UI.
//     alert(`Editing artist with ID: ${artistId}`);
//     // In a real application, this would typically navigate to an edit form or open a modal.
//   };

//   return (
//     <div className="rapperList-outter-div">
//       <ul className="rapperList">
//         {/* Map over the artists array, ensuring each item is typed as Artist */}
//         {artists.map((item: Artist) => (
//           <li className="rapperList-item" key={item.artist_id}>
//             {/* Conditionally render image if image_url exists */}
//             {item.image_url && (
//               <img
//                 src={`${API_BASE_URL}${item.image_url}`}
//                 alt={item.name || "Artist"}
//                 className="rapperList-item-image" // This class likely has absolute positioning
//               />
//             )}

//             {/* Content overlaid on the image goes inside this wrapper */}
//             <div className="rapperList-content-overlay">
//               {/* Artist Name and Genre Details */}
//               <div className="rapperList-item-details">
//                 <h3>{item.name || "N/A"}</h3> {/* Use "N/A" if name is undefined */}
//                 <p>Genre: {item.genre || "N/A"}</p> {/* Use "N/A" if genre is undefined */}
//               </div>

//               {/* Section for Clout button or display */}
//               <div className="rapperList-item-clout-section">
//                 {showCloutButton ? (
//                   <button
//                     className="rapperButton"
//                     onClick={() => handleCloutClick(item.artist_id)}
//                   >
//                     Clout: {item.count}
//                   </button>
//                 ) : (
//                   <p className="clout-data-display">
//                     Clout: <span>{item.count}</span>
//                   </p>
//                 )}
//               </div>

//               {/* Admin Action Buttons (Delete, Edit) */}
//               {showAdminActions && (
//                 <div className="rapperList-admin-actions">
//                   <button onClick={() => handleDelete(item.artist_id)}>
//                     Delete
//                   </button>
//                   <button onClick={() => handleEdit(item.artist_id)}>
//                     Edit
//                   </button>
//                 </div>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ClickableList;


//********************NEW******************* 

import React, { useEffect } from "react";
// Change: Import custom typed hooks instead of direct react-redux hooks
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import "./RapperList.css";
import axiosInstance from "../utils/axiosInstance"; // Assuming axiosInstance is properly typed
import { fetchArtists, incrementClout } from "../redux/actions/artistActions";
// Re-import RootState for explicit typing of the selector callback
import type { RootState } from "../redux/store"; 

// Define the interface for an individual Artist object
export interface Artist { // Exporting interface to be reusable in other files
  artist_id: number;
  name?: string; // Optional if not always present
  genre?: string; // Optional
  image_url?: string; // Added image_url as it's used
  count: number;
  // Add other properties from your database schema if they are used or expected
  state?: string;
  region?: string;
  label?: string;
  mixtape?: string;
  album?: string;
  year?: number;
  certifications?: string;
}

// Define the props interface for the ClickableList component
interface ClickableListProps {
  showAdminActions: boolean;
  showCloutButton: boolean;
  // If this component also receives an 'items' prop directly (e.g., from HomePage),
  // uncomment the following line and ensure the prop is passed correctly.
  // items?: Artist[];
}

const ClickableList = ({
  showAdminActions,
  showCloutButton,
}: ClickableListProps) => {
  // Use the custom typed useSelector hook, and explicitly type 'state' as RootState.
  const { artists, loading, error } = useAppSelector((state: RootState) => state.artists);
  // Use the custom typed useDispatch hook.
  const dispatch = useAppDispatch();

  // Base URL for API calls. Consider storing this in a .env file for dynamic environments.
  const API_BASE_URL = "http://localhost:3010/uploads/{filename}";

  useEffect(() => {
    // Fetch artists when the component mounts or dependencies change.
    // The condition ensures we only fetch if not already loading, no artists are present, and no error occurred.
    if (!loading && artists.length === 0 && !error) {
      dispatch(fetchArtists());
    }
  }, [dispatch, loading, artists.length, error]); // Include 'error' in dependencies for re-fetching on error

  // Display loading state
  if (loading) return <p>Loading artists...</p>;
  // Display error state
  if (error)
    return <p style={{ color: "red" }}>Error fetching data: {error}</p>;

  // Handler for incrementing clout
  const handleCloutClick = (artistId: number) => {
    // incrementClout now expects a number, based on artistActions.tsx
    dispatch(incrementClout(artistId));
  };

  // Handler for deleting an artist
  const handleDelete = async (artistId: number) => {
    // IMPORTANT: In a Canvas environment, avoid window.confirm/alert.
    // Implement a custom modal or notification UI instead for better user experience.
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this artist?"
    );
    if (!confirmDelete) return;

    try {
      // Reverted the DELETE endpoint to match the backend's expectation (/api?artist_id=...).
      // If your backend's DELETE endpoint changes to /api/artists/:id, update this line:
      // const response = await axiosInstance.delete(`/api/artists/${artistId}`);
      const response = await axiosInstance.delete(`/api`, { params: { artist_id: artistId } });
      alert(response.data.message); // Replace with custom UI
      dispatch(fetchArtists()); // Refresh the artist list after successful deletion
    } catch (err: any) { // Consider refining this 'any' type with AxiosError checking
      console.error(
        "Error deleting artist:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Failed to delete artist."); // Replace with custom UI
    }
  };

  // Handler for editing an artist
  const handleEdit = (artistId: number) => {
    // IMPORTANT: In a Canvas environment, avoid alert. Implement custom UI.
    alert(`Editing artist with ID: ${artistId}`);
    // In a real application, this would typically navigate to an edit form or open a modal.
  };

  return (
    <div className="rapperList-outter-div">
      <ul className="rapperList">
        {/* Map over the artists array, ensuring each item is typed as Artist */}
        {artists.map((item: Artist) => (
          <li className="rapperList-item" key={item.artist_id}>
            {/* Conditionally render image if image_url exists */}
            {item.image_url && (
              <img
                src={`${API_BASE_URL}${item.image_url}`}
                alt={item.name || "Artist"}
                className="rapperList-item-image" // This class likely has absolute positioning
              />
            )}

            {/* All content overlaid on the image goes inside this new wrapper */}
            <div className="rapperList-content-overlay">
              {/* Artist Name and Genre */}
              <div className="rapperList-item-details">
                <h3>{item.name || "N/A"}</h3> {/* Use "N/A" if name is undefined */}
                <p>Genre: {item.genre || "N/A"}</p> {/* Use "N/A" if genre is undefined */}
              </div>

              {/* Section for Clout Item (image removed from here) */}
              <div className="rapperList-item-clout-section">
                {showCloutButton ? (
                  <button
                    className="rapperButton"
                    onClick={() => handleCloutClick(item.artist_id)}
                  >
                    Clout: {item.count}
                  </button>
                ) : (
                  <p className="clout-data-display">
                    Clout: <span>{item.count}</span>
                  </p>
                )}
              </div>

              {/* Admin Action Buttons */}
              {showAdminActions && (
                <div className="rapperList-admin-actions">
                  <button onClick={() => handleDelete(item.artist_id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEdit(item.artist_id)}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClickableList;
