// import { useReducer } from "react";
// import { authReducer, initialAuthState } from "../reducers/authRecucers";
// import { getToken } from "./slider-utils";

// export function useAuth() {
//   const [state, dispatch] = useReducer(authReducer, initialAuthState);

//   const initializeAuth = async () => {
//     const storedToken = localStorage.getItem("webflow-jwt");

//     if (storedToken) {
//       dispatch({ type: "SET_TOKEN", payload: storedToken });
//       return;
//     }

//     try {
//       const token = await getToken();
//       if (token) {
//         localStorage.setItem("webflow-jwt", token.token);
//         dispatch({ type: "SET_TOKEN", payload: token.token });
//       }
//     } catch (error) {
//       dispatch({ type: "SET_ERROR", payload: error as Error });
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("webflow-jwt");
//     dispatch({ type: "CLEAR_TOKEN" });
//   };

//   return {
//     ...state,
//     initializeAuth,
//     logout,
//   };
// }
