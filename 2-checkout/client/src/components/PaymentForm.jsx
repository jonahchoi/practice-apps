import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({setCurrentForm}) => {
  const [number, setNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/payments', {
      number,
      expiration,
      cvv,
      zip
    })
    .then((response) => setCurrentForm('F4'))
    .catch((err) => console.error(err))
  }

  return(
    <form onSubmit={handleSubmit}>
      Please enter credit information:
      <div>
        <input className="input-form" placeholder="Card Number" required type='text' value={number} onChange={(e)=>setNumber(e.target.value)}></input>
      </div>
      <div className="split-input">
        <input className="input-form" placeholder="Expiration date (MM/YYYY)" required type='text' value={expiration} onChange={(e)=>setExpiration(e.target.value)}></input>
        <input className="input-form" placeholder="CVV" required type='text' value={cvv} onChange={(e)=>setCvv(e.target.value)}></input>
        <input className="input-form" placeholder="Zip Code" required type='text' value={zip} onChange={(e)=>setZip(e.target.value)}></input>
      </div>
      <button className="submit-button" type="submit">Continue to Checkout</button>
    </form>
  );
}

export default PaymentForm;