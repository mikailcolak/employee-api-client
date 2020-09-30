import { RuntimeActions, RuntimeActionTypes, SysInfo } from "./types";

export function webFontsAreLoaded(loaded: boolean): RuntimeActionTypes {
  return {
    type: RuntimeActions.WEB_FONTS_LOADED,
    webfontsAreLoaded: loaded,
  };
}

export function windowLoaded(loaded: boolean): RuntimeActionTypes {
  return {
    type: RuntimeActions.WINDOW_LOADED,
    windowLoaded: loaded,
  };
}

export function updateLocation(path: string): RuntimeActionTypes {
  return {
    type: RuntimeActions.LOCATION_CHANGED,
    path,
  };
}

export function systemDetected(system: SysInfo): RuntimeActionTypes {
  return {
    type: RuntimeActions.SYSTEM_DETECTED,
    system,
  };
}
