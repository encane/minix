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
    const stateHandler: ProxyHandler<object> = {
      get(target, prop: string) {
        const value = target[prop as keyof typeof target];
        const propertyType = typeof value;

        return propertyType !== 'object' ? value : new Proxy(value, stateHandler);
      },
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
    state = new Proxy((_state as unknown as object), stateHandler) as State;

    const getterHandler: ProxyHandler<Getters<State>> = {
      get: (object: Getters<State>, key: string) => {
        const gettersWithoutSelf: WrappedGetters = removeObjectProperty(object, key);
        const wrappedWithoutSelf = new Proxy(gettersWithoutSelf, getterHandler);

        return object[key as keyof typeof object](state, wrappedWithoutSelf);
      },
      set: () => {
        throw new Error('Getters cannot be updated. Update store state instead');
      }
    };


    getters = new Proxy(_getters, getterHandler);


    return {
      state,
      getters,
      subscribe: observer.subscribe,
      unsubscribe: observer.unsubscribe
    };
  };
};
