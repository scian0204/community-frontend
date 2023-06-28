import React, { useEffect, useState } from 'react';
import Request from '../Request';
import Cmt from './Cmt';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paging from './Paging';

function CmtList(props) {
  const [commentList, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [isProfile, setIsProfile] = useState(props.userId != null);
  const { postId } = props;
  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    if (isProfile) {
      const { userId } = props;

      Request.get(
        `http://localhost:8080/api/comment/listByUser/${userId}?page=${
          currentPage - 1
        }&size=10`
      ).then((res) => {
        setCommentList(res.data.data.content.reverse());
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      });
    } else {
      Request.get(
        `http://localhost:8080/api/comment/${postId}?page=${
          currentPage - 1
        }&size=10`
      ).then((res) => {
        setCommentList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      });
    }
  }, [currentPage, useParams()]);

  return (
    <div>
      <Paging
        isFirst={isFirst}
        totalPage={totalPage}
        currentPage={currentPage}
        isLast={isLast}
        setCurrentPage={setCurrentPage}
      />
      {commentList.map((comment) => (
        <div
          onClick={() => {
            if (isProfile) nav(`/PostShow/${comment.postId}`);
          }}
          key={comment.commentId}>
          <Cmt
            key={comment.commentId}
            comment={comment}
            isProfile={isProfile}
          />
        </div>
      ))}
      <Paging
        isFirst={isFirst}
        totalPage={totalPage}
        currentPage={currentPage}
        isLast={isLast}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default CmtList;
