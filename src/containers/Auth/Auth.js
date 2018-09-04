import React , { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.css';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType : 'input',
        elementConfig : {
          type : 'email',
          placeholder : 'Your E-mail',
        },
        value: '',
        validation : {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
        validationError: 'Please enter a valid email.',
      },
      password: {
        elementType : 'input',
        elementConfig : {
          type : 'password',
          placeholder : 'Password',
        },
        value: '',
        validation : {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
        validationError: 'Password should have more than 6 letters.',
      },
    },
    formIsValid: true,
    isSignUp: true,
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

  authHandler = (event) => {
    event.preventDefault(); // This stops default behaviour such as reloading page upon clicking the button.

    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  inputChangedHandler = (event, controlName) => {

    console.log('controlName', controlName);

    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      }
    };

    this.setState({ controls: updatedControls });
  };

  switchAuthModelHandler = () => {
    this.setState(prevState => {
      return {isSignUp: !prevState.isSignUp}
    });
  };

  render () {

    const formElementsArray = [];
    for ( let key in this.state.controls ) {
      formElementsArray.push( {
        id: key,
        config: this.state.controls[key]
      } );
    }

    const form = formElementsArray.map( formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
    ) );

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.authHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModelHandler}
          btnType="Danger">
          SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
  }
};

export default connect(null, mapDispatchToProps)(Auth);