// Testing Reducers with Jest

import auth from '../auth';
import * as actionTypes from '../../actions/actionTypes';

//We don't need enzyme as we don't test React Components.

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

describe('auth reducer', () => {
  it('Should return initial state.', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });

  it('Should store token upon login.', () => {
    expect(auth(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-userId',
    })).toEqual({
      ...initialState,
      token: 'some-token',
      userId: 'some-userId',
    });
  });
});
