import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SearchBar(props) {
  const [query, setQuery] = useState('');

  const queryHandler = (e) => {
    setQuery(e.target.value);
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
        <Link
          to={{
            pathname: `/Search/${query}`,
          }}
          replace={true}>
          <button
            className="btn btn-outline-secondary"
            id="button-addon2"
          >검색</button>
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
