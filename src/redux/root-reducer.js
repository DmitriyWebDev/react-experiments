import { combineReducers } from 'redux'
import clients from '../ducks/clients'
import parcels from '../ducks/parcels'

export default combineReducers({
    clients,
    parcels
})