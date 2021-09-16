/**
 * @desc Component for the payment
 * props: item (item to pay), dest (destination after payment)
 */

import React, { useState } from "react";
import { useHistory } from "react-router";
// * Imports
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

// * styling
import "react-toastify/dist/ReactToastify.css";
import "./payment.scss";

toast.configure();

const Payment = (props) => {
  // * Hooks
  const history = useHistory();
  // destruc
  const { item, dest } = props;

  const [product] = useState(item);

  // TODO 2 different redirects
  // 1. for subscription
  // 2. for paid guide
  async function handleToken() {
    if (dest === "admin") {
      toast("Success! Check email for details", { type: "success" });
      setTimeout(() => {
        history.push("/admin/account");
      }, 2000);
    }
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
