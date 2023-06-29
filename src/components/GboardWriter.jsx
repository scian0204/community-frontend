import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Request from '../Request';

function GboardWriter(props) {
  const { target, preGmt, gboardId } = props;
  const { userData } = useContext(UserContext);
  const nav = useNavigate();
  const [gBoard, setGBoard] = useState(preGmt);

  const handleGBoard = (e) => {
    setGBoard(e.target.value);
  };

  const writeGBoard = (e) => {
    const req = {
      target: target,
      userId: userData,
      content: gBoard,
    };
    if (preGmt != undefined) {
      req.gboardId = gboardId;
      console.log(req);
      Request(
        {
          method: 'put',
          query: `gBoard`,
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            props.setIsUpdate(false);
            nav(`/Profile/${target}`);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    } else {
      Request(
        {
          method: 'post',
          query: `gBoard`,
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            setGBoard('');
            nav(`/Profile/${target}`);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        onChange={handleGBoard}
        value={gBoard}
        type="text"
        className="form-control"
        aria-describedby="button-addon2"
        required
      />
      <div className="input-group-append">
        <button
          onClick={writeGBoard}
          className="btn btn-outline-secondary"
          id="button-addon2">
          {preGmt != undefined ? '수정' : '작성'}
        </button>
      </div>
    </div>
  );
}

export default GboardWriter;
