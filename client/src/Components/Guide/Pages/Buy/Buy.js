import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../Buy/buy.scss";

toast.configure();




export default function Buy() {
  const [basic] = React.useState({
    name: "Guide Plan",
    price: 200,
    description: "Good price"
  });
 

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost5000/payment",
      { token, product: basic }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }
  return (
    <div className="container">
    <div className="product">
      <h1>{basic.name}</h1>
      <h3>Guide · ${basic.price}</h3>
    </div>
    <StripeCheckout
      stripeKey="pk_test_4TbuO6qAW2XPuce1Q6ywrGP200NrDZ2233"
      token={handleToken}
      amount={basic.price * 100}
      name="Guide Plan"
      billingAddress
      shippingAddress
    />
  </div>
    
  )
}
