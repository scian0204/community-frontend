import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Request from '../Request';

function UserForm(props) {
  const nav = useNavigate();
  const { setUserData } = useContext(UserContext);

  const userIdRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordRRef = useRef();

  const regist = () => {
    const password = passwordRef.current.value;
    const passwordR = passwordRRef.current.value;

    if (password != passwordR) {
      alert('비밀번호가 다름');
    } else {
      const req = {
        userId: userIdRef.current.value,
        userName: userNameRef.current.value,
        password: password,
      };
      Request(
        {
          method: 'post',
          query: 'user/signUp',
          body: req,
        },
        (res) => {
          if (res.data.error == null) {
            setUserData(res.data.data.userId);
            nav(-1);
          } else {
            alert(res.data.error.message);
          }
        }
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          아이디:
          <input type="text" className="form-control" ref={userIdRef} />
          이름:
          <input type="text" className="form-control" ref={userNameRef} />
          비밀번호:
          <input type="password" className="form-control" ref={passwordRef} />
          비밀번호 확인:
          <input type="password" className="form-control" ref={passwordRRef} />
          <button className="btn btn-primary" onClick={regist}>
            회원가입
          </button>
          <button className="btn btn-danger" onClick={() => nav(-1)}>
            취소
          </button>
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}

export default UserForm;
