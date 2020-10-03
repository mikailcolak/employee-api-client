export interface PagedData<T> {
  itemsPerPage: number,
  page: number,
  total: number,
  items: Array<T>
}

export enum LoadingState {
  NotLoaded = "NotLoaded",
  Loading = "Loading",
  Loaded = "Loaded",
  CouldNotBeLoaded = "CouldNotBeLoaded",
}

export interface Loadable {
  contentState: LoadingState,
  error?: string,
}
