import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Request from '../Request';
import Comment from './Comment';

function Cmt(props) {
  const { comment } = props;
  const [isProfile, setIsProfile] = useState(props.isProfile);
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

  const deleteCmt = () => {
    Request.delete(
      `http://localhost:8080/api/comment/delete/${comment.commentId}`
    ).then((res) => {
      if (res.data.error == null) {
        alert('댓글 삭제됨');
        nav(`/PostShow/${comment.postId}`);
      } else {
        alert(res.data.error.message);
      }
    });
  };

  return (
    <div key={comment.commentId}>
      <div className="card">
        <div className="card-header">
          <Link to={`/Profile/${comment.userId}`}>
            <div
              style={circleStyle}
              // src={`http://localhost:8080/api/image?fileName=${rows[e].image}`}
            ></div>
            &nbsp;{comment.userId}
          </Link>
          {userData == comment.userId && (
            <div className="float-right">
              <button
                onClick={() => setIsUpdate(!isUpdate)}
                className="btn btn-warning">
                {isUpdate ? '취소' : '수정'}
              </button>
              <button onClick={deleteCmt} className="btn btn-danger">
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            {isUpdate ? (
              <Comment
                preCmt={comment.comment}
                postId={comment.postId}
                commentId={comment.commentId}
                setIsUpdate={setIsUpdate}
              />
            ) : (
              <p>{comment.comment}</p>
            )}
            <footer className="blockquote-footer">
              <cite title="Source Title">
                {new Date(parseInt(comment.writeDate)).toLocaleDateString()}
              </cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Cmt;
