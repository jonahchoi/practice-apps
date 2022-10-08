import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = ({setCurrentForm}) => {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [stateAbr, setStateAbr] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/addresses', {
      line1,
      line2,
      city,
      state: stateAbr,
      zip,
      phone
    })
    .then((response) => setCurrentForm('F3'))
    .catch((err) => console.error(err))
  }

  return(
    <form onSubmit={handleSubmit}>
      Shipping Address:
      <div>
        <input className="input-form" placeholder="Line 1" required type='text' value={line1} onChange={(e)=>setLine1(e.target.value)}></input>
      </div>
      <div>
        <input className="input-form" placeholder="Line 2" type='text' value={line2} onChange={(e)=>setLine2(e.target.value)}></input>
      </div>
      <div className="flex-box">
        <input className="input-form" placeholder="City" required type='text' value={city} onChange={(e)=>setCity(e.target.value)}></input>

        <input className="input-form" placeholder="State" required type='text' value={stateAbr} onChange={(e)=>setStateAbr(e.target.value)}></input>
      </div>
      <div>
        <input className="input-form" placeholder="Zip Code" required type='text' value={zip} onChange={(e)=>setZip(e.target.value)}></input>
      </div>
      <div>
        <input className="input-form" placeholder="Phone" required type='text' value={phone} onChange={(e)=>setPhone(e.target.value)}></input>
      </div>
      <button className="submit-button"  type="submit">Continue to Payment</button>
    </form>
  );
}

export default AddressForm;