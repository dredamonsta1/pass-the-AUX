// import React from "react";
// import "./Dashboard.css"; // Import your CSS file for styling
// import ClickableList from "../RapperList"; // Import your RapperList component
// import UserProfile from "../userProfile/UserProfile";
// import { useNavigate } from "react-router-dom";
// import CreateArtistForm from "../CreateArtistForm/CreateArtistForm";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="dashboard-div">
//       <h1>Dashboard </h1>
//       <p>Welcome to your personalized dashboard!</p>
//       <button className="profile-button" onClick={() => navigate("/profile")}>
//         View Profile
//       </button>
//       <button
//         className="logout-button"
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}
//       >
//         Logout
//       </button>
//       <h2 style={{ marginTop: "40px" }}>Add New Rapper</h2>
//       <CreateArtistForm /> {/* Add the new form here */}
//       <h2 style={{ marginTop: "40px" }}>Manage Rappers</h2>
//       {/* Render ClickableList:
//           - showAdminActions={true} (display Delete/Edit buttons)
//           - showCloutButton={true} (display the clickable Clout button) */}
//       <ClickableList showAdminActions={true} showCloutButton={true} />
//     </div>
//   );
// };

// export default Dashboard;



//*********************New code******************** 


import React, { FC } from "react"; // Import FC for Function Component typing
import "./Dashboard.css"; // Import your CSS file for styling
import ClickableList from "../RapperList"; // Import your RapperList component (should be RapperList.tsx now)
import UserProfile from "../userProfile/UserProfile"; // Import UserProfile (ensure this file is UserProfile.tsx)
import { useNavigate } from "react-router-dom"; // useNavigate is correctly imported
import CreateArtistForm from "../CreateArtistForm/CreateArtistForm"; // Import CreateArtistForm (should be CreateArtistForm.tsx)

// Define the Dashboard component as a Function Component (FC)
const Dashboard: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-div">
      <h1>Dashboard </h1>
      <p>Welcome to your personalized dashboard!</p>

      {/* Navigation to Profile Page */}
      <button className="profile-button" onClick={() => navigate("/profile")}>
        View Profile
      </button>

      {/* Logout button */}
      <button
        className="logout-button"
        onClick={() => {
          localStorage.removeItem("token"); // Clears the authentication token
          navigate("/login"); // Navigates to the login page
        }}
      >
        Logout
      </button>

      {/* Section for adding new rappers */}
      <h2 style={{ marginTop: "40px" }}>Add New Rapper</h2>
      <CreateArtistForm /> {/* Render the form for creating artists */}

      {/* Section for managing rappers */}
      <h2 style={{ marginTop: "40px" }}>Manage Rappers</h2>
      {/* Render ClickableList component with admin actions and clout buttons */}
      <ClickableList showAdminActions={true} showCloutButton={true} />

      {/* You can optionally include UserProfile here if it's meant to be part of the dashboard layout */}
      {/* <UserProfile /> */}
    </div>
  );
};

export default Dashboard;
