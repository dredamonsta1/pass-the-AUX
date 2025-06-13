// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchArtists } from "../../redux/actions/artistActions"; // To ensure data is fetched if not already
// import ClickableList from "../../components/RapperList"; // Re-use ClickableList for display
// import UserProfile from "../../components/userProfile/UserProfile";

// const ProfilePage = () => {
//   const { artists, loading, error } = useSelector((state) => state.artists);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch artists if not already loaded, similar to dashboard
//     if (!loading && !artists.length && !error) {
//       dispatch(fetchArtists());
//     }
//   }, [dispatch, loading, artists.length, error]);

//   if (loading) return <p>Loading artists for Profile page...</p>;
//   if (error)
//     return <p style={{ color: "red" }}>Error loading artists: {error}</p>;

//   return (
//     <div>
//       {/* Profile list probably doesn't need admin actions or clout buttons */}
//       <h2>Your Profile</h2>
//       {/* Display user profile information */}
//       <UserProfile />
//       {/* <ClickableList showAdminActions={true} showCloutButton={true} /> */}
//       {/* Include UserProfile component to display user details */}
//     </div>
//   );
// };
// export default ProfilePage;


//**********************Nerw  Code**********************


import React, { useEffect, FC } from "react"; // Import FC for Function Component typing
import { useNavigate } from "react-router-dom"; // useNavigate is imported, though not used in the current render return
// Change: Import custom typed hooks instead of direct react-redux hooks
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchArtists } from "../../redux/actions/artistActions"; // To ensure data is fetched if not already
import ClickableList from "../../components/RapperList"; // Re-use ClickableList for display
import UserProfile from "../../components/userProfile/UserProfile"; // UserProfile (should be UserProfile.tsx now)

// Define the ProfilePage component as a Function Component (FC)
const ProfilePage: FC = () => {
  // Use the custom typed useSelector hook. Type inference should now work correctly.
  const { artists, loading, error } = useAppSelector((state) => state.artists);
  // Use the custom typed useDispatch hook.
  const dispatch = useAppDispatch();

  // useNavigate is imported but not explicitly used in the current component's JSX or logic,
  // beyond a potential future use if navigation buttons are added.
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch artists if not already loaded, similar to dashboard
    // Check if loading is false, artists array is empty, and there's no error before dispatching
    if (!loading && artists.length === 0 && !error) {
      dispatch(fetchArtists());
    }
  }, [dispatch, loading, artists.length, error]); // Add error to dependencies for re-fetch on error

  // Display loading state
  if (loading) return <p>Loading artists for Profile page...</p>;
  // Display error state
  if (error)
    return <p style={{ color: "red" }}>Error loading artists: {error}</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      {/* Display user profile information using the UserProfile component */}
      <UserProfile />

      {/*
        The ClickableList component is commented out in your original code.
        If you intend to use it here, uncomment it.
        Remember, RapperList.tsx now fetches artists from Redux itself,
        so passing 'items' as a prop might be redundant if that's its design.
      */}
      {/* <ClickableList showAdminActions={true} showCloutButton={true} /> */}
    </div>
  );
};

export default ProfilePage;



