import React, { useState } from 'react';

const AddWord = ({handleNewEntry}) => {

  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');

  const handleWord = (e) => {
    setNewWord(e.target.value);
  }

  const handleDef = (e) => {
    setNewDef(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewEntry(newWord, newDef);
    setNewWord('');
    setNewDef('');
  }

  return(
    <form onSubmit={handleSubmit}>
      <input value={newWord} onChange={handleWord}></input>
      <input value={newDef} onChange={handleDef}></input>
      <button type='submit'>Add</button>
    </form>
  );
}

export default AddWord;