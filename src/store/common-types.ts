export interface PagedData<T> {
  itemsPerPage?: Number,
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
