import { Record } from 'immutable';

// Actions
const MODAL_OPEN = 'my-app/clients/MODAL_OPEN';
const MODAL_CLOSE = 'my-app/clients/MODAL_CLOSE';

// State
const ReducerRecord = Record({
  showModal: false,
  modalKey: '',
});

// Reducer
export default function reducer(state = ReducerRecord(), action = {}) {
  const { type, payload } = action;
  switch (type) {
    case MODAL_OPEN: {
      const { modalKey } = payload;
      return state.set('showModal', true).set('modalKey', modalKey);
    }
    case MODAL_CLOSE: {
      const { modalKey } = payload;
      console.log(modalKey);
      return state.set('showModal', false).set('modalKey', modalKey);
    }
    default: {
      return state;
    }
  }
}

// Action Creators
export function openModal(payload = {}) {
  return {
    type: MODAL_OPEN,
    payload,
  };
}

export function closeModal(payload = {}) {
  return {
    type: MODAL_CLOSE,
    payload,
  };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
