import { Record, Map } from 'immutable'

// Actions
const ADD    = 'my-app/parcels/ADD'
// const EDIT   = 'my-app/parcels/EDIT'
// const REMOVE = 'my-app/parcels/REMOVE'

// State
const ParcelRecord = Record({
    id: '',
    title: '',
    weight: '',
    clientId: ''
})

const ReducerRecord = Record({
    parcelsMap: Map({}),
    parcelsByClientId: Map({})
})

// Reducer
export default function reducer(state = ReducerRecord(), action = {}) {
    const {type, payload} = action

    switch (type) {
        case ADD : {
            const {clientId, randomId, title } = payload
            console.log('Parcels reducer. Add')
            console.log(action)
            const newParcel = ParcelRecord({
                id: randomId,
                title,
                weight: '',
                clientId
            })

            return state
                .setIn(['parcelsMap', randomId], newParcel)
                .setIn(['parcelsByClientId', clientId], randomId)
        }
        default: {
            return state
        }
    }
}

// Action Creators
export function addParcel(payload) {
    return {
        type: ADD,
        generateId: true,
        payload: {...payload}
    }
}


// side effects, only as applicable
// e.g. thunks, epics, etc

