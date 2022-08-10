# Getters

There often may occur a situation where you may need to derive values from your stores state.

```js
import { useUserStore } from 'userStore.js'

Page({
    onLoad(){
        const { state } = useUserStore();
        this.setData({
            fullname: `${state.firstName} ${state.lastName}`
        })
    }
})
```

If this logic needs to be used in more than one place we may end up duplicating the function. You can use "getters" in your store to derive values in from your state.

```js
import { defineStore } from '@encane/minix'

export const useUserStore = defineStore({
    state: {
        firstName: 'John',
        lastName: 'Smith',
    },
    getters: {
        fullName : (state)=>{
            return `${state.firstName} ${state.lastName}`
        }
    }
})
```

## Property-Style Access

The getters will be exposed on the store.getters object, and you access values as properties:

```js
const { getters } = useUserStore()

getters.fullName
// 'John Smith'
```
