import React, { useContext } from 'react';
import Request from '../Request';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function BoardRow(props) {
  const { board } = props;
  const nav = useNavigate();
  const { userData } = useContext(UserContext);

  const deleteBoard = (boardId) => {
    const confirm = window.confirm('삭제?');
    if (confirm) {
      Request.delete(`http://localhost:8080/api/board/delete/${boardId}`).then(
        (res) => {
          if (res.data.error == null) {
            nav('/BoardShow');
          } else {
            alert(res.data.error.message);
          }
        }
      );
    }
  };

  return (
    <tr key={`tr_${board.boardId}`}>
      <td
        onClick={() => {
          nav(`/${board.boardId}`);
        }}
        key={`boardId_${board.boardId}`}>
        {board.boardId}
      </td>
      <td
        onClick={() => {
          nav(`/${board.boardId}`);
        }}
        key={`boardName_${board.boardId}`}>
        {board.boardName}
      </td>
      <td
        onClick={() => {
          nav(`/${board.boardId}`);
        }}
        key={`userId_${board.boardId}`}>
        {board.userId}
      </td>
      <td
        onClick={() => {
          nav(`/${board.boardId}`);
        }}
        key={`regDate_${board.boardId}`}>
        {new Date(parseInt(board.regDate)).toLocaleDateString()}
      </td>
      {userData == board.userId && (
        <td>
          <button
            onClick={() => {
              deleteBoard(board.boardId);
            }}
            className="btn btn-danger">
            삭제
          </button>
          <button
            onClick={() => {
              nav(`/BoardForm`, { state: board });
            }}
            className="btn btn-warning">
            수정
          </button>
        </td>
      )}
    </tr>
  );
}

export default BoardRow;
