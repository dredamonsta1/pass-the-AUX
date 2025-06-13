import React, { useState, ChangeEvent, FormEvent, FC } from "react";
import axios, { AxiosResponse, isAxiosError } from "axios"; // Import isAxiosError
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice"; // Corrected import path, assuming authSlice.ts now
import { useNavigate } from "react-router-dom"; // Typo corrected: react-router-dom
import "./Signup.css";
// Import AppDispatch type from your Redux store
import type { AppDispatch } from "../../redux/store";
import axiosInstance from "@/utils/axiosInstance";

// Define the structure of user data expected in the login response
interface UserData {
  id: number;
  username: string;
  role: string;
  // Add other user properties returned by your login/profile API if any
}

// Interface for the form data
interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

// Interface for the full authentication response payload
interface AuthResponseData {
  message: string;
  token?: string;
  user?: UserData; // Use the UserData interface here
}

// AuthForm component typed as a Function Component
const AuthForm: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false); // true for signup, false for login
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    role: "", // Optional, backend has a default
  });
  const [message, setMessage] = useState<string>("");

  // Type useDispatch with AppDispatch for correct thunk dispatching
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  //const BASE_URL = "https://ninebyfourapi.herokuapp.com/api"; // Your backend base URL

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Explicitly type the return value of handleAuth as a Promise resolving to AxiosResponse<AuthResponseData>
  const handleAuth = async (): Promise<AxiosResponse<AuthResponseData>> => {
    let response: AxiosResponse<AuthResponseData>; // Explicitly type response
    if (isSignUp) {
      // Register
      // const url = `${BASE_URL}/users/register`;
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role || "user",
      };
      response = await axiosInstance.post<AuthResponseData>('/users/register', payload, { // Type axios.post response
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // Login
      // const url = `${BASE_URL}/users/login`;
      const payload = {
        username: formData.username,
        password: formData.password,
      };
      response = await axiosInstance.post<AuthResponseData>('/users/login', payload, { // Type axios.post response
        headers: { "Content-Type": "application/json" },
      });
    }
    return response; // Return the response object from the API call
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await handleAuth(); // Call handleAuth to make the request
      setMessage(response.data.message);
      console.log("Response from handleAuth:", response.data);

      if (!isSignUp && response.data.token) {
        // If it's a login and a token is received
        // Destructure with explicit types from response.data
        const { token, user } = response.data;

        console.log("LOGIN SUCCESS: Token received:", token);
        if (token) { // Ensure token is not undefined before storing
          localStorage.setItem("token", token); // Store token in localStorage
          console.log(
            "LOGIN SUCCESS: Token stored in localStorage:",
            localStorage.getItem("token")
          );
        }
        if (user) { // Ensure user is not undefined before dispatching
           dispatch(setCredentials({ user, token: token || null })); // Dispatch credentials to Redux store
        }
        navigate("/dashboard"); // Redirect to a protected page
      } else if (isSignUp) {
        // After successful signup, offer to log in or show success
        setIsSignUp(false); // Switch to login form
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "",
        });
      }
    } catch (error: unknown) { // Use 'unknown' for catch errors, then narrow down
      console.error("Authentication error:", error); // Log raw error for debugging

      let errorMessage = "An unexpected error occurred. Please try again.";
      if (isAxiosError(error)) { // Use isAxiosError from axios
        if (error.response) {
          // Server responded with a status other than 2xx range
          errorMessage = (error.response.data as { message?: string })?.message || errorMessage;
        } else if (error.request) {
          // Request was made but no response received
          errorMessage = "No response from server. Please check your network connection.";
        } else {
          // Something else happened in setting up the request
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="inner-container">
        <h2 className="text-xl font-bold mb-4 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        {message && (
          <p
            className={`text-center ${message.includes("success") ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="onSubmit-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="email-text-box"
            required
          />
          {isSignUp && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="email-text-box"
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="password-text-box"
            required
          />
          {isSignUp && (
            <input
              type="text"
              name="role"
              placeholder="Role (e.g., user, admin - optional)"
              value={formData.role}
              onChange={handleChange}
              className="role-text-box"
            />
          )}

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage("");
              setFormData({
                username: "",
                email: "",
                password: "",
                role: "",
              });
            }}
            className="signup-button"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
