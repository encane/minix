# Stores

A store is an entity that contains state and business logic for a mini program that is not bound directly to a page or component.

## When to use a store

A store should be used when you need to share data throughout your mini program. This includes data that needs to persist between pages.

A store should not be used when data can be contained within a page or component. For example managing the visibility of items on a page.

## Defining a store

State cannot be managed until we define a store. The definition of a store allow us to declate the properties of the store. Stores can be defined using `defineStore()`.

```js
import { defineStore } from '@encane/minix'

// You can name the return value of `defineStore` anything you want but it is best practice to start with `use` then provide a name to the store and then store. e.g. useTaskStore, useUserStore etc.


export const useStore = defineStore({
    state: {
        counter : 0
    }
})
```

`defineStore()` accepts one value which is a Store object.

### Using the store

Onces stores are defined they can be used throughout your application.

You can then import `useStore()` to gain access to your store. Calling this function will create an instance of your store to access in a module.

```js
import { useStore } from '../store.js'

const { state } = useStore();

Page({
    onLoad(){
        state.counter++
        console.log(state.counter)
    }
})

```

You can define any amount of stores in your mini program but you should seperate them into in individual files.

[Next: Concepts/state](./concepts/state.md)
