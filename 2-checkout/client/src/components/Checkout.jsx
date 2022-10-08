import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ setCurrentForm, setAlreadyPurchased }) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    axios.get('/responses')
      .then((result) => setInfo(result.data))
      .catch(err => console.error(err));
  }

  const handleSubmit = () => {
    setAlreadyPurchased(true);
    setCurrentForm('F0');
  }

  if(!info || !info.hasOwnProperty('name')){
    return(<div>Loading...</div>)
  }

  return(
    <div className="flex-box">
      <div>
        Review Your Order
        <div className="cart flex-box">
          <img src="https://www.minutemaid.com/content/dam/nagbrands/us/minutemaidus/en/products/orange-juice/premium-original-oj/Minute-Maid_Orange-Juice_Original-Low-Pulp_59oz.png" />
          <div>
            <h3>Simply Orange Low Pulp Juice</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
      <div className="checkout-summary">
        <button className="submit-button" onClick={handleSubmit}>Place Order</button>
        <div className="summary-item">
          Contact Info:
          <div>{info.name}</div>
          <div>{info.email}</div>
        </div>
        <div className="summary-item">
          Shipping Address:
          <div>{`${info.line1}\n${info.line2}`}</div>
          <div>{`${info.city}, ${info.state} ${info.zip}`}</div>
          <div>Phone: {info.phone}</div>
        </div>
        <div className="">
          Payment Info:
          <div>{info.number.split('').map((letter, i) => {
            if(i < info.number.length - 4) {
              return '*'
            }
            return letter;
          })}</div>
          <div>{info.expiration}</div>
        </div>
      </div>
    </div>

  );
}

export default Checkout;