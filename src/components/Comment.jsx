import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import Request from '../Request';
import { useNavigate } from 'react-router-dom';

function Comment(props) {
  const { postId } = props;
  const { userData } = useContext(UserContext);
  const nav = useNavigate();
  const [comment, setComment] = useState('');

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const writeComment = () => {
    const req = {
      postId: postId,
      userId: userData,
      comment: comment,
    };
    console.log(req);
    Request.post(`http://localhost:8080/api/comment/write`, req).then((res) => {
      if (res.data.error == null) {
        nav(`/PostShow/${postId}`);
      } else {
        alert(res.data.error.message);
      }
    });
  };

  return (
    <div className="input-group mb-3">
      <input
        onChange={handleComment}
        type="text"
        className="form-control"
        aria-describedby="button-addon2"
        required
      />
      <div className="input-group-append">
        <button
          onClick={writeComment}
          className="btn btn-outline-secondary"
          id="button-addon2">
          댓글작성
        </button>
      </div>
    </div>
  );
}

export default Comment;
