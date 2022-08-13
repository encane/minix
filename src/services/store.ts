import { Getters, IStore, StoreOptions, StateUpdate, WrappedGetters } from '../types';
import { createObserver } from './observer';
import { removeObjectProperty } from '../utils/removeObjectProperty';

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
      get: (object: Getters<State>, key: string) => {
        const wrappedWithoutSelf = removeObjectProperty(object, key);

        return object[key as keyof typeof object](state, wrappedWithoutSelf);
      },
      set: () => {
        throw new Error('Getters cannot be updated. Update store state instead');
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
