import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = ({ setCurrentForm }) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    axios.get('/responses')
      .then((result) => setInfo(result.data))
      .catch(err => console.error(err));
  }
  console.log(info)
  if(!info || !info.hasOwnProperty('name')){
    return(<div></div>)
  }

  return(
    <div>
      <div>
        User Info:
        <div>{info.name}</div>
        <div>{info.email}</div>
      </div>
      <div>
        Shipping Address:
        <div>{`${info.line1}\n${info.line2}`}</div>
        <div>{`${info.city}, ${info.state} ${info.zip}`}</div>
        <div>{info.phone}</div>
      </div>
      <div>
        Payment Info:
        <div>{info.number}</div>
        <div>{info.expiration}</div>
      </div>
    </div>
  );
}

export default Checkout;