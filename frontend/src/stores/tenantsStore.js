import {writable, get} from 'svelte/store'

function store() {
    function init() {
        let state = {
            list: []
        };
        return state;
    }

    const initialState = init();
    const tenantsStore = writable(initialState);
    const {subscribe, update} = tenantsStore;

    const methods = {
        setTenants(tenants) {
            update(state => {
                state.list = tenants;
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
