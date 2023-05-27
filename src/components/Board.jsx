import React from 'react';

function Board(props) {
  const { board } = props;
  return (
    <button key={board} className="list-group-item list-group-item-action">
      {board}
    </button>
  );
}

export default Board;
