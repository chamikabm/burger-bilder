import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controllers = [
  {label: 'Salad', type : 'salad'},
  {label: 'Bacon', type : 'bacon'},
  {label: 'Cheese', type : 'cheese'},
  {label: 'Meat', type : 'meat'},
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price : <strong>{Math.abs(props.totalPrice.toFixed(2))}</strong></p>
    {
      controllers.map(control => {
        return <BuildControl
          key={ control.label }
          label={ control.label }
          add={ () => props.addIngredinets(control.type) }
          remove={ () =>  props.remvoeIngredinets(control.type) }
          disabled={props.disabledInfo[control.type]}
        />
      })
    }
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >ORDER NOW</button>
  </div>
);

export default buildControls;