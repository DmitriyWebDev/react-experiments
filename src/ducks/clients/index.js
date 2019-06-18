import { START, SUCCESS, FAIL } from '../../constants-common';
import { Record, Map } from 'immutable';

// Actions
const LOAD = 'my-app/clients/LOAD';
// const CREATE = 'my-app/clients/CREATE';
// const UPDATE = 'my-app/clients/UPDATE';
// const REMOVE = 'my-app/clients/REMOVE';

// State
const ClientRecord = Record({
  address: Record({ city: '', street: '' }),
  age: 0,
  department: '',
  gender: '',
  id: '',
  name: '',
});

const ReducerRecord = Record({
  clientsLoading: false,
  clientsLoaded: false,
  clientsMap: Map({}),
});

// Reducer
export default function reducer(state = ReducerRecord(), action = {}) {
  const { type, payload } = action;

  switch (type) {
    case LOAD + START: {
      return state.set('clientsLoading', true);
    }
    case LOAD + SUCCESS: {
      const { clients } = payload;
      const clientsMap = {};
      for (let i = 0; i < clients.length; i++) {
        const client = clients[i];
        clientsMap[`${client.id}`] = ClientRecord(client);
      }

      return state
        .set('clientsLoading', false)
        .set('clientsLoaded', true)
        .set('clientsMap', Map(clientsMap));
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
export function loadClients() {
  return function(dispatch) {
    dispatch({ type: LOAD + START });
    console.log('loadClients()');

    const urlGetClients =
      'https://gist.githubusercontent.com/bunopus/f48fbb06578003fb521c7c1a54fd906a/raw/e5767c1e7f172c6375f064a9441f2edd57a79f15/test_users.json';

    setTimeout(() => {
      // timeout 1 second for Loader show demonstration
      fetch(urlGetClients)
        .then(function(response) {
          return response.json();
        })
        .then(function(clients) {
          dispatch({ type: LOAD + SUCCESS, payload: { clients } });
        })
        .catch(function(error) {
          dispatch({ type: LOAD + FAIL, error });
        });
    }, 1000);
  };
}
