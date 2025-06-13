// // src/pages/HomePage.tsx
// import React, { useEffect } from "react";
// import "./HomePage.css"; // Import your CSS file for styling
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchArtists } from "../redux/actions/artistActions"; // To ensure data is fetched if not already
// import ClickableList from "../components/RapperList"; // Re-use ClickableList for display
// import Feeds from "../components/Feeds/Feeds";

// const HomePage = () => {
//   const { artists, loading, error } = useSelector((state) => state.artists);
//   const dispatch = useDispatch();

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     // Fetch artists if not already loaded, similar to dashboard
//     if (!loading && !artists.length && !error) {
//       dispatch(fetchArtists());
//     }
//   }, [dispatch, loading, artists.length, error]);

//   if (loading) return <p>Loading artists for Home page...</p>;
//   if (error)
//     return <p style={{ color: "red" }}>Error loading artists: {error}</p>;

//   return (
//     <div className="home-page-container">
//       <h2 className="home-page-header">Home Page</h2>
//       <button
//         className="login-button"
//         onClick={() => navigate("/login")}
//         // style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
//       >
//         Go to Login
//       </button>

//       <button
//         onClick={() => navigate("/profile")}
//         style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
//       >
//         Go to Profile
//       </button>

//       <button
//         onClick={() => navigate("/dashboard")}
//         style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
//       >
//         Go to Dashboard
//       </button>

//       <h3>Artists List</h3>
//       {/* Home list probably doesn't need admin actions or clout buttons */}
//       <ClickableList
//         items={artists} // Pass artists from Redux
//         showAdminActions={false}
//         showCloutButton={false}
//       />
//       <h3>Feeds</h3>
//       {/* Include Feeds component to display feeds */}
//       <Feeds />
//     </div>
//   );
// };

// export default HomePage;



//******************New Code*************** 


// src/pages/HomePage.tsx
import React, { useEffect, FC } from "react"; // Import FC for Function Component typing
import "./HomePage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchArtists } from "../redux/actions/artistActions"; // To ensure data is fetched if not already
import ClickableList from "../components/RapperList"; // Re-use ClickableList for display
import Feeds from "../components/Feeds/Feeds"; // Assuming Feeds is Feeds.tsx now
import type { RootState, AppDispatch } from "../redux/store"; // Import types from Redux store

// Define the HomePage component as a Function Component (FC)
const HomePage: FC = () => {
  // Explicitly type the useSelector hook with RootState
  const { artists, loading, error } = useSelector((state: RootState) => state.artists);
  // Explicitly type the useDispatch hook with AppDispatch for correct thunk dispatching
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch artists if not already loaded, similar to dashboard
    // Check if loading is false, artists array is empty, and there's no error before dispatching
    if (!loading && artists.length === 0 && !error) {
      dispatch(fetchArtists());
    }
  }, [dispatch, loading, artists.length, error]); // Add error to dependencies for re-fetch on error

  // Display loading state
  if (loading) return <p>Loading artists for Home page...</p>;
  // Display error state
  if (error)
    return <p style={{ color: "red" }}>Error loading artists: {error}</p>;

  return (
    <div className="home-page-container">
      <h2 className="home-page-header">Home Page</h2>
      {/* Navigation button to Login */}
      <button
        className="login-button"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>

      {/* Navigation button to Profile */}
      <button
        onClick={() => navigate("/profile")}
        style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
      >
        Go to Profile
      </button>

      {/* Navigation button to Dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
      >
        Go to Dashboard
      </button>

      <h3>Artists List</h3>
      {/*
        Render ClickableList:
        - showAdminActions={false}
        - showCloutButton={false}
        NOTE: Your RapperList.tsx now fetches artists from Redux itself.
        Passing 'items={artists}' might be redundant if RapperList is designed
        to fetch its own data. If RapperList is meant to be a reusable
        "presentational" component that *receives* items, then you would need
        to add 'items?: Artist[]' to its ClickableListProps interface.
        For now, I've commented out the `items` prop as your RapperList.tsx
        already uses useSelector to get artists.
      */}
      <ClickableList
        // items={artists} // RapperList.tsx now gets artists from Redux directly, this prop might be redundant.
        showAdminActions={false}
        showCloutButton={false}
      />
      <h3>Feeds</h3>
      {/* Include Feeds component to display feeds */}
      <Feeds />
    </div>
  );
};

export default HomePage;
