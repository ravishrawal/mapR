import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends Component {
  constructor(props){
    super(props);
    this.onToken = this.onToken.bind(this)
  }
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      console.log('RESPONSE');
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_0xrZ9wkXTjD2yGybqyzEDmKt"
        billingAddress={true}
        zipCode={true}
        bitcoin
        allowRememberMe
      />
    )
  }
}
