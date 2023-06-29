import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paging from '../components/Paging';
import UserContext from '../context/UserContext';
import BoardRow from './../components/BoardRow';
import Request from '../Request';

function BoardShow(props) {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [isSearch, setIsSearch] = useState(props.query != null);
  const [isProfile, setIsProfile] = useState(props.userId != null);

  const { userData } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(false);

    if (isProfile) {
      const { userId } = props;

      Request(
        {
          method: 'get',
          query: `board/listByUser/${userId}?page=${currentPage - 1}$size=10`,
        },
        (res) => {
          setBoardList(res.data.data.content);
          setIsFirst(res.data.data.first);
          setIsLast(res.data.data.last);
          setTotalPage(res.data.data.totalPages);
          setIsLoading(true);
        }
      );
    } else if (isSearch) {
      const { query } = props;

      Request(
        {
          method: 'get',
          query: `board/listByLike/${query}?page=${currentPage - 1}&size=10`,
        },
        (res) => {
          setBoardList(res.data.data.content);
          setIsFirst(res.data.data.first);
          setIsLast(res.data.data.last);
          setTotalPage(res.data.data.totalPages);
          setIsLoading(true);
        }
      );
    } else {
      Request(
        {
          method: 'get',
          query: `board/list?page=${currentPage - 1}&size=10`,
        },
        (res) => {
          setBoardList(res.data.data.content);
          setIsFirst(res.data.data.first);
          setIsLast(res.data.data.last);
          setTotalPage(res.data.data.totalPages);
          setIsLoading(true);
        }
      );
    }
  }, [currentPage, useParams()]);

  return (
    <div>
      <div id="bdr" style={{ border: '1px solid blue', padding: '10px' }}>
        <div id="btns">
          {isSearch || isProfile ? null : userData != null ? (
            <Link to={{ pathname: '/BoardForm' }}>
              <button className="btn btn-primary">게시판 요청</button>
            </Link>
          ) : (
            <button
              onClick={() => alert('로그인 후 이용 가능합니다.')}
              className="btn btn-primary">
              게시판 요청
            </button>
          )}
          <button
            onClick={() => {
              nav(-1);
            }}
            className="btn btn-primary float-right">
            이전
          </button>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">이름</th>
              <th scope="col">만든 유저</th>
              <th scope="col">등록일</th>
              {userData && <th scope="col"> </th>}
            </tr>
          </thead>
          <tbody>
            {boardList.map((board) => (
              <BoardRow board={board} key={board.boardId} />
            ))}
          </tbody>
        </table>
        <Paging
          isFirst={isFirst}
          totalPage={totalPage}
          currentPage={currentPage}
          isLast={isLast}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default BoardShow;
