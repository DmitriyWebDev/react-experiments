import { getRandomId } from 'common-utils'
export default (store) => next => action => {
    if (action.generateId) {
        const {generateId, payload, ...rest} = action
        console.log('random id middleware ---')
        return next({
            ...rest,
            payload: {
                ...payload,
                randomId: getRandomId()
            }
        })
    }
    return next(action)
}