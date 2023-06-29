import React, { useContext, useRef } from 'react';
import UserContext from '../context/UserContext';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Request from '../Request';

function PostForm(props) {
  const location = useLocation();
  const nav = useNavigate();
  const { userData } = useContext(UserContext);

  const boardId = useParams().boardId;
  const title = location.state?.title;
  const content = location.state?.content;
  const postId = location.state?.postId;

  const titleRef = useRef();
  const contentRef = useRef();

  const writePost = () => {
    const req = {
      boardId: boardId,
      userId: userData,
      title: titleRef.current.value,
      content: contentRef.current.value,
    };
    if (postId == undefined) {
      Request(
        {
          method: 'post',
          query: 'post/write',
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            nav(`/${boardId}`);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    } else {
      req.postId = postId;
      delete req.boardId;
      delete req.userId;

      Request(
        {
          method: 'put',
          query: 'post/update',
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            nav(`/${boardId}`);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          제목:
          <input
            type="text"
            className="form-control"
            defaultValue={title}
            ref={titleRef}
          />
          내용:
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            defaultValue={content}
            ref={contentRef}></textarea>
          <button className="btn btn-primary" onClick={writePost}>
            {postId == undefined ? '작성' : '수정'}
          </button>
          <button className="btn btn-danger" onClick={() => nav(-1)}>
            취소
          </button>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default PostForm;
