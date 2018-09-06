import React , { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom'
import * as actions from '../../store/actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../store/utility';

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

  componentDidMount() {
    if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetRedirectPath();
    }
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
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
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

    let form = formElementsArray.map( formElement => (
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

    if(this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;
    if(this.props.error) {
      errorMessage = (<p>{this.props.error.message}</p>);
    }

    let authRedirect = null;
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>;
    }

    return (
      <div className={classes.Auth}>
        <h2>{this.state.isSignUp ? 'SIGN UP FOR ORDER' : 'SIGN IN TO ORDER'}</h2>
        {authRedirect}
        {errorMessage}
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
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);