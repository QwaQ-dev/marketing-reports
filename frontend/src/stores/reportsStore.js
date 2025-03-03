import {writable, get} from 'svelte/store'

function store() {
    function init() {
        let state = {
            list: []
        };
        return state;
    }

    const initialState = init();
    const reportsStore = writable(initialState);
    const {subscribe, update} = reportsStore;

    const methods = {
        setReports(reports) {
            update(state => {
                state.list = reports;
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
