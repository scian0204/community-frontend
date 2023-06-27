import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const [query, setQuery] = useState('');
  const nav = useNavigate();

  const queryHandler = (e) => {
    setQuery(e.target.value);
  }

  const search = () => {
    if(query.split(" ").join("") != "") {
      nav(`/Search/${query}`)
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        aria-describedby="button-addon2"
        required
        onChange={queryHandler}
      />
      <div className="input-group-append">
        <button
          onClick={search}
          className="btn btn-outline-secondary"
          id="button-addon2"
        >검색</button>
      </div>
    </div>
  );
}

export default SearchBar;
