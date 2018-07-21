import React from 'react';

import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {

  const ingredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
          return <Ingredient key={igKey + index} type={igKey}/>
      });
    });


  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top" />
        {ingredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default burger;