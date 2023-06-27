import React, { useEffect, useState } from 'react';
import User from './User';
import Paging from './Paging';
import Request from '../Request';

function UserList(props) { 
    const {query} = props;
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(false);
    const [totalPage, setTotalPage] = useState();
    
    useEffect(()=>{
        Request.get(`http://localhost:8080/api/user/listByLike/${query}?page=${currentPage-1}&size=10`).then(res=>{
            if(res.data.error == null) {
                setUsers(res.data.data.content);
                setIsFirst(res.data.data.first);
                setIsLast(res.data.data.last);
                setTotalPage(res.data.data.totalPages);
                setIsLoading(true);
            }else {
                alert(res.data.error.message)
            }
        });
    }, [query]);

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
        isLoading &&
        <div>
            {users.map(user=>{
                return (
                    <>
                        <User key={user.userId} user={user} />
                        <br />
                    </>
                )
            })}
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
    );
}

export default UserList;