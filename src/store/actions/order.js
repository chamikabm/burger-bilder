import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  }
};

export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error,
  }
};

const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASER_BURGER_START,
  }
};

export const purchaseBurger = (orderData) => {
  return (dispatch, getState) => {
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json?auth=' + getState().auth.token , orderData)
      .then(response => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
};

export const fetchOrderSuccess = (orders) => {
    return {
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      orders,
    }
};

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  }
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
};

export const fetchOrders = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrderStart());
    const queryParams = '?auth=' + getState().auth.token + '&orderBy="userId"&equalTo="' + getState().auth.userId + '"';
    axios.get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = [];

        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrderSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrderFailed(error))
      });
    };
};