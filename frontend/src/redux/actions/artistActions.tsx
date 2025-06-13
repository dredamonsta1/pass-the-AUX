// // src/redux/actions/artistActions.js
// import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// import { ThunkDispatch } from "redux-thunk";
// import { AnyAction } from "redux";

// // Action Types
// export const FETCH_ARTISTS_REQUEST = "FETCH_ARTISTS_REQUEST";
// export const FETCH_ARTISTS_SUCCESS = "FETCH_ARTISTS_SUCCESS";
// export const FETCH_ARTISTS_FAILURE = "FETCH_ARTISTS_FAILURE";

// export const INCREMENT_CLOUT_REQUEST = "INCREMENT_CLOUT_REQUEST";
// export const INCREMENT_CLOUT_SUCCESS = "INCREMENT_CLOUT_SUCCESS";
// export const INCREMENT_CLOUT_FAILURE = "INCREMENT_CLOUT_FAILURE";

// // Async Action Creator for fetching artists
// export const fetchArtists = () => async (
//   dispatch: ThunkDispatch<any, any, ArtistActionTypes>
// ) => {
//   dispatch({ type: FETCH_ARTISTS_REQUEST });
//   try {
//     const response = await axiosInstance.get("/");
//     // Ensure data.rappers is an array and each item has a 'count'
//     const artists: Artist[] = (
//       Array.isArray(response.data.rappers)
//         ? response.data.rappers
//         : [response.data.rappers]
//     ).map((artist: any) => ({ ...artist, count: artist.count || 0 }));
//     dispatch({ type: FETCH_ARTISTS_SUCCESS, payload: artists });
//   } catch (error: any) {
//     console.error("Error fetching artists:", error);
//     dispatch({ type: FETCH_ARTISTS_FAILURE, payload: error.message });
//   }
// };

// // Async Action Creator for incrementing clout
// export const incrementClout = (artistId: string) => async (
//   dispatch: ThunkDispatch<any, any, ArtistActionTypes>
// ) => {
//   // Optionally dispatch a REQUEST action for optimistic UI updates
//   dispatch({ type: INCREMENT_CLOUT_REQUEST, payload: artistId });
//   try {
//     // Make API call to backend to increment clout
//     const response = await axiosInstance.put(`/rappers/${artistId}/clout`);
//     // Assuming backend returns a success message or confirmation
//     dispatch({ type: INCREMENT_CLOUT_SUCCESS, payload: { artistId } });
//   } catch (error: any) {
//     console.error(
//       `Error incrementing clout for artist ${artistId}:`,
//       error.response?.data || error.message
//     );
//     // Dispatch failure action to revert optimistic update or show error
//     dispatch({
//       type: INCREMENT_CLOUT_FAILURE,
//       payload: { artistId, error: error.response?.data || error.message },
//     });
//   }
// };

// export interface Artist {
//   id: string;
//   name: string;
//   count: number;
//   // Add other artist properties as needed
// }

// export interface FetchArtistsRequestAction {
//   type: typeof FETCH_ARTISTS_REQUEST;
// }

// export interface FetchArtistsSuccessAction {
//   type: typeof FETCH_ARTISTS_SUCCESS;
//   payload: Artist[];
// }

// export interface FetchArtistsFailureAction {
//   type: typeof FETCH_ARTISTS_FAILURE;
//   payload: string;
// }

// export interface IncrementCloutRequestAction {
//   type: typeof INCREMENT_CLOUT_REQUEST;
//   payload: string;
// }

// export interface IncrementCloutSuccessAction {
//   type: typeof INCREMENT_CLOUT_SUCCESS;
//   payload: { artistId: string };
// }

// export interface IncrementCloutFailureAction {
//   type: typeof INCREMENT_CLOUT_FAILURE;
//   payload: { artistId: string; error: string };
// }

// export type ArtistActionTypes =
//   | FetchArtistsRequestAction
//   | FetchArtistsSuccessAction
//   | FetchArtistsFailureAction
//   | IncrementCloutRequestAction
//   | IncrementCloutSuccessAction
//   | IncrementCloutFailureAction;



//******************New C******************** 


// src/redux/actions/artistActions.tsx
import axios, { isAxiosError } from "axios"; // Import axios and isAxiosError directly
import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct
// Import necessary types from Redux Toolkit and your store
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux"; // Used for ThunkAction type
import type { RootState, AppDispatch } from "../store"; // Import types from Redux store

// Action Types - It's good practice to define these as const assertions for better type inference
export const FETCH_ARTISTS_REQUEST = "FETCH_ARTISTS_REQUEST" as const;
export const FETCH_ARTISTS_SUCCESS = "FETCH_ARTISTS_SUCCESS" as const;
export const FETCH_ARTISTS_FAILURE = "FETCH_ARTISTS_FAILURE" as const;

export const INCREMENT_CLOUT_REQUEST = "INCREMENT_CLOUT_REQUEST" as const;
export const INCREMENT_CLOUT_SUCCESS = "INCREMENT_CLOUT_SUCCESS" as const;
export const INCREMENT_CLOUT_FAILURE = "INCREMENT_CLOUT_FAILURE" as const;

// Define the interface for an individual Artist object (consistent with artistsReducer.tsx)
// Make sure this matches the actual structure returned by your backend API
export interface Artist {
  artist_id: number; // Changed from 'id: string' to 'artist_id: number' for consistency
  name?: string;
  genre?: string;
  image_url?: string;
  count: number;
  // Add other properties from your backend schema if they are used or expected
  aka?: string;
  state?: string;
  region?: string;
  label?: string;
  mixtape?: string;
  album?: string;
  year?: number;
  certifications?: string;
}

// Interfaces for each specific action
export interface FetchArtistsRequestAction {
  type: typeof FETCH_ARTISTS_REQUEST;
}

export interface FetchArtistsSuccessAction {
  type: typeof FETCH_ARTISTS_SUCCESS;
  payload: Artist[]; // Payload is an array of Artist objects
}

export interface FetchArtistsFailureAction {
  type: typeof FETCH_ARTISTS_FAILURE;
  payload: string; // Payload is the error message
}

export interface IncrementCloutRequestAction {
  type: typeof INCREMENT_CLOUT_REQUEST;
  payload: number; // Payload is the artist ID (changed to number for consistency)
}

export interface IncrementCloutSuccessAction {
  type: typeof INCREMENT_CLOUT_SUCCESS;
  payload: { artistId: number }; // Payload includes the artistId (changed to number)
}

export interface IncrementCloutFailureAction {
  type: typeof INCREMENT_CLOUT_FAILURE;
  payload: { artistId: number; error: string }; // Payload includes artistId and error (changed artistId to number)
}

// Union type for all possible Artist actions
export type ArtistActionTypes =
  | FetchArtistsRequestAction
  | FetchArtistsSuccessAction
  | FetchArtistsFailureAction
  | IncrementCloutRequestAction
  | IncrementCloutSuccessAction
  | IncrementCloutFailureAction;

// Define a common ThunkAction type for all async artist actions
// This helps ensure type safety for thunks
// Corrected: Changed 'unknown' to 'undefined' for the extra argument
type ArtistThunk = ThunkAction<void, RootState, undefined, ArtistActionTypes>;


// Async Action Creator for fetching artists
export const fetchArtists = (): ArtistThunk => async (
  dispatch: AppDispatch // Use AppDispatch for thunk's dispatch
) => {
  dispatch({ type: FETCH_ARTISTS_REQUEST });
  try {
    // Explicitly type the expected response structure from your backend
    // Assuming backend returns { artists: Artist[] }
    const response = await axiosInstance.get<{ artists: Artist[] }>("/");

    // Ensure data.artists is an array. Your backend's index.js now returns { artists: [...] }
    const artists: Artist[] = Array.isArray(response.data.artists)
      ? response.data.artists
      : []; // Default to empty array if unexpected structure
      
    dispatch({ type: FETCH_ARTISTS_SUCCESS, payload: artists });
  } catch (error: unknown) { // Use unknown for catch errors, then narrow down
    let errorMessage = "Failed to fetch artists.";
    if (isAxiosError(error)) { // Use isAxiosError from axios
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error fetching artists:", error); // Log the raw error
    dispatch({ type: FETCH_ARTISTS_FAILURE, payload: errorMessage });
  }
};

// Async Action Creator for incrementing clout
export const incrementClout = (artistId: number): ArtistThunk => async ( // Changed artistId type to number
  dispatch: AppDispatch // Use AppDispatch for thunk's dispatch
) => {
  // Optionally dispatch a REQUEST action for optimistic UI updates
  // Ensure payload type matches IncrementCloutRequestAction
  dispatch({ type: INCREMENT_CLOUT_REQUEST, payload: artistId });
  try {
    // Make API call to backend to increment clout
    // Assuming backend returns a success message or confirmation
    const response = await axiosInstance.put(`/artists/${artistId}/clout`); // Updated endpoint for consistency
    // Dispatch success action
    dispatch({ type: INCREMENT_CLOUT_SUCCESS, payload: { artistId } });
  } catch (error: unknown) { // Use unknown for catch errors, then narrow down
    let errorMessage = "Failed to increment clout.";
    if (isAxiosError(error)) { // Use isAxiosError from axios
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(
      `Error incrementing clout for artist ${artistId}:`,
      errorMessage,
      error // Log the raw error
    );
    // Dispatch failure action to revert optimistic update or show error
    dispatch({
      type: INCREMENT_CLOUT_FAILURE,
      payload: { artistId, error: errorMessage },
    });
  }
};
