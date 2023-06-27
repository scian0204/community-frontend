import React from 'react';

function Paging(props) {
    const {
        isFirst,
        toFirst,
        toPrePage,
        totalPage,
        currentPage,
        toPage,
        isLast,
        toNextPage,
        toLast,
        numberToArray
    } = props;

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
    );
}

export default Paging;