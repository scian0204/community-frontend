import React, { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Request from '../Request';

function BoardForm(props) {
  const location = useLocation();
  const board = location.state;
  const [isUpdate, setIsUpdate] = useState(board != undefined);
  const nav = useNavigate();
  const { userData } = useContext(UserContext);
  const boardNameRef = useRef();

  const apply = () => {
    const confirm = window.confirm('신청?');
    if (confirm) {
      const req = {
        userId: userData,
        boardName: boardNameRef.current.value,
      };

      if (isUpdate) {
        delete req.userId;
        req.boardId = board.boardId;

        Request(
          {
            method: 'put',
            query: 'board/modify',
            body: req,
          },
          (res) => {
            if (res.data.error == null) {
              nav(-1);
            } else {
              alert(res.data.error.message);
            }
          }
        );
      } else {
        Request(
          {
            method: 'post',
            query: 'board/apply',
            body: req,
          },
          (res) => {
            if (res.data.error == null) {
              nav(-1);
            } else {
              alert(res.data.error.message);
            }
          }
        );
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          게시판 이름:
          <input
            defaultValue={board?.boardName}
            type="text"
            className="form-control"
            ref={boardNameRef}
          />
          <button onClick={apply} className="btn btn-primary">
            {isUpdate ? '수정신청' : '신청'}
          </button>
          <button onClick={() => nav(-1)} className="btn btn-warning">
            취소
          </button>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default BoardForm;
