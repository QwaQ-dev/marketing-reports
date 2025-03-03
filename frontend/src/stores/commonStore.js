import {writable, get} from 'svelte/store'

function store() {
    function init() {
        let state = {
            isLoading: false,
            user: null,
            selectedTenant: null
        };
        return state;
    }

    const initialState = init();
    const commonStore = writable(initialState);
    const {subscribe, update} = commonStore;

    const methods = {
        setIsLoading(value) {
            update(state => {
                state.isLoading = value;
                return state;
            })
        },

        setUser(user) {
            update(state => {
                state.user = user;
                return state;
            })
        },

        setTenant(tenant) {
            update(state => {
                state.selectedTenant = tenant;
                return state;
            })
        },
    }

    return {
        subscribe,
        ...methods
    };
}

export default store();
