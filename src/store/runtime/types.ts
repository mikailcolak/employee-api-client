export interface SysInfo {
  name?: string;
  version?: string;
  versionNumber?: number;
  mobile?: boolean;
  os?: string;
}

export interface RuntimeState {
  webfontsAreLoaded: boolean;
  windowLoaded: boolean;
  locationPath: string;
  system?: SysInfo;
}

export enum RuntimeActions {
  WEB_FONTS_LOADED = "RUNTIME_WEBFONTS_LOADED",
  WINDOW_LOADED = "RUNTIME_WINDOW_LOADED",
  LOCATION_CHANGED = "LOCATION_CHANGED",
  SYSTEM_DETECTED = "SYSTEM_DETECTED",
}

interface WebFontsLoadedAction {
  type: typeof RuntimeActions.WEB_FONTS_LOADED;
  webfontsAreLoaded: boolean;
}

interface WindowLoaded {
  type: typeof RuntimeActions.WINDOW_LOADED;
  windowLoaded: boolean;
}

interface LocationChanged {
  type: typeof RuntimeActions.LOCATION_CHANGED;
  path: string;
}

interface SystemDetected {
  type: typeof RuntimeActions.SYSTEM_DETECTED;
  system: SysInfo;
}

export type RuntimeActionTypes =
  | WebFontsLoadedAction
  | WindowLoaded
  | LocationChanged
  | SystemDetected;
