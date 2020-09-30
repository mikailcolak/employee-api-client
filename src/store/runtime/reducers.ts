import { RuntimeActions, RuntimeState, RuntimeActionTypes } from "./types";

export const initialState: RuntimeState = {
  webfontsAreLoaded: false,
  windowLoaded: false,
  locationPath: "/",
  system: undefined,
};

export function runtimeReducer(
  state = initialState,
  action: RuntimeActionTypes
): RuntimeState {
  switch (action.type) {
    case RuntimeActions.WEB_FONTS_LOADED: {
      return {
        ...state,
        webfontsAreLoaded: action.webfontsAreLoaded,
      };
    }
    case RuntimeActions.WINDOW_LOADED: {
      return {
        ...state,
        windowLoaded: action.windowLoaded,
      };
    }
    case RuntimeActions.LOCATION_CHANGED: {
      return {
        ...state,
        locationPath: action.path,
      };
    }
    case RuntimeActions.SYSTEM_DETECTED: {
      return {
        ...state,
        system: action.system,
      };
    }
    default:
      return state;
  }
}
