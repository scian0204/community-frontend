import React, { useEffect, useState } from 'react';
import Gmt from './Gmt';
import Paging from './Paging';
import Request from '../Request';

function GmtList(props) {
  const [gBoardList, setGBoardList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const { target } = props;

  useEffect(() => {
    setIsLoading(false);
    Request(
      {
        method: 'get',
        query: `gBoard/${target}?page=${currentPage - 1}&size=10`,
      },
      (res) => {
        setGBoardList(res.data.data.content);
        setIsFirst(res.data.data.first);
        setIsLast(res.data.data.last);
        setTotalPage(res.data.data.totalPages);
        setIsLoading(true);
      }
    );
  }, [currentPage, target, props]);

  return (
    isLoading && (
      <div>
        <Paging
          isFirst={isFirst}
          totalPage={totalPage}
          currentPage={currentPage}
          isLast={isLast}
          setCurrentPage={setCurrentPage}
        />
        {gBoardList.map((gBoard) => (
          <div key={gBoard.gboardId}>
            <Gmt key={gBoard.gboardId} gBoard={gBoard} />
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
    )
  );
}

export default GmtList;
