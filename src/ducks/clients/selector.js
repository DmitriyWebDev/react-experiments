import {createSelector} from 'reselect'
import {getClientsListFromMap} from './utils'

const getClientsMap = (state) => state.clientsMap

export const getClientsList = createSelector(
    getClientsMap,
    (clientsMap) => {
        console.log('---', 'recomputing clients')
        return getClientsListFromMap(clientsMap)
    }
)