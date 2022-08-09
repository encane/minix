import { defineStore } from '../../src/services/store';
import { createObserver } from '../..//src/services/observer';

jest.mock('../../src/services/observer', () => {
  const originalModule = jest.requireActual('../../src/services/observer');

  return {
    __esModule: true,
    ...originalModule,
    createObserver: jest.fn().mockReturnValue({
      subscribe: jest.fn(),
      notify: jest.fn(),
      unsubscribe: jest.fn()
    })
  };
});

type State = {
  string: string,
  number: number
}

const state: State = {
  string: 'foo',
  number: 1
};

const getters = {
  getStringAndNumber: (state) => {
    return `${state.string} ${state.number}`;
  },
  getNewString: (state) => {
    return `New ${state.string}`;
  }
};

describe('tests the store.ts service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('tests setup of a store', () => {
    it('should setup an observer', () => {
      defineStore<State>({ state });

      expect(createObserver).toBeCalledTimes(1);
    });
    it('should setup state', () => {
      const useStore = defineStore<State>({ state });

      const { store } = useStore();

      expect(store.state).toEqual(state);
    });
    it('should setup getters', () => {
      const useStore = defineStore<State>({ state, getters });
      const { store } = useStore();

      for (const [key, getter] of Object.entries(getters)) {
        const getterValue = getter(store.state);

        expect(store.getters[key]).toBe(getterValue);
      }
    });
  });

  describe('tests returned properties from store', () => {
    it('should return a function', () => {
      const useStore = defineStore<State>({ state });
      expect(typeof useStore).toBe('function');
    });
    describe('tests the returned properties from returned function', () => {
      it('should contain a store object', () => {
        const useStore = defineStore<State>({ state });
        const store = useStore();
        expect(store).toHaveProperty('store');
      });
      it('should contain a subscribe function', () => {
        const useStore = defineStore<State>({ state });
        const store = useStore();
        expect(store).toHaveProperty('store');
      });
      it('should contain a unsubscribe function', () => {
        const useStore = defineStore<State>({ state });
        const store = useStore();
        expect(store).toHaveProperty('store');
      });
    });
  });

  describe('tests state management and updates', () => {
    describe('tests state updates', () => {
      it('should update the state value', (() => {
        const useStore = defineStore<State>({ state, getters });
        const { store } = useStore();
        const stateUpdate = 17;
        const oldNumber = state.number;

        expect(store.state.number).toBe(oldNumber);
        store.state.number = stateUpdate;
        expect(store.state.number).toBe(stateUpdate);
      }));
      it('should update getters', () => {
        const useStore = defineStore<State>({ state, getters });
        const { store } = useStore();
        const stateUpdate = 'bar';
        const expectedGetter = `New ${stateUpdate}`;

        store.state.string = stateUpdate;

        expect(store.getters.getNewString).toBe(expectedGetter);
      });
      it('should notify subscribers on state update', () => {
        const useStore = defineStore<State>({ state, getters });
        const { store } = useStore();
        store.state.number = 0;

        expect(createObserver().notify).toBeCalledTimes(1);
      });
    });
  });
});
