import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";



function StripePAy() {
  const publishableKey =
    "pk_test_51Olvg9JywS7BLFriA3Wsqm3uM8IEmXX2gUPKfRJdeMZOe8IrY0OT6wg4aOj6lHsG3UMu7b8bvT69Yh2tW0Ole6Xy00Lmnen5ss";
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 5,
  });
  const priceForStripe = product.price * 100;

  
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        // handleSuccess();
      }
    } catch (error) {
      // handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="container">
      
      <StripeCheckout
      className="sun"
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default StripePAy;