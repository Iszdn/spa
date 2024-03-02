import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function StripePAy({ selectedServicePrice }) {
  const navigate = useNavigate();
  const publishableKey = "pk_test_51Olvg9JywS7BLFriA3Wsqm3uM8IEmXX2gUPKfRJdeMZOe8IrY0OT6wg4aOj6lHsG3UMu7b8bvT69Yh2tW0Ole6Xy00Lmnen5ss";

  const priceForStripe = selectedServicePrice * 100;
console.log(selectedServicePrice);
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:5000/payment",
        method: "post",
        data: {
          amount: selectedServicePrice * 100,
          token,
        },
      });
      toast.success("Successfully reserved!")
      navigate("/services")
      if (response.status === 200) {
        // handleSuccess();
      }
    } catch (error) {
      // handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="bb">
      <div className="srtippp">
        
        <div className="str">
           <StripeCheckout 
          className="sunsaaa"
          stripeKey={publishableKey}
          label="Pay for booking"
          name="Pay With Credit Card"
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`Your total is $${selectedServicePrice}`}
          token={payNow}
        />
        </div>
       <div className="payimg">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/012/707/298/small_2x/3d-human-hands-holding-bank-orange-credit-cards-set-online-payment-mobile-bankind-transaction-and-shopping-concept-high-quality-isolated-render-png.png" />
        </div>
      </div>
    </div>
  );
}

export default StripePAy;
