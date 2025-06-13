// // src/redux/reducers/artistsReducer.js
// import {
//   FETCH_ARTISTS_REQUEST,
//   FETCH_ARTISTS_SUCCESS,
//   FETCH_ARTISTS_FAILURE,
//   INCREMENT_CLOUT_REQUEST,
//   INCREMENT_CLOUT_SUCCESS,
//   INCREMENT_CLOUT_FAILURE,
// } from "../actions/artistActions";

// interface Artist {
//   artist_id: number;
//   count: number;
//   // ...add other artist properties as needed...
//   [key: string]: any;
// }

// interface ArtistsState {
//   artists: Artist[];
//   loading: boolean;
//   error: string | null;
// }

// interface FetchArtistsRequestAction {
//   type: typeof FETCH_ARTISTS_REQUEST;
// }

// interface FetchArtistsSuccessAction {
//   type: typeof FETCH_ARTISTS_SUCCESS;
//   payload: Artist[];
// }

// interface FetchArtistsFailureAction {
//   type: typeof FETCH_ARTISTS_FAILURE;
//   payload: string;
// }

// interface IncrementCloutRequestAction {
//   type: typeof INCREMENT_CLOUT_REQUEST;
// }

// interface IncrementCloutSuccessAction {
//   type: typeof INCREMENT_CLOUT_SUCCESS;
//   payload: { artistId: number };
// }

// interface IncrementCloutFailureAction {
//   type: typeof INCREMENT_CLOUT_FAILURE;
//   payload: { artistId: number; error: string };
// }

// type ArtistsAction =
//   | FetchArtistsRequestAction
//   | FetchArtistsSuccessAction
//   | FetchArtistsFailureAction
//   | IncrementCloutRequestAction
//   | IncrementCloutSuccessAction
//   | IncrementCloutFailureAction;

// const initialState: ArtistsState = {
//   artists: [],
//   loading: false,
//   error: null,
// };

// const artistsReducer = (
//   state: ArtistsState = initialState,
//   action: ArtistsAction
// ): ArtistsState => {
//   switch (action.type) {
//     case FETCH_ARTISTS_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case FETCH_ARTISTS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         artists: action.payload, // Set the fetched artists
//         error: null,
//       };
//     case FETCH_ARTISTS_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload, // Store the error message
//       };
//     case INCREMENT_CLOUT_REQUEST:
//       // You could implement an optimistic update here (increment before API confirms)
//       // For now, we'll wait for SUCCESS to ensure consistency with backend
//       return { ...state };
//     case INCREMENT_CLOUT_SUCCESS:
//       const { artistId } = action.payload;
//       return {
//         ...state,
//         artists: state.artists
//           .map(
//             (
//               artist // Find the artist and increment their count
//             ) =>
//               artist.artist_id === artistId
//                 ? { ...artist, count: artist.count + 1 }
//                 : artist
//           )
//           .sort((a, b) => b.count - a.count), // Re-sort after update for consistent display
//       };
//     case INCREMENT_CLOUT_FAILURE:
//       // Handle the failure. If you did an optimistic update, you'd revert it here.
//       console.error(
//         "Clout increment failed for artist:",
//         action.payload.artistId,
//         action.payload.error
//       );
//       return { ...state, error: action.payload.error };
//     default:
//       return state;
//   }
// };

// export default artistsReducer;



//****************** New Code*******************


// src/redux/reducers/artistsReducer.tsx
import {
  FETCH_ARTISTS_REQUEST,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_FAILURE,
  INCREMENT_CLOUT_REQUEST,
  INCREMENT_CLOUT_SUCCESS,
  INCREMENT_CLOUT_FAILURE,
} from "../actions/artistActions";
import { AnyAction } from "@reduxjs/toolkit"; // Import AnyAction from Redux Toolkit

// Define the interface for an individual Artist object
interface Artist {
  artist_id: number;
  name?: string;
  genre?: string;
  image_url?: string;
  count: number;
  state?: string;
  region?: string;
  label?: string;
  mixtape?: string;
  album?: string;
  year?: number;
  certifications?: string;
  // Add any other properties here if they exist in your actual artist data.
}

// Define the shape of the artists slice of state
interface ArtistsState {
  artists: Artist[];
  loading: boolean;
  error: string | null;
}

// Define specific action interfaces for type safety
interface FetchArtistsRequestAction {
  type: typeof FETCH_ARTISTS_REQUEST;
}

interface FetchArtistsSuccessAction {
  type: typeof FETCH_ARTISTS_SUCCESS;
  payload: Artist[];
}

interface FetchArtistsFailureAction {
  type: typeof FETCH_ARTISTS_FAILURE;
  payload: string; // The error message
}

interface IncrementCloutRequestAction {
  type: typeof INCREMENT_CLOUT_REQUEST;
}

interface IncrementCloutSuccessAction {
  type: typeof INCREMENT_CLOUT_SUCCESS;
  payload: { artistId: number };
}

interface IncrementCloutFailureAction {
  type: typeof INCREMENT_CLOUT_FAILURE;
  payload: { artistId: number; error: string }; // Artist ID and the error message
}

// This union type is good for *dispatching* actions, but the reducer's
// action parameter needs to be compatible with AnyAction from Redux Toolkit.
// We'll keep this for clarity on the structure of our specific actions.
type ArtistsAction =
  | FetchArtistsRequestAction
  | FetchArtistsSuccessAction
  | FetchArtistsFailureAction
  | IncrementCloutRequestAction
  | IncrementCloutSuccessAction
  | IncrementCloutFailureAction;

const initialState: ArtistsState = {
  artists: [],
  loading: false,
  error: null,
};

// The reducer function
// The 'action' parameter is typed as 'AnyAction' to satisfy configureStore's requirements.
// Inside the switch, TypeScript's control flow analysis helps narrow down the 'action' type.
const artistsReducer = (
  state: ArtistsState = initialState,
  action: AnyAction // Type the action parameter as AnyAction to resolve compatibility with configureStore
): ArtistsState => {
  switch (action.type) {
    case FETCH_ARTISTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTISTS_SUCCESS:
      // Type assertion for payload, as AnyAction doesn't guarantee payload type by default.
      // TypeScript's narrowing will often handle this when action.type is known,
      // but explicit assertion (as Artist[]) adds safety and clarity.
      return {
        ...state,
        loading: false,
        artists: action.payload as Artist[], // Ensure payload matches Artist[]
        error: null,
      };
    case FETCH_ARTISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string, // Ensure payload is a string
      };
    case INCREMENT_CLOUT_REQUEST:
      return { ...state };
    case INCREMENT_CLOUT_SUCCESS:
      // Destructure and assert type for the payload
      const { artistId: successArtistId } = action.payload as { artistId: number };
      return {
        ...state,
        artists: state.artists
          .map(
            (artist) =>
              artist.artist_id === successArtistId
                ? { ...artist, count: artist.count + 1 }
                : artist
          )
          .sort((a, b) => b.count - a.count),
      };
    case INCREMENT_CLOUT_FAILURE:
      // Destructure and assert type for the payload
      const { artistId: failureArtistId, error: actionError } = action.payload as { artistId: number; error: string };
      console.error(
        "Clout increment failed for artist:",
        failureArtistId,
        actionError
      );
      return { ...state, error: actionError };
    default:
      // Ensure the reducer handles unknown actions gracefully.
      // Returning the current state for unknown actions is standard practice.
      return state;
  }
};

export default artistsReducer;
