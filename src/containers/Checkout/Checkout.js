import React, { Component } from 'react';
import { Route }from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  // No need this state as we are now rely on redux states.
  // state = {
  //   ingredients: null,
  //   totalPrice: 0,
  // };

  // 1st Change before introducing redux to the project.
  // We change this componentDidMount to componentWillMount as we need to call this method before the child components
  // are rendered. Because if the child components rendered ingredients will be null and inside the child components it
  // will throw an error. Since we are changed it to componentWillMount no longer will get an issue as the state for
  // ingredients it set to a empty order (const ingredients = {};)

  // 2 nd Change after introducing redux to the project.
  //Since we are using redux with the application we are no longer required to get params through the query params.
  // componentWillMount () {
  //
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // param = ['salad' , '0']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //
  //   this.setState({ingredients : ingredients, totalPrice : price});
  // }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.replace('checkout/contact-data');
  };

  //Inside the render function you can use component prop to load the UI in Route component. But using that we are
  //unable to any data from parent component to child component. Hence we have to use the Router render prop.

  render () {

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={this.checkoutCancelHandler}
          checkoutContinued={this.checkoutContinueHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
          //After introducing the redux no longer need  tricks to pass data.
          // render={(props) => ( //Here props will be the extra parameters such as history object.
          //   <ContactData
          //   ingredients={this.props.ings}
          //   price={this.props.price}
          //   {...props} // Props is passed as need to access the history object and navigate to main page after save.
          />
      </div>
    );
  };
}

const mapStateToProps = state => {

  return {
    ings: state.ingredients,
  }
};

export default connect(mapStateToProps)(Checkout);