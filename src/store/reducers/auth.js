import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const auth = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        loading: false,
        error: null,
        userId: action.userId,
        token: action.idToken,
      });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
};


export default auth;