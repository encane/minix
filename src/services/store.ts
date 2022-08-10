import { Getters, Store, StoreProxy } from '../types';
import { createObserver } from './observer';

export const defineStore = <State extends object>(store: Store<State>) => {
  const _state = { ...store.state };
  const _getters = { ...store.getters };
  const observer = createObserver<StoreProxy<State>>();
  let _store: StoreProxy<State>;

  return () => {
    const stateHandler: ProxyHandler<State> = {
      set: (obj: State, key: string, value) => {
        obj[key as keyof typeof obj] = value;
        observer.notify(_store);
        return true;
      }
    };
    const state = new Proxy(_state, stateHandler);

    const getterHandlerHandler: ProxyHandler<Getters<State>> = {
      get: (object, key) => {
        return object[key as keyof typeof object](state);
      }
    };

    const getters = new Proxy(_getters, getterHandlerHandler);

    _store = {
      state,
      getters
    };

    return {
      state,
      getters,
      subscribe: observer.subscribe,
      unsubscribe: observer.unsubscribe
    };
  };
};
