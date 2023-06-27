import React, { useContext, useEffect, useState } from 'react';
import Request from '../Request';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Paging from '../components/Paging';
import UserContext from '../context/UserContext';

function BoardShow(props) {
  const [boardList, setBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [isSearch, setIsSearch] = useState(props.query!=null);

  const {userData} = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    if (isSearch) {
      const {query} = props;
      Request.get(
        `http://localhost:8080/api/board/listByLike/${query}?page=${currentPage - 1}&size=10`
      ).then((res) => {
        setBoardList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      });
    } else {
      Request.get(
        `http://localhost:8080/api/board/list?page=${currentPage - 1}&size=10`
      ).then((res) => {
        setBoardList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      });
    }
  }, [currentPage, useParams()]);

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

  const deleteBoard = (boardId) => {
    Request.delete(`http://localhost:8080/api/board/delete/${boardId}`).then(res=>{
      if (res.data.error == null) {
        nav('/BoardShow')
      }else {
        alert(res.data.error.message);
      }
    })
  }

  return (
    <div>
      <div id="bdr" style={{ border: '1px solid blue', padding: '10px' }}>
        <div id="btns">
          {isSearch ? null : userData != null ? (
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
              {userData&& <th scope='col'> </th>}
            </tr>
          </thead>
          <tbody>
            {boardList.map((board) => {
              return (
                <tr
                  onClick={() => {
                    nav(`/${board.boardId}`);
                  }}
                  key={`tr_${board.boardId}`}>
                  <td key={`boardId_${board.boardId}`}>{board.boardId}</td>
                  <td key={`boardName_${board.boardId}`}>{board.boardName}</td>
                  <td key={`userId_${board.boardId}`}>{board.userId}</td>
                  <td key={`regDate_${board.boardId}`}>
                    {new Date(parseInt(board.regDate)).toLocaleDateString()}
                  </td>
                  {userData == board.userId &&
                    <td><button onClick={()=>{deleteBoard(board.boardId)}} className='btn btn-danger'>삭제</button></td>
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
        <Paging
          isFirst={isFirst}
          toFirst={toFirst}
          toPrePage={toPrePage}
          totalPage={totalPage}
          currentPage={currentPage}
          toPage={toPage}
          isLast={isLast}
          toNextPage={toNextPage}
          toLast={toLast}
          numberToArray={numberToArray}
        />
      </div>
    </div>
  );
}

export default BoardShow;
