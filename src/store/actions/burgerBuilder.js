import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
  }
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName,
  }
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients,
  }
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  }
};

export const initIngredients = () => {

  return dispatch => {
    axios.get('/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(fetchIngredientFailed())
      });
  };
};

