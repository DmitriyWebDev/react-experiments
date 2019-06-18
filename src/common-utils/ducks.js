import { List, Map } from 'immutable';

export const getListFromMap = (immutableMap = Map({})) => {
  const result = [];
  const [...keys] = immutableMap.keys();
  for (let i = 0; i < keys.length; i++) {
    result.push(immutableMap.get(keys[i]));
  }

  return List(result);
};
