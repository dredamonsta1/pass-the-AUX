// // Example: src/routes/ProtectedRoute.js
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../store/authSlice"; // Your selector

// const ProtectedRoute = () => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;

// // In your App.js or router setup:
// <Routes>
//   <Route path="/login" element={<AuthForm />} />
//   <Route element={<ProtectedRoute />}>
//     <Route path="/dashboard" element={<Dashboard />} />
//     {/* Other protected routes */}
//   </Route>
// </Routes>;


//****************New C************* 


// src/routes/ProtectedRoute.tsx
import React, { FC } from "react"; // Import FC for Function Component typing
import { Navigate, Outlet } from "react-router-dom";
// Use the custom typed useSelector hook
import { useAppSelector } from "../redux/hooks";
import { selectIsLoggedIn } from "../store/authSlice"; // Your selector

// Define the ProtectedRoute component as a Function Component (FC)
const ProtectedRoute: FC = () => {
  // Use the custom typed useSelector hook to get the login status
  // TypeScript will now correctly infer the type of isLoggedIn based on selectIsLoggedIn and RootState
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  // If the user is logged in, render the child routes (Outlet)
  // Otherwise, navigate to the login page and replace the current history entry
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
