import React from 'react';
import { useNavigate } from 'react-router-dom';

function User(props) {
    const {user} = props;
    const nav = useNavigate();

    return (
        user!=null &&
        <div onClick={()=>nav(`/Profile/${user.userId}`)} className="card" style={{width: "20%"}}>
            <img src={``} className="card-img-top" />
            <div className="card-body">
            <h5 className="card-title">{user.userName}({user.userId})</h5>
            <p className="card-text">가입일 : {new Date(parseInt(user.regDate)).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default User;