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

const testState: State = {
  string: 'foo',
  number: 1
};

const testGetters = {
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
      defineStore<State>({ state: testState });

      expect(createObserver).toBeCalledTimes(1);
    });
    it('should setup state', () => {
      const useStore = defineStore<State>({ state: testState });

      const { state } = useStore();

      expect(state).toEqual(state);
    });
    it('should setup getters', () => {
      const useStore = defineStore<State>({ state: testState, getters: testGetters });
      const { state, getters } = useStore();

      for (const [key, getter] of Object.entries(testGetters)) {
        const getterValue = getter(state);

        expect(getters[key]).toBe(getterValue);
      }
    });
  });

  describe('tests returned properties from store', () => {
    it('should return a function', () => {
      const useStore = defineStore<State>({ state:testState });
      expect(typeof useStore).toBe('function');
    });
    describe('tests the returned properties from returned function', () => {
      it('should contain a state object', () => {
        const useStore = defineStore<State>({ state: testState });
        const store = useStore();
        expect(store).toHaveProperty('state');
      });
      it('should contain a getters object', () => {
        const useStore = defineStore<State>({ state: testState });
        const store = useStore();
        expect(store).toHaveProperty('getters');
      });
      it('should contain a subscribe function', () => {
        const useStore = defineStore<State>({ state: testState });
        const store = useStore();
        expect(store).toHaveProperty('subscribe');
      });
      it('should contain a unsubscribe function', () => {
        const useStore = defineStore<State>({ state: testState });
        const store = useStore();
        expect(store).toHaveProperty('unsubscribe');
      });
    });
  });

  describe('tests state management and updates', () => {
    describe('tests state updates', () => {
      it('should update the state value', (() => {
        const useStore = defineStore<State>({ state: testState, getters: testGetters });
        const { state } = useStore();
        const stateUpdate = 17;
        const oldNumber = testState.number;

        expect(state.number).toBe(oldNumber);
        state.number = stateUpdate;
        expect(state.number).toBe(stateUpdate);
      }));
      it('should update getters', () => {
        const useStore = defineStore<State>({ state: testState, getters: testGetters });
        const { state, getters } = useStore();
        const stateUpdate = 'bar';
        const expectedGetter = `New ${stateUpdate}`;

        state.string = stateUpdate;

        expect(getters.getNewString).toBe(expectedGetter);
      });
      it('should notify subscribers on state update', () => {
        const useStore = defineStore<State>({ state: testState, getters: testGetters });
        const { state } = useStore();
        state.number = 0;

        expect(createObserver().notify).toBeCalledTimes(1);
      });
    });
  });
});
