import React from 'react';
import Aux from "../../../hoc/Aux";

const orderSummary = (props) => {

  const ingredinetsSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return <li>
        <span style={{textTransform: 'capitalize'}}>{ igKey }</span> : {props.ingredients[igKey]}
        </li>
    });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delicious burger with the following ingredients.</p>
      <ul>
        { ingredinetsSummary }
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;