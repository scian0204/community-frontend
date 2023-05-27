import React from 'react';
import { Link } from 'react-router-dom';

function SearchBar(props) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        aria-describedby="button-addon2"
        required
      />
      <div className="input-group-append">
        <Link
          to={{
            pathname: '/',
          }}
          replace={true}>
          <input
            onClick={(e) =>
              (e.target.parentElement.parentElement.previousSibling.value = '')
            }
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
            value="search"
          />
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
