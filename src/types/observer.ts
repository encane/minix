export type Subscriber<T> = {
  (data: T): void
}

export type Observer<T> = {
  subscribe(subscriber: Subscriber<T>): void
  unsubscribe(subscriber: Subscriber<T>): void
  notify(data: T): void
}
