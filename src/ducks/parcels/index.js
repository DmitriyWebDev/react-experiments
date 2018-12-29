import { Record, Map } from 'immutable'

// Actions
const LOAD   = 'my-app/clients/LOAD';
const CREATE = 'my-app/clients/CREATE';
const UPDATE = 'my-app/clients/UPDATE';
const REMOVE = 'my-app/clients/REMOVE';

// State
const ClientRecord = Record({
    address: Record({city: '', street: ''}),
    age: 0,
    department: '',
    gender: '',
    id: '',
    name: ''
})

const ReducerRecord = Record({
    clientsLoading: false,
    clientsLoaded: false,
    clientsMap: Map({})
})

// Reducer
export default function reducer(state = ReducerRecord(), action = {}) {
    const {type, payload} = action

    switch (type) {
        case LOAD : {
            return state
        }
        default: {
            return state
        }
    }
}

// Action Creators
export function addParcel() {
    return { type: LOAD };
}


// side effects, only as applicable
// e.g. thunks, epics, etc

