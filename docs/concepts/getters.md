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

If this logic needs to be used in more than one place we may end up duplicating the function. You can use "getters" in your store to derive values in from your state. Each getter will be passed the ``state`` object as a first paramter

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
## Using other getters

Getters will also receive a second paramter ``getters``. This object will contain the stores getters for nested use. The current getter will not be passed on this object to prevent call stack errors.

```js
// taskStore.js
import { defineStore } from '@encane/minix'

const useTaskStore = defineStore({
  state: {
    tasks: [
      { title: 'Write documentation', completed: false, priority: 'high' },
      { title: 'Write unit tests', completed: false, priority: 'low' },
      { title: 'Update Readme', completed: true, priority: 'medium' }
    ]
  },
  getters: {
    getIncompleteTasks: (state) => {
      return state.tasks.filter((x) => !x.completed);
    },
    getHighPriorityTasks: (state, getters) => {
      return getters.getIncompleteTasks.filter((x) => x.priority === 'high');
    }
  }
});
```

```js
const { getters } = useTaskStore();

getters.getHighPriorityTasks;

/*[
  { title: 'Write documentation', completed: false, priority: 'high' }
]*/
```
