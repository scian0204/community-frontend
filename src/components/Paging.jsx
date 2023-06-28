import React from 'react';

function Paging(props) {
  const { isFirst, totalPage, currentPage, isLast, setCurrentPage } = props;

  const pageArr = () => {
    const arr = [];
    let start = 1;
    let end = totalPage;

    if (totalPage > 10) {
      let howtoLast = totalPage - currentPage;
      start = howtoLast > 4 ? currentPage - 5 : currentPage - (9 - howtoLast);
      start = start <= 1 ? 1 : start;
      end = start + 9;
    }

    for (let i = start; i <= end; i++) {
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
        {pageArr().map((i) => (
          <div key={i}>
            {currentPage == i ? (
              <li key={i} className="page-item active">
                <button key={i} className="page-link" style={{ width: '45px' }}>
                  {i}
                </button>
              </li>
            ) : (
              <li key={i} className="page-item">
                <button
                  onClick={toPage}
                  key={i}
                  className="page-link"
                  style={{ width: '45px' }}>
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
  );
}

export default Paging;
