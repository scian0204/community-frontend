import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Request from '../Request';
import GboardWriter from './GboardWriter';

function Gmt(props) {
  const { gBoard } = props;
  const [isUpdate, setIsUpdate] = useState(false);
  const nav = useNavigate();

  const { userData } = useContext(UserContext);

  const circleStyle = {
    width: '30px',
    height: '30px',
    WebkitBorderRadius: '700px',
    MozBorderRadius: '700px',
    borderRadius: '700px',
    backgroundColor: 'gray',
    float: 'left',
  };

  const deleteGmt = () => {
    Request(
      {
        method: 'delete',
        query: `gBoard/${gBoard.gboardId}`,
      },
      (res) => {
        if (res.data.error == null) {
          alert('방명록 삭제됨');
          nav(`/Profile/${gBoard.target}`);
        } else {
          alert(res.data.error.message);
        }
      }
    );
  };

  return (
    <div key={gBoard.gboardId}>
      <div className="card">
        <div className="card-header">
          <Link to={`/Profile/${gBoard.userId}`}>
            <div
              style={circleStyle}
              // src={`http://localhost:8080/api/image?fileName=${rows[e].image}`}
            ></div>
            &nbsp;{gBoard.userId}
          </Link>
          {userData == gBoard.userId && (
            <div className="float-right">
              <button
                onClick={() => setIsUpdate(!isUpdate)}
                className="btn btn-warning">
                {isUpdate ? '취소' : '수정'}
              </button>
              <button onClick={deleteGmt} className="btn btn-danger">
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            {isUpdate ? (
              <GboardWriter
                preGmt={gBoard.content}
                target={gBoard.target}
                gboardId={gBoard.gboardId}
                setIsUpdate={setIsUpdate}
              />
            ) : (
              <p>{gBoard.content}</p>
            )}
            <footer className="blockquote-footer">
              <cite title="Source Title">
                {new Date(parseInt(gBoard.writeDate)).toLocaleDateString()}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Gmt;
