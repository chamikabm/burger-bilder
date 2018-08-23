import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';
import axios from "../../../axios-orders";

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault(); // This stops default behaviour such as reloading page upon clicking the button.
    console.log(this.props.ingredients);

    this.setState({ loading : true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Max Spend',
        address: {
          street: 'No 4, St Dkerke, Adddslkes.',
          zipCode : '11838',
          country: 'SriLanka'
        },
        email: 'abc@gmail.com',
      },
      deliveryMethod: 'fastest',
    };

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });

  };

  render() {
    let form =
      <form>
      <input type="text" name="name" placeholder="Your Name"/>
      <input type="text" name="email" placeholder="Your E-mail"/>
      <input type="text" name="street" placeholder="Street"/>
      <input type="text" name="postal" placeholder="Postal Code"/>
      <Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
    </form>;

    if (this.state.loading) {
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

export default ContactData;