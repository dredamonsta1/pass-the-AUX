// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import MainList from "../MainList/MainList";
// import axiosInstance from "../../utils/axiosInstance";
// import RapperList from "../RapperList";

// const UserProfile = (props) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("token");
//       console.log("UserProfile: Token from localStorage:", token);

//       if (!token) {
//         setError("You are not logged in. Please log in to view your profile.");
//         console.log("UserProfile: No token found in localStorage.");
//         return;
//       }
//       try {
//         const response = await axiosInstance.get("/users");
//         setUser(response.data.users);
//         setLoading(false);
//       } catch (error) {
//         console.error(
//           "Error fetching user profile:",
//           error.response?.data || error.message
//         );
//         setError(error.response?.data?.message || "failed to fetch user data.");

//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     return <p>Error {error}fetching data</p>;
//   }
//   if (!user) {
//     return <div>Loading user profile.....</div>;
//   }

//   return (
//     <div>
//       <h3> user Profile </h3>
//       {user.length > 0 ? (
//         <ul>
//           {/* {user.map((user) => ( */}
//           <li>
//             <p>Username: {user.username}</p>
//             <p>Email: {user.email}</p>
//             <p>Role: {user.role}</p>
//           </li>
//           {/* ))} */}
//         </ul>
//       ) : (
//         <p>No user data found</p>
//       )}
//       {/* <RapperList /> */}
//     </div>
//   );
// };
// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import RapperList from "../RapperList"; // Uncomment if you use it

// const UserProfile = () => {
//   const [user, setUser] = useState(null); // This will now hold a single user object
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("token");
//       console.log("UserProfile: Token from localStorage:", token);

//       if (!token) {
//         setError("You are not logged in. Please log in to view your profile.");
//         console.log("UserProfile: No token found in localStorage.");
//         setLoading(false);
//         return;
//       }
//       try {
//         // --- CRITICAL CHANGE: Call the /profile endpoint ---
//         const response = await axiosInstance.get("/users/profile");

//         // --- Update state to expect a single user object ---
//         // The backend returns { message: ..., user: { id: ..., username: ..., role: ... } }
//         setUser(response.data.user); // Store the single user object from response.data.user
//         setLoading(false);
//       } catch (err) {
//         console.error(
//           "Error fetching user profile:",
//           err.response?.data || err.message
//         );
//         // Handle specific 401/403 errors if the token becomes invalid mid-session
//         if (
//           err.response &&
//           (err.response.status === 401 || err.response.status === 403)
//         ) {
//           setError(
//             "Your session has expired or is invalid. Please log in again."
//           );
//           localStorage.removeItem("token"); // Clear invalid token
//           // Optionally redirect to login page here, e.g., navigate('/login');
//         } else {
//           setError(err.response?.data?.message || "Failed to fetch user data.");
//         }
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []); // Empty dependency array means this runs once on mount

//   if (loading) {
//     return <p>Loading user profile...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>Error: {error}</p>;
//   }

//   // If loading is false and there's no error, but user is null
//   if (!user) {
//     return <div>No user data found. Please ensure you are logged in.</div>;
//   }

//   // --- Rendering for a SINGLE user object ---
//   return (
//     <div>
//       <h3>Your Profile</h3>
//       <div>
//         <p>
//           <strong>Username:</strong> {user.username}
//         </p>
//         <p>
//           <strong>Email:</strong> {user.email}
//         </p>{" "}
//         {/* Assuming email is part of req.user payload */}
//         <p>
//           <strong>Role:</strong> {user.role}
//         </p>
//         {/* Add more user details here if available in the 'user' object */}
//         {/* The `id` property from JWT is also available as user.id */}
//       </div>
//       {/* If you want to use RapperList, uncomment it and ensure it's imported */}
//       <RapperList />
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axiosInstance from "../../utils/axiosInstance";
// import RapperList from "../RapperList"; // Uncomment if you use it

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("token");
//       console.log("UserProfile: Token from localStorage:", token);

//       if (!token) {
//         setError("You are not logged in. Please log in to view your profile.");
//         console.log("UserProfile: No token found in localStorage.");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axiosInstance.get("/users/profile");

//         setUser(response.data.user);
//         setLoading(false);
//       } catch (err) {
//         console.error(
//           "Error fetching user profile:",
//           err.response?.data || err.message
//         );
//         if (
//           err.response &&
//           (err.response.status === 401 || err.response.status === 403)
//         ) {
//           setError(
//             "Your session has expired or is invalid. Please log in again."
//           );
//           localStorage.removeItem("token");
//           // Optionally redirect to login page here if you want an immediate redirect:
//           // navigate('/login');
//         } else {
//           setError(err.response?.data?.message || "Failed to fetch user data.");
//         }
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return <p>Loading user profile...</p>;
//   }

//   if (error) {
//     return (
//       <div style={{ color: "red" }}>
//         <p>Error: {error}</p>
//         <button
//           onClick={() => navigate("/")}
//           style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
//         >
//           Go to Home
//         </button>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div>
//         <p>No user data found. Please ensure you are logged in.</p>
//         <button
//           onClick={() => navigate("/")}
//           style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
//         >
//           Go to Home
//         </button>
//       </div>
//     );
//   }

//   // Rendering for a SINGLE user object
//   return (
//     <div>
//       <h3>Your Profile</h3>
//       <div>
//         <p>
//           <strong>Username:</strong> {user.username}
//         </p>
//         <p>
//           <strong>Email:</strong> {user.email}
//         </p>
//         <p>
//           <strong>Role:</strong> {user.role}
//         </p>
//       </div>

//       {/* The new button */}
//       <button
//         onClick={() => navigate("/")} // Use navigate('/') to go to the home route
//         style={{
//           marginTop: "20px", // Add some space above the button
//           padding: "10px 20px",
//           backgroundColor: "#007bff", // Example styling
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontSize: "16px",
//         }}
//       >
//         Go to Home
//       </button>

//       <RapperList />
//     </div>
//   );
// };

// export default UserProfile;



//********************New Code****************** 


import React, { useState, useEffect, FC } from "react"; // Import FC for Function Component typing
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios,{ isAxiosError } from "axios";
import axiosInstance from "../../utils/axiosInstance";
import RapperList from "../RapperList"; // Uncomment if you use it (ensure RapperList.tsx exists and is typed)

// Define the interface for the User object received from the API
interface User {
  id: number; // Assuming user_id from backend is mapped to 'id' in frontend
  username: string;
  email: string;
  role: string;
  // Add any other user properties returned by your /users/profile endpoint
}

// Define the UserProfile component as a Function Component (FC)
const UserProfile: FC = () => {
  // Explicitly type the state variables
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      console.log("UserProfile: Token from localStorage:", token);

      if (!token) {
        setError("You are not logged in. Please log in to view your profile.");
        console.log("UserProfile: No token found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get<{ user: User }>("/users/profile"); // Explicitly type the response data
        setUser(response.data.user);
        setLoading(false);
      } catch (err: unknown) { // Use 'unknown' for catch errors, then narrow down
        console.error("Error fetching user profile:", err); // Log the raw error for better debugging
        setLoading(false);

        let errorMessage = "Failed to fetch user data.";
        if (isAxiosError(error)) { // Check if it's an AxiosError
          if (error.response) {
            // Server responded with a status other than 2xx range
            console.error("Axios response error:", error.response.status, error.response.data);
            if (error.response.status === 401 || error.response.status === 403) {
              errorMessage = "Your session has expired or is invalid. Please log in again.";
              localStorage.removeItem("token");
            } else {
              errorMessage = (error.response.data as { message?: string })?.message || errorMessage;
            }
          } else if (error.request) {
            // Request was made but no response received (e.g., network error)
            console.error("Axios request error:", error.request);
            errorMessage = "Network error. Please check your internet connection.";
          } else {
            // Something else happened in setting up the request
            console.error("Axios setup error:", error.message);
            errorMessage = error.message;
          }
        } else if (err instanceof Error) { // Generic JavaScript error
            errorMessage = err.message;
        }

        setError(errorMessage);
        // Optionally redirect to login page here if you want an immediate redirect:
        // navigate('/login'); // Uncomment if immediate redirect is desired
      }
    };
    fetchUserProfile();
  }, [navigate]); // Add navigate to dependencies, as it's used inside useEffect

  // Render loading state
  if (loading) {
    return <p>Loading user profile...</p>;
  }

  // Render error state
  if (error) {
    return (
      <div style={{ color: "red" }}>
        <p>Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Render message if no user data is found (after loading and no error)
  if (!user) {
    return (
      <div>
        <p>No user data found. Please ensure you are logged in.</p>
        <button
          onClick={() => navigate("/")}
          style={{ marginTop: "10px", padding: "8px 15px", cursor: "pointer" }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  // Rendering for a SINGLE user object once loaded
  return (
    <div>
      <h3>Your Profile</h3>
      <div>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>

      {/* Button to navigate to the home route */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Go to Home
      </button>

      {/* RapperList component might be conditionally rendered based on context */}
      {/* <RapperList /> */}
    </div>
  );
};

export default UserProfile;
