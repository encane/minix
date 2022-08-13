export interface IStore<State> {
  state: State,
  getters: WrappedGetters,
  subscribe(subscriber: StateSubscriber<State>): void,
  unsubscribe(subscriber: StateSubscriber<State>): void
}

export type StateSubscriber<State> = {
  (stateUpdate: StateUpdate<State>): void
}

export type StoreOptions<State> = {
  state: State,
  getters?: Getters<State>
}

export type GetterCallback<State> = {
  (state: State, getters: WrappedGetters): unknown
}

export type Getters<State> = {
  [index: string]: GetterCallback<State>
}

export type WrappedGetters = {
  [index: string]: unknown
}

export type StateUpdate<State> = {
  state: State,
  getters: WrappedGetters
}
