import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WordList from './WordList.jsx';
import AddWord from './AddWord.jsx';
import Search from './Search.jsx';


const App = () => {
  const [glossary, setGlossary] = useState([]);
  const [query, setQuery] = useState('');
  const [reset, setReset] = useState(false);

  useEffect(() => {
    axios.get(`/glossary?query=${query}`)
    .then((res) => setGlossary(res.data));
  }, [reset, query]);

  const handleNewEntry = (word, definition) => {
    axios.post('/glossary', {
      word,
      definition
    })
    .then(() => setReset(!reset));
  }

  const handleDelete = (word) => {
    axios.delete('/glossary', {
      data: { word }
    })
    .then(() => setReset(!reset));
  }

  return(
    <div>
      <Search setQuery={setQuery} />
      <AddWord handleNewEntry={handleNewEntry} />
      <WordList glossary={glossary} handleDelete={handleDelete} handleNewEntry={handleNewEntry} />
    </div>
  )
}

export default App;