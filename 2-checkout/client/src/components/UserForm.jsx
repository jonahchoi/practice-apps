import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({setCurrentForm}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/responses', {
      name: username,
      email,
      password
    })
    .then((response) => setCurrentForm('F2'))
    .catch((err) => console.error(err))
  }

  return(
    <form onSubmit={handleSubmit}>
      Create an account:
      <div>
        <input className="input-form" placeholder="Username" required type='text' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
      </div>
      <div>
        <input className="input-form" placeholder="Email" required type='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
     </div>
      <div>
        <input className="input-form" placeholder="Password" required type='text' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
     </div>
      <button className="submit-button" type="submit">Continue to Shipping</button>
    </form>
  );
}

export default UserForm;