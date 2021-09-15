/**
 * @desc Component for the payment
 */

import React, { useState } from "react";
// * Imports
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

// * styling
import "react-toastify/dist/ReactToastify.css";
import "./payment.scss";

toast.configure();

const Payment = (props) => {
  // destruc
  const { item } = props;

  const [product] = useState(item);

  // TODO 2 different redirects
  // 1. for subscription
  // 2. for paid guide
  async function handleToken() {
    toast("Success! Check email for details", { type: "success" });
  }

  return (
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>Guide · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
        token={handleToken}
        amount={product.price * 100}
        name={product.name}
        billingAddress
        shippingAddress
      />
    </div>
  );
};

export default Payment;
