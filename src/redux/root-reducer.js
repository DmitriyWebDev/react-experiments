import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import clients from '../ducks/clients'
import parcels from '../ducks/parcels'
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    router: connectRouter(history),
    clients,
    parcels,
    form: formReducer
})
