export type Store<State> = {
  state: State
  getters?: Getters<State>
}

export type StoreProxy<State> = {
  state: State
  getters: Getters<State>
}

export type GetterCallback<State> = {
  (state: State): unknown
}

export type Getters<State> = {
  [index: string]: GetterCallback<State>
}
