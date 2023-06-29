import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Request from '../Request';

function Comment(props) {
  const { postId, preCmt, commentId } = props;
  const { userData } = useContext(UserContext);
  const nav = useNavigate();
  const [comment, setComment] = useState(preCmt);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const writeComment = (e) => {
    const req = {
      postId: postId,
      userId: userData,
      comment: comment,
    };
    if (preCmt != undefined) {
      req.commentId = commentId;
      Request(
        {
          method: 'put',
          query: `comment/modify`,
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            props.setIsUpdate(false);
            nav(`/PostShow/${postId}`);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    } else {
      Request(
        {
          method: 'post',
          query: `comment/write`,
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            setComment('');
            nav(`/PostShow/${postId}`);
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
        onChange={handleComment}
        value={comment}
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
          {preCmt != undefined
            ? '댓글수정'
            : commentId != undefined
            ? '답글작성'
            : '댓글작성'}
        </button>
      </div>
    </div>
  );
}

export default Comment;
