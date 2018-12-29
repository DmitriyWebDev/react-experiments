import { List } from 'immutable'

export const getClientsListFromMap = (clientsMap = {}) => {
    const result = []
    const [ ...keys ] = clientsMap.keys()
    for (let i = 0; i < keys.length; i++) {
        result.push(clientsMap.get(keys[i]))
    }

    return List(result)
}