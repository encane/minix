import { ISubscriber, IObserver } from '../types';

export const createObserver = <T>(): IObserver<T> => {
  const subscribers: ISubscriber<T>[] = [];

  const subscribe = (subscriber: ISubscriber<T>) => {
    if (subscribers.includes(subscriber)) {
      return;
    }

    subscribers.push(subscriber);
  };

  const unsubscribe = (subscriber: ISubscriber<T>) => {
    if (!subscribers.includes(subscriber)) {
      return;
    }

    const index = subscribers.indexOf(subscriber);
    subscribers.splice(index, 1);
  };

  const notify = (data: T) => {
    subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  };

  return {
    subscribe,
    notify,
    unsubscribe
  };
};
