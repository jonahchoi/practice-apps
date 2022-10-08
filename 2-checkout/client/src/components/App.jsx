import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm.jsx';
import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';
import Checkout from './Checkout.jsx';

const App = () => {

  const [currentForm, setCurrentForm] = useState('F0');
  const [alreadyPurchased, setAlreadyPurchased] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    axios.get('/verify')
      .then((response) => {
        setCurrentForm(response.data.currentForm);
      })
      .catch((err) => {
        setAlreadyPurchased(true);
      })
  }

  let form = null;

  switch(currentForm) {
    case 'F1':
      form = <UserForm setCurrentForm={setCurrentForm} />
      break;

    case 'F2':
      form = <AddressForm setCurrentForm={setCurrentForm} />
      break;

    case 'F3':
      form = <PaymentForm setCurrentForm={setCurrentForm} />
      break;

    case 'F4':
      form = <Checkout setCurrentForm={setCurrentForm} setAlreadyPurchased={setAlreadyPurchased} />
      break;

    default:
      form = <button className="submit-button" onClick={()=>setCurrentForm('F1')}>Checkout</button>;
      break;
  }

  return(
    <div>
      <div className='nav-bar'>
        <h1>BuyStuffHere</h1>

      </div>
      <div className="main-container">
        {alreadyPurchased ? <div className="box">Thank you for your purchase! You are never allowed here again!</div> : form}
      </div>
    </div>
  );

}

export default App;