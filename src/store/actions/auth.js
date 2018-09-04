import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =() => {
  return {
    type: actionTypes.AUTH_START,
  }
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData,
  }
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  }
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    console.log(authData);

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCyhj6r00ro3Z4eACeKftM2fj8fy5bACpE';

    if (!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCyhj6r00ro3Z4eACeKftM2fj8fy5bACpE';
    }

    console.log(url);

    axios.post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      }).catch(error => {
        console.log(error);
        dispatch(authFailed(error));
    });
  }
};