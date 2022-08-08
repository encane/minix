import { Subscriber, Observer } from '../types';

export const createObserver = <T>(): Observer<T> => {
  const subscribers: Subscriber<T>[] = [];

  const subscribe = (subscriber: Subscriber<T>) => {
    if (subscribers.includes(subscriber)) {
      return;
    }

    subscribers.push(subscriber);
  };

  const unsubscribe = (subscriber: Subscriber<T>) => {
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
