export interface PagedData<T> {
  size?: Number,
  page?: Number,
  total?: Number,
  items: Array<T>
}

export enum LoadingState {
  NotLoaded = "NotLoaded",
  Loading = "Loading",
  Loaded = "Loaded",
  CouldNotBeLoaded = "CouldNotBeLoaded",
}
