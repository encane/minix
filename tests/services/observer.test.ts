import { createObserver } from '../../src/services/observer';

const arrayPushSpy = jest.spyOn(Array.prototype, 'push');
const arraySpliceSpy = jest.spyOn(Array.prototype, 'splice');


describe('tests the observer.ts service', () => {
  beforeEach(() => {
    arrayPushSpy.mockClear();
    arraySpliceSpy.mockClear();
  });

  afterAll(() => {
    arrayPushSpy.mockRestore();
    arraySpliceSpy.mockRestore();
  });

  describe('tests that correct functions are returned', () => {
    it('should return a subscribe function', () => {
      const observer = createObserver();
      expect(observer).toHaveProperty('subscribe');
    });
    it('should return a ubsibscribe function', () => {
      const observer = createObserver();
      expect(observer).toHaveProperty('unsubscribe');
    });
    it('should return a notify function', () => {
      const observer = createObserver();
      expect(observer).toHaveProperty('notify');
    });
    it('should not return subscribers array', () => {
      const observer = createObserver();
      expect(observer).not.toHaveProperty('subscribers');
    });
  });

  describe('tests the subscribe function', () => {
    it('should add a callback to the subscribers array', () => {
      const { subscribe } = createObserver();
      const mockCallback = jest.fn();

      subscribe(mockCallback);

      expect(arrayPushSpy).toBeCalledTimes(1);
    });

    it('should add not a callback to the subscribers array if it already exists', () => {
      const { subscribe } = createObserver();
      const mockCallback = jest.fn();

      subscribe(mockCallback);
      subscribe(mockCallback);

      expect(arrayPushSpy).toBeCalledTimes(1);
    });
  });

  describe('tests the unsubscribe function', () => {
    it('should not remove any subscribers if provided subscriber does not exist', () => {
      const { unsubscribe } = createObserver();
      const mockCallback = jest.fn();

      unsubscribe(mockCallback);

      expect(arraySpliceSpy).toBeCalledTimes(0);
    });

    it('should remove a subscriber if it exists', () => {
      const { unsubscribe, subscribe } = createObserver();
      const mockCallback = jest.fn();

      subscribe(mockCallback);

      unsubscribe(mockCallback);

      expect(arraySpliceSpy).toBeCalledTimes(1);
    });
  });

  describe('tests the notify function', () => {
    it('should call every subscriber in the observer', () => {
      const mockSubs = [
        jest.fn(),
        jest.fn(),
        jest.fn()
      ];

      const { subscribe, notify } = createObserver();

      mockSubs.forEach((mockSub) => {
        subscribe(mockSub);
      });

      notify(null);

      mockSubs.forEach((mockSub) => {
        expect(mockSub).toBeCalledTimes(1);
      });
    });

    it('should call every subscriber in the observer for each time notify is run', () => {
      const amountNotifies = 2;
      const mockSubs = [
        jest.fn(),
        jest.fn(),
        jest.fn()
      ];

      const { subscribe, notify } = createObserver();

      mockSubs.forEach((mockSub) => {
        subscribe(mockSub);
      });

      notify(null);
      notify(null);

      mockSubs.forEach((mockSub) => {
        expect(mockSub).toBeCalledTimes(amountNotifies);
      });
    });

    it('should call every subscriber with the provided data param', () => {
      const mockSubs = [
        jest.fn(),
        jest.fn(),
        jest.fn()
      ];
      const mockData = 'mockData';

      const { subscribe, notify } = createObserver();

      mockSubs.forEach((mockSub) => {
        subscribe(mockSub);
      });

      notify(mockData);

      mockSubs.forEach((mockSub) => {
        expect(mockSub).toBeCalledWith(mockData);
      });
    });
  });

});
