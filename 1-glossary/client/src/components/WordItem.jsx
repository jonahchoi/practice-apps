import React, { useState, useRef } from 'react';
import axios from 'axios';

const WordItem = ({ entry, handleDelete, handleNewEntry }) => {
  const [currentDef, setCurrentDef] = useState(entry.definition);
  const [disabled, setDisabled] = useState(true);
  const ref = useRef(null);

  const handleEdit = () => {

    ref.current.focus();
    setDisabled(false);
  }

  const handleSubmit = (e) => {
    console.log(disabled);
    e.preventDefault()
    handleNewEntry(entry.word, currentDef);
    setDisabled(true);
  }

  return(

    <form style={{
      display:'flex',
    }}
    onSubmit={handleSubmit}>
      <div style={{
        width: '400px',
        border: '1px solid black',
        padding: '2px',
        margin: '2px'
      }}>{entry.word}</div>
      <input style={{
        width: '400px',
        border: '1px solid black',
        padding: '2px',
        margin: '2px'
      }}
      value={currentDef}
      readOnly={disabled}
      ref={ref}
      onChange={(e)=>setCurrentDef(e.target.value)}></input>
      { disabled ? <button type="button" onClick={handleEdit}>✎</button> : <button type="button" onClick={handleSubmit}>✔️</button>}
      <button type="button" onClick={() => handleDelete(entry.word)}>❌</button>
    </form>
  );
}

export default WordItem;