import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import clients from '../ducks/clients'
import parcels from '../ducks/parcels'

export default combineReducers({
    clients,
    parcels,
    form: formReducer
})