import React, {Component} from 'react'
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import classes from './ContactData.css';
import axios from "../../../axios-orders";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType : 'input',
        elementConfig : {
          type : 'text',
          placeholder : 'Your Name',
        },
        value: '',
        validation : {
          required: true,
        },
        valid: false,
        touched: false,
        validationError: 'Please enter a valid Name.',
      },
      street: {
        elementType : 'input',
        elementConfig : {
          type : 'text',
          placeholder : 'Street',
        },
        value: '',
        validation : {
          required: true,
        },
        valid: false,
        touched: false,
        validationError: 'Please enter a valid Street Address.',
      },
      zipCode: {
        elementType : 'input',
        elementConfig : {
          type : 'text',
          placeholder : 'Zip Code',
        },
        value: '',
        validation : {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
        validationError: 'Please enter a valid Zip Code.',
      },
      country: {
        elementType : 'input',
        elementConfig : {
          type : 'text',
          placeholder : 'Country',
        },
        value: '',
        validation : {
          required: true,
        },
        valid: false,
        touched: false,
        validationError: 'Please enter a valid Country Name.',
      },
      email: {
        elementType : 'input',
        elementConfig : {
          type : 'email',
          placeholder : 'Your E-mail Address',
        },
        value: '',
        validation : {
          required: true,
        },
        valid: false,
        touched: false,
        validationError: 'Please enter a valid E-mail.',
      },
      deliveryMethod: {
        elementType : 'select',
        elementConfig : {
          options: [
            {value : 'fastest', displayValue: 'Fastest'},
            {value : 'cheapest', displayValue: 'Cheapest'},
            {value : 'pickup', displayValue: 'Pickup'},
          ],
        },
        value: 'fastest', // In the react we don`t need to set the selected value in the options list , simply we can pass the value to
        //select component as a value it manages to select the correct option from the correct options list. Hence we need to pass
        //the default value as the value to select by default.
        validation : {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required && isValid) {
      isValid = '' !== value.trim();
    }

    if (rules.minLength && isValid) {
      isValid = value.trim().length >= rules.minLength;
    }

    if (rules.maxLength && isValid) {
      isValid = value.trim().length <= rules.maxLength;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault(); // This stops default behaviour such as reloading page upon clicking the button.
    console.log(this.props.ingredients);

    const formData = {};

    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOderBurger(order);
  };

  inputChangedHandler = (event, inputIdentifier) => {

    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let isFormValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
    }

    console.log(isFormValid);

    this.setState({orderForm : updatedOrderForm, formIsValid : isFormValid});
  };

  render() {

    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form =
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(formElement => {
            return <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              validationError={formElement.config.validationError}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />;
          })
        }
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>;

    if (this.props.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Details</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings : state.burgerBuilder.ingredients,
    price : state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onOderBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));