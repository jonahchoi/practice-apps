import React, { useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm.jsx';
import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';
import Checkout from './Checkout.jsx';

const App = () => {

  const [currentForm, setCurrentForm] = useState('F3');
  const [isValidUser, setIsValidUser] = useState(true);

  const authenticate = () => {
    axios.get('/verify')
      .then((response) => {
        setCurrentForm('F1')
      })
      .catch((err) => {
        setIsValidUser(false);
      })
  }

  switch(currentForm) {
    case 'F1':
      return <UserForm setCurrentForm={setCurrentForm} />
      break;

    case 'F2':
      return <AddressForm setCurrentForm={setCurrentForm} />
      break;

    case 'F3':
      return <PaymentForm setCurrentForm={setCurrentForm} />
      break;

    case 'F4':
      return <Checkout setCurrentForm={setCurrentForm} />
      break;

    default:
      return(
        <div>
          <button onClick={authenticate}>Checkout</button>

          {!isValidUser ? <div style={{
            backgroundColor: '#ff7675',
            border: '1px solid red',
            borderRadius: '5px',
            padding: '10px',
            margin: '5px'
          }}>You\'ve already checked out! Please go away!</div> : ''}
        </div>
      );
      break;
  }

}

export default App;