import React, { useContext, useState } from 'react';
import Request from '../Request';
import UserContext from '../context/UserContext';

function Login(props) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const { setUserData } = useContext(UserContext);

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (userId.length < 1 || password.length < 1) {
      alert('필수입력 항목임');
    } else {
      Request.post(`http://localhost:8080/api/user/login`, {
        userId: userId,
        password: password,
      }).then((res) => {
        if (res.data.error != null) {
          alert(res.data.error.message);
        } else {
          setUserData(res.data.data);
        }
      });
    }
  };

  return (
    <div style={{ border: '1px solid blue', padding: '10px' }}>
      {/* <form> */}
      <div className="mb-3">
        <label htmlFor="id" className="form-label">
          ID
        </label>
        <input
          type="text"
          onChange={handleUserId}
          className="form-control"
          id="id"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Password" className="form-label">
          Password
        </label>
        <input
          onChange={handlePassword}
          type="password"
          className="form-control"
          id="Password"
          required
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        로그인
      </button>
      <button className="btn btn-warning">회원가입</button>
      {/* </form> */}
    </div>
  );
}

export default Login;
