export const initialAuthState: AuthState = {
  webflowToken: null,
  isLoading: true,
  error: null,
};
export interface AuthState {
  webflowToken: string | null;
  isLoading: boolean;
  error: Error | null;
}

export type AuthAction =
  | { type: "SET_TOKEN"; payload: string }
  | { type: "CLEAR_TOKEN" }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: Error };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        webflowToken: action.payload,
        isLoading: false,
      };
    case "CLEAR_TOKEN":
      return {
        ...state,
        webflowToken: null,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
