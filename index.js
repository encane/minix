
const { defineStore } = require('./dist');


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

const { state, getters } = useTaskStore();

console.log(getters.getHighPriorityTasks);

