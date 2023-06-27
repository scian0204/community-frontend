import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Request from '../Request';

function BoardForm(props) {
    const nav = useNavigate();
    const {userData} = useContext(UserContext);
    const boardNameRef = useRef();

    const apply = () => {
        const req = {
            userId: userData,
            boardName: boardNameRef.current.value,
        }
        Request.post(`http://localhost:8080/api/board/apply`, req).then(res=>{
            if (res.data.error == null) {
                nav(-1);
            } else {
                alert(res.data.error.message);
            }
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-sm-2"></div>
                <div className="col-sm-8">
                    게시판 이름:
                    <input type="text" className='input-group' ref={boardNameRef} />
                    <button onClick={apply} className='btn btn-primary'>신청</button>
                </div>
                <div className="col-sm-2"></div>
            </div>
        </div>
    )
}

export default BoardForm;