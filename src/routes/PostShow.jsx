import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../context/UserContext';
import CmtList from '../components/CmtList';
import Comment from '../components/Comment';
import Request from '../Request';

function PostShow(props) {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const { userData } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(false);

    Request(
      {
        method: 'get',
        query: `post/${postId}`,
      },
      (res) => {
        if (res.data.error == null) {
          setPost(res.data.data);
          setIsLoading(true);
        } else {
          alert(res.data.error.message);
        }
      }
    );
  }, []);

  const deletePost = () => {
    Request(
      {
        method: 'delete',
        query: `post/delete/${postId}`,
      },
      (res) => {
        if (res.data.error == null) {
          alert('글 삭제됨');
          nav(-1);
        } else {
          alert(res.data.error.message);
        }
      }
    );
  };

  const recmdPost = () => {
    Request(
      {
        method: 'get',
        query: `post/recmd/${postId}`,
      },
      (res) => {
        if (res.data.error == null) {
          setPost(res.data.data);
        } else {
          if (res.data.error.errorId == 1) alert(res.data.error.message);
          else {
            let deRecmd = window.confirm('이미 추천함. 취소?');
            if (deRecmd) {
              deRecmdPost();
            }
          }
        }
      }
    );
  };

  const deRecmdPost = () => {
    Request(
      {
        method: 'delete',
        query: `post/recmd/${postId}`,
      },
      (res) => {
        if (res.data.error == null) {
          setPost(res.data.data);
        } else {
          alert(res.data.error.message);
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
                <button
                  onClick={() => {
                    nav(`/PostForm/${post.boardId}`, {
                      state: {
                        postId: postId,
                        title: post.title,
                        content: post.content,
                      },
                    });
                  }}
                  className="btn btn-warning float-right">
                  수정
                </button>
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
            {userData != null && (
              <button
                onClick={recmdPost}
                style={{ textAlign: 'center' }}
                className="btn btn-primary">
                추천{' '}
              </button>
            )}
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
