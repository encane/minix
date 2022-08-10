# State

State is often the most important part of your store. You can often define stores based on the state within your mini program.

Minix allows you to define state as an object.

```js
import { defineStore } from '@encane/minix'

export const useUserStore = defineStore({
    state: {
        username: 'Greg',
        email: 'greg@example.com',
    }
})
```

## TypeScript

Minix allows typescript support out of the box. You can define types for you state by defining a custom type.

```js
// userStore.js
import { defineStore } from '@encane/minix'

type UserState = {
  username: string,
  email: string
}

export const useUserStore = defineStore<UserState>({
    state: {
        username: 'Greg',
        email: 'greg@example.com',
    }
})
```

## Accessing State

Minix allows you to directly read and update the state by accessing it through your store instances.

```js
import { useUserStore } from './userStore.js'

const { state } = useUserStore();

state.username = 'Greggory'
const userEmail = state.email
```

### Subscribing to the state

You can watch state for changes by making use of the `subscribe()` method. This subscription will trigger whenever the state is modified. This function expects a store object which contains store and getters properties.

```js
import { useUserStore } from './userStore.js'

const userStore = useUserStore();

const callback = (store)=>{
  console.log(`${store.state.username}`)
}

userStore.subscribe(callback)

state.username = 'Greggory'
```

### Cleaning up subscriptions

You can manually remove to prevent subscriptions from running when they are no longer required. You can use the `unsubscribe()` method to remove a callback from the store.

```js
const callback = (store)=>{
  console.log(`${store.state.username}`)
}

// on page or component unload
userStore.unsubscribe(callback)
```

[Next: Concepts/getters](./getters.md)
