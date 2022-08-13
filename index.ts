import { defineStore } from './src';

type State = {
    string: string,
    number: number
}

const useStore = defineStore<State>({
    state: {
        string: '12345',
        number: 1234
    },
    getters: {
        getString: (state) => {
            return state.string + state.number
        },
        getBothArray: (state, getters)=>{
            return [
                state.string,
                state.number,
                getters.getString,
                getters.getBothArray
            ]
        }
    }
});

const { state, getters } = useStore()

console.log(getters.getBothArray);


