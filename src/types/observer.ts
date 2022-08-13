export interface ISubscriber<T> {
  (data: T): void
}

export interface IObserver<T> {
  subscribe(subscriber: ISubscriber<T>): void
  unsubscribe(subscriber: ISubscriber<T>): void
  notify(data: T): void
}
