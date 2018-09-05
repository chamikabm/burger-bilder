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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};


export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000); //1000 here is because in JS (i.e new Date() is in seconds where as we received response in milliseconds.)
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationTime', expirationTime);
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      }).catch(error => {
        console.log(error);
        dispatch(authFailed(error.response.data.error));
    });
  }
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  }
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationTime = new Date(localStorage.getItem('expirationTime'));
      if (expirationTime > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }
};