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
    {
      controllers.map(control => {
        return <BuildControl key={control.label} label={control.label} />
      })
    }
  </div>
);


export default buildControls;