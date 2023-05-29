import React, { useEffect, useState } from 'react';
import Request from '../Request';
import Cmt from './Cmt';

function CmtList(props) {
  const [commentList, setCommentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const { postId } = props;

  useEffect(() => {
    setIsLoading(false);
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
  }, [currentPage]);

  const numberToArray = (num) => {
    const arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  };

  const toFirst = () => {
    setCurrentPage(1);
  };

  const toPrePage = () => {
    setCurrentPage(currentPage - 1);
  };

  const toPage = (e) => {
    setCurrentPage(e.target.innerText);
  };

  const toNextPage = () => {
    setCurrentPage(parseInt(currentPage) + 1);
  };

  const toLast = () => {
    setCurrentPage(totalPage);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {isFirst ? (
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <button className="page-link">처음</button>
              </li>
              <li className="page-item disabled">
                <button className="page-link">이전</button>
              </li>
            </ul>
          ) : (
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button onClick={toFirst} className="page-link">
                  처음
                </button>
              </li>
              <li className="page-item">
                <button onClick={toPrePage} className="page-link">
                  이전
                </button>
              </li>
            </ul>
          )}
          {numberToArray(totalPage).map((i) => (
            <div key={i}>
              {currentPage == i ? (
                <li key={i} className="page-item active">
                  <button key={i} className="page-link">
                    {i}
                  </button>
                </li>
              ) : (
                <li key={i} className="page-item">
                  <button onClick={toPage} key={i} className="page-link">
                    {i}
                  </button>
                </li>
              )}
            </div>
          ))}
          {isLast ? (
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <button className="page-link">다음</button>
              </li>
              <li className="page-item disabled">
                <button className="page-link">마지막</button>
              </li>
            </ul>
          ) : (
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button onClick={toNextPage} className="page-link">
                  다음
                </button>
              </li>
              <li className="page-item">
                <button onClick={toLast} className="page-link">
                  마지막
                </button>
              </li>
            </ul>
          )}
        </ul>
      </nav>
      {commentList.map((comment) => (
        <Cmt key={comment.commentId} comment={comment} />
      ))}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {isFirst ? (
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <button className="page-link">처음</button>
              </li>
              <li className="page-item disabled">
                <button className="page-link">이전</button>
              </li>
            </ul>
          ) : (
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button onClick={toFirst} className="page-link">
                  처음
                </button>
              </li>
              <li className="page-item">
                <button onClick={toPrePage} className="page-link">
                  이전
                </button>
              </li>
            </ul>
          )}
          {numberToArray(totalPage).map((i) => (
            <div key={i}>
              {currentPage == i ? (
                <li key={i} className="page-item active">
                  <button key={i} className="page-link">
                    {i}
                  </button>
                </li>
              ) : (
                <li key={i} className="page-item">
                  <button onClick={toPage} key={i} className="page-link">
                    {i}
                  </button>
                </li>
              )}
            </div>
          ))}
          {isLast ? (
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <button className="page-link">다음</button>
              </li>
              <li className="page-item disabled">
                <button className="page-link">마지막</button>
              </li>
            </ul>
          ) : (
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <button onClick={toNextPage} className="page-link">
                  다음
                </button>
              </li>
              <li className="page-item">
                <button onClick={toLast} className="page-link">
                  마지막
                </button>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default CmtList;
