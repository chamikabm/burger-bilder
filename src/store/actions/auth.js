import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =() => {
  return {
    type: actionTypes.AUTH_START,
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  }
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};


export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
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
        // localId is the userId.

        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      }).catch(error => {
        console.log(error);
        dispatch(authFailed(error.response.data.error));
    });
  }
};