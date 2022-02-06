import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getCartTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import {useHistory} from 'react-router-dom';


function Payment() {
  const history = useHistory()
  const [{ cart, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  
useEffect(() => {
    const getClientSecret = async () => {
        const response = await axios({
            method:'POST',
            url:`/payment/create?total=${getCartTotal(cart)* 100} `  //stripe expect total amount in base currencies
        });
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
},[cart])


  const handleSubmit = async (e) => {
      e.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
              card:elements.getElement(CardElement)
          }
      }).then(({paymentIntent}) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false)
        history.replaceState('/order')
      })
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        {/*Delivery Address*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address:</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Falt No.301, Hiranandani</p>
            <p>Andheri, India</p>
          </div>
        </div>
        {/*Cart Review*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review your Item in Cart:</h3>
          </div>
          <div className="payment__items">
            {cart.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
        {/*Payment Gateway*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method:</h3>
          </div>
          <div className="payment__details">
            {/*Strip Secret Code*/}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({cart?.lenght} items):<strong>{value}</strong>{" "}
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/* Errons handling */}
              {error && <div>
                  {error}
                  </div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
