import React, { useState } from 'react';

const Search = ({setQuery}) => {

  return(
    <form>
      <input onChange={(e) => setQuery(e.target.value)} placeholder="Search..."></input>
    </form>
  );
}

export default Search;