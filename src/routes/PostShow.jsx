import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Request from '../Request';
import UserContext from '../context/UserContext';
import CmtList from '../components/CmtList';
import Comment from '../components/Comment';

function PostShow(props) {
  const postId = useParams().postId;
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const { userData } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(false);
    Request.get(`http://localhost:8080/api/post/${postId}`).then((res) => {
      setPost(res.data.data);
      setIsLoading(true);
    });
  }, [useParams()]);

  const deletePost = () => {
    Request.delete(`http://localhost:8080/api/post/delete/${postId}`).then(
      (res) => {
        if (res.data.error == null) {
          alert('글 삭제됨');
          nav(-1);
        } else {
          alert(res.data.error.meesage);
        }
      }
    );
  };

  return (
    <div>
      {isLoading && (
        <div className="jumbotron">
          <button
            className="btn btn-primary float-right"
            onClick={() => {
              nav(-1);
            }}>
            이전
          </button>
          <h2 className="display-4">{post.title}</h2>
          <div className="float-right">
            글쓴이 :{' '}
            <Link
              to={{
                pathname: `/Profile/${post.userId}`,
              }}>
              {post.userId}
            </Link>
            <br />
            등록일 : {new Date(
              parseInt(post.writeDate)
            ).toLocaleDateString()}{' '}
            <br />
            조회수 : {post.viewCount} <br />
            {userData == post.userId && (
              <div>
                <button
                  onClick={deletePost}
                  className="btn btn-danger float-right">
                  삭제
                </button>
                <button className="btn btn-warning float-right">수정</button>
              </div>
            )}
          </div>

          <br />
          <br />
          <br />
          <br />
          <hr className="my-4" />

          {post.image === null ? (
            <br />
          ) : (
            <div>
              {/* <img
                src={`http://localhost:8080/api/image?fileName=${post.image}`}
                width="50%"
              />{' '}
              <hr /> */}
            </div>
          )}
          <p>{post.content}</p>
          <br />
          <br />
          <br />
          <div style={{ textAlign: 'center' }} className="center-block">
            <h5>{post.recommend}</h5>
            <button style={{ textAlign: 'center' }} className="btn btn-primary">
              추천{' '}
            </button>
            <button style={{ textAlign: 'center' }} className="btn btn-warning">
              비추{' '}
            </button>
          </div>
          <br />
          <br />
          <br />
          <hr className="my-4" />
          {userData != null && <Comment postId={postId} />}

          <CmtList postId={postId} />
        </div>
      )}
    </div>
  );
}

export default PostShow;
