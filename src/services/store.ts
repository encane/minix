import { Getters, IStore, StoreOptions, StateUpdate, WrappedGetters } from '../types';
import { createObserver } from './observer';

export const defineStore = <State extends object>(store: StoreOptions<State>) => {
  const _state = { ...store.state };
  const _getters = { ...store.getters };
  const observer = createObserver<StateUpdate<State>>();

  let state: State;
  let getters: WrappedGetters;

  return (): IStore<State> => {
    const stateHandler: ProxyHandler<State> = {
      set: (obj: State, key: string, value) => {
        obj[key as keyof typeof obj] = value;
        const update: StateUpdate<State> = {
          state,
          getters
        };
        observer.notify(update);
        return true;
      }
    };
    state = new Proxy(_state, stateHandler);

    const getterHandlerHandler: ProxyHandler<Getters<State>> = {
      get: (object, key) => {
        return object[key as keyof typeof object](state, getters);
      }
    };

    getters = new Proxy(_getters, getterHandlerHandler);


    return {
      state,
      getters,
      subscribe: observer.subscribe,
      unsubscribe: observer.unsubscribe
    };
  };
};
