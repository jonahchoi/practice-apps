import React, { useState } from 'react';
import WordItem from './WordItem.jsx';

const WordList = ({glossary, handleDelete, handleNewEntry}) => {


  return(
    <div>
      <div>
        <span style={{
          display: 'inline-block',
          width: '400px',
          border: '1px solid black',
          padding: '2px',
          margin: '2px'
        }}>Word</span>
        <span style={{
          display: 'inline-block',
          width: '400px',
          border: '1px solid black',
          padding: '2px',
          margin: '2px'
        }}>Definition</span>
      </div>
      {glossary.map((entry, index) => <WordItem entry={entry} key={entry.word} handleDelete={handleDelete} handleNewEntry={handleNewEntry} /> )}
    </div>
  );
}

export default WordList;